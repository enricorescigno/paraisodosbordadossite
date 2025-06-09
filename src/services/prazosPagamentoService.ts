
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

export const buscarPrazosPagamento = async () => {
  const authHeader = getAuthHeader();
  if (!authHeader) {
    return { error: 'API credentials not configured', data: null };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${API_BASE_URL}/integracao/sgsistemas/v1/prazospagamento`,
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
    console.log("Resposta da API de prazos para pagamento:", data);

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Request timeout");
      return { error: 'Request timeout', data: null };
    }
    console.error("Erro ao buscar prazos para pagamento:", error);
    return { error: 'Failed to fetch data', data: null };
  }
};
