
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

export const buscarVendas = async (dataInicial: string = "2024-02-01", dataFinal: string = "2024-02-28") => {
  const authHeader = getAuthHeader();
  if (!authHeader) {
    return { error: 'API credentials not configured', data: null };
  }

  // Input validation for dates
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dataInicial) || !dateRegex.test(dataFinal)) {
    return { error: 'Invalid date format. Use YYYY-MM-DD', data: null };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Sanitize the input parameters
    const sanitizedDataInicial = encodeURIComponent(dataInicial);
    const sanitizedDataFinal = encodeURIComponent(dataFinal);

    const response = await fetch(
      `${API_BASE_URL}/integracao/sgsistemas/v1/produtos/vendas?filial=1&filtroDataInicial=${sanitizedDataInicial}&filtroDataFinal=${sanitizedDataFinal}`,
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
    console.log("Resposta da API de vendas:", data);

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Request timeout");
      return { error: 'Request timeout', data: null };
    }
    console.error("Erro ao buscar vendas:", error);
    return { error: 'Failed to fetch data', data: null };
  }
};
