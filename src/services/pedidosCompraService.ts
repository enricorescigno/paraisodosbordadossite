
// SECURITY WARNING: This service contains placeholder credentials
// In production, these should be environment variables managed securely

const API_BASE_URL = "https://sgps.sgsistemas.com.br:8201"; // Changed to HTTPS
const getAuthHeader = () => {
  const username = process.env.VITE_API_USERNAME || "";
  const password = process.env.VITE_API_PASSWORD || "";
  
  if (!username || !password) {
    console.error("API credentials not configured");
    return null;
  }
  
  return "Basic " + btoa(`${username}:${password}`);
};

export const buscarProdutosPedidoCompra = async (idPedido: string = "1234567") => {
  const authHeader = getAuthHeader();
  if (!authHeader) {
    return { error: 'API credentials not configured', data: null };
  }

  // Input validation
  if (!idPedido || typeof idPedido !== 'string' || idPedido.trim().length === 0) {
    return { error: 'Invalid order ID', data: null };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Sanitize the input parameter
    const sanitizedId = encodeURIComponent(idPedido.trim());

    const response = await fetch(
      `${API_BASE_URL}/integracao/sgsistemas/v1/pedidoscompra/produtos?idPedido=${sanitizedId}`,
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
    console.log("Resposta da API de produtos de pedido de compra:", data);

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Request timeout");
      return { error: 'Request timeout', data: null };
    }
    console.error("Erro ao buscar produtos de pedido de compra:", error);
    return { error: 'Failed to fetch data', data: null };
  }
};
