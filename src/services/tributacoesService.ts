
// SECURITY WARNING: This service contains placeholder credentials
// In production, these should be environment variables managed securely

const API_BASE_URL = "https://sgps.sgsistemas.com.br:8201"; // Changed to HTTPS
const getAuthHeader = () => {
  const username = import.meta.env.VITE_API_USERNAME || "";
  const password = import.meta.env.VITE_API_PASSWORD || "";
  
  if (!username || !password) {
    console.error("API credentials not configured");
    return null;
  }
  
  return "Basic " + btoa(`${username}:${password}`);
};

export const buscarTributacoes = async (pagina: number = 1, itensPorPagina: number = 10) => {
  const authHeader = getAuthHeader();
  if (!authHeader) {
    return { error: 'API credentials not configured', data: null };
  }

  // Input validation
  if (!Number.isInteger(pagina) || pagina < 1) {
    return { error: 'Invalid page number', data: null };
  }
  
  if (!Number.isInteger(itensPorPagina) || itensPorPagina < 1 || itensPorPagina > 100) {
    return { error: 'Invalid items per page (1-100)', data: null };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${API_BASE_URL}/integracao/sgsistemas/v1/produtos/tributacoes?filial=1&pagina=${pagina}&itensPorPagina=${itensPorPagina}&por=idProduto&direcao=asc`, 
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Request failed`);
    }

    const data = await response.json();
    console.log("Resposta da API de tributações:", data);

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Request timeout");
      return { error: 'Request timeout', data: null };
    }
    console.error("Erro ao buscar tributações:", error);
    return { error: 'Failed to fetch data', data: null };
  }
};
