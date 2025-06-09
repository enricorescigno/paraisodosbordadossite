
// SECURITY WARNING: This service contains placeholder credentials
// In production, these should be environment variables managed securely

const API_BASE_URL = "https://sgps.sgsistemas.com.br:8201"; // Changed to HTTPS
const AUTH = {
  usuario: import.meta.env.VITE_API_USERNAME || "", // Use import.meta.env for Vite
  senha: import.meta.env.VITE_API_PASSWORD || ""   // Use import.meta.env for Vite
};

/**
 * Validates API credentials before making requests
 */
const validateCredentials = (): boolean => {
  if (!AUTH.usuario || !AUTH.senha) {
    console.error("API credentials not configured. Please set VITE_API_USERNAME and VITE_API_PASSWORD environment variables.");
    return false;
  }
  return true;
};

/**
 * Função para buscar o estoque completo da empresa
 */
export const buscarEstoque = async () => {
  if (!validateCredentials()) {
    return { error: 'API credentials not configured', data: [] };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/api/estoque`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: AUTH.usuario,
        senha: AUTH.senha
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Request failed`);
    }

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Request timeout");
      return { error: 'Request timeout', data: [] };
    }
    console.error("Erro ao buscar estoque:", error.message);
    return { error: 'Failed to fetch data', data: [] };
  }
};

/**
 * Função para enviar os dados do estoque para o n8n
 */
export const enviarEstoqueParaN8n = async () => {
  try {
    const data = await buscarEstoque();

    if (data && data.dados) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const envioResponse = await fetch(
        "https://enrico-paraiso.app.n8n.cloud/webhook-test/7b6c6b7e-a532-4f94-b01d-6c66d43dd061", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.dados),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!envioResponse.ok) {
        throw new Error(`HTTP ${envioResponse.status}: Failed to send data`);
      }

      const envioData = await envioResponse.json();
      console.log("Dados enviados ao n8n:", envioData);
      return envioData;
    } else {
      throw new Error("Invalid stock data");
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("Request timeout while sending to n8n");
      return false;
    }
    console.error("Erro ao enviar dados para o n8n:", error);
    return false;
  }
};
