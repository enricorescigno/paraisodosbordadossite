
// Service Worker para cache avançado e funcionalidade offline
const CACHE_NAME = 'paraisodosbordados-cache-v2';
const DYNAMIC_CACHE = 'paraisodosbordados-dynamic-v2';
const CDN_CACHE = 'paraisodosbordados-cdn-v1';

// Lista de assets estáticos prioritários para cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/favicon.ico',
  '/og-image.png',
  '/placeholder.svg'
];

// Assets CDN que devem ser cacheados
const CDN_ASSETS = [
  // Adicione aqui URLs da sua CDN quando implementar
  // 'https://cdn.paraisodosbordados.com.br/assets/...'
];

// Tempo de expiração para conteúdo dinâmico (24 horas)
const DYNAMIC_CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

// Função auxiliar para limpar caches antigos
const cleanupCaches = async () => {
  const cacheNames = await caches.keys();
  const validCaches = [CACHE_NAME, DYNAMIC_CACHE, CDN_CACHE];
  
  return Promise.all(
    cacheNames
      .filter(name => !validCaches.includes(name))
      .map(name => caches.delete(name))
  );
};

// Função para verificar e remover entradas de cache expiradas
const removeExpiredEntries = async () => {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (!response) continue;
      
      const headers = response.headers;
      const cachedTime = headers.get('sw-cache-timestamp');
      
      if (cachedTime) {
        const timestamp = parseInt(cachedTime, 10);
        const now = Date.now();
        
        if (now - timestamp > DYNAMIC_CACHE_EXPIRATION) {
          await cache.delete(request);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao limpar cache expirado:', error);
  }
};

// Função para adicionar timestamp nas respostas em cache
const addTimestampToResponse = (response) => {
  if (!response || !response.body) return response;
  
  const headers = new Headers(response.headers);
  headers.append('sw-cache-timestamp', Date.now().toString());
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
};

// Estratégia específica para CDN - cache first com background update
const cdnStrategy = async (request) => {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Atualiza cache em segundo plano
      fetch(request)
        .then(response => {
          if (response.ok) {
            caches.open(CDN_CACHE)
              .then(cache => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {});
      
      return cachedResponse;
    }
    
    // Nada em cache, busca da rede
    const networkResponse = await fetch(request);
    const cache = await caches.open(CDN_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.error('Erro na estratégia CDN:', error);
    return caches.match('/placeholder.svg');
  }
};

// Estratégia para conteúdo dinâmico - network first com cache de fallback
const dynamicContentStrategy = async (request) => {
  try {
    // Tenta obter da rede primeiro
    const networkResponse = await fetch(request);
    
    // Se bem-sucedido, armazena no cache dinâmico com timestamp
    const timestampedResponse = addTimestampToResponse(networkResponse.clone());
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, timestampedResponse);
    
    return networkResponse;
  } catch (error) {
    // Se falhar a rede, tenta do cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    
    // Se for uma solicitação de API, retornar resposta personalizada
    if (request.url.includes('/api/')) {
      return new Response(JSON.stringify({ error: 'Você está offline' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 503
      });
    }
    
    // Fallback para outras solicitações
    return new Response('Conteúdo indisponível offline', {
      headers: { 'Content-Type': 'text/plain' },
      status: 503
    });
  }
};

// Event Listeners
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_ASSETS);
      
      // Pre-cache CDN assets
      if (CDN_ASSETS.length > 0) {
        const cdnCache = await caches.open(CDN_CACHE);
        await cdnCache.addAll(CDN_ASSETS);
      }
      
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Limpa caches antigos
      await cleanupCaches();
      // Remove entradas expiradas do cache dinâmico
      await removeExpiredEntries();
      // Assume controle de clientes não controlados
      await self.clients.claim();
    })()
  );
  
  // Programa limpeza periódica do cache (a cada 6 horas)
  setInterval(removeExpiredEntries, 6 * 60 * 60 * 1000);
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Ignorar solicitações não-GET
  if (event.request.method !== 'GET') return;
  
  // Variável para rastrear se a solicitação foi respondida
  let handled = false;
  
  // Manipulação específica para recursos CDN
  if (event.request.url.includes('cdn.paraisodosbordados.com.br') || 
      CDN_ASSETS.some(asset => event.request.url.includes(asset))) {
    handled = true;
    event.respondWith(cdnStrategy(event.request));
  }
  
  // Manipulação para recursos de navegação (HTML)
  else if ((event.request.mode === 'navigate' || 
      event.request.destination === 'document') && 
      url.origin === self.location.origin) {
    handled = true;
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
  }
  
  // Manipulação para imagens e recursos estáticos
  else if (
    event.request.destination === 'image' || 
    event.request.destination === 'style' ||
    event.request.destination === 'script' ||
    event.request.url.includes('lovable-uploads') ||
    STATIC_ASSETS.some(asset => event.request.url.includes(asset))
  ) {
    handled = true;
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Cache-first para recursos estáticos
          if (cachedResponse) return cachedResponse;
          
          // Se não estiver em cache, busca da rede e armazena
          return fetch(event.request)
            .then(networkResponse => {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
              return networkResponse;
            })
            .catch(() => {
              // Fallback para imagens
              if (event.request.destination === 'image') {
                return caches.match('/placeholder.svg');
              }
              throw new Error('Recurso não disponível offline');
            });
        })
    );
  }
  
  // Estratégia para conteúdo dinâmico (API, dados dinâmicos)
  else if (
    event.request.url.includes('/api/') || 
    event.request.headers.get('accept')?.includes('application/json')
  ) {
    handled = true;
    event.respondWith(dynamicContentStrategy(event.request));
  }
  
  // Estratégia padrão para outras solicitações (não tratadas acima)
  if (!handled) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          
          return fetch(event.request)
            .then(networkResponse => {
              // Não armazenar em cache por padrão recursos não especificados
              return networkResponse;
            })
            .catch(() => {
              console.log('Falha ao buscar recurso:', event.request.url);
              return new Response('Recurso não disponível offline', {
                status: 404,
                headers: { 'Content-Type': 'text/plain' }
              });
            });
        })
    );
  }
});

// Evento para sincronização em segundo plano
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Implementação para sincronizar dados quando online
      // Por exemplo, enviar formulários ou dados salvos localmente
      console.log('Executando sincronização em segundo plano')
    );
  }
});

// Evento para atualizações de conteúdo em segundo plano
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-content') {
    event.waitUntil(
      // Atualizar conteúdo periodicamente
      console.log('Atualizando conteúdo em segundo plano')
    );
  }
});
