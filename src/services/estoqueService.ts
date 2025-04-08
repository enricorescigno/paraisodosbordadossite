const API_BASE_URL = "http://sgps.sgsistemas.com.br:8201/api/estoque";
const N8N_WEBHOOK_URL = "https://enrico-paraiso.app.n8n.cloud/webhook/7b6c6b7e-a532-4f94-b01d-6c66d43dd061"; // Atualize para sua URL do Webhook no n8n

export const buscarEstoque = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: "homologacao",
        senha: "iVMfwV1q4y-&?c&p~6ei",
      }),
    });

    const data = await response.json();
    console.log("Resposta da API de estoque:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    throw error; // Propagar o erro para o componente tratar
  }
};

// Função para enviar estoque para o n8n
export const enviarEstoqueParaN8n = async (estoqueData: any) => {
  try {
    console.log("Enviando dados de estoque para n8n...");
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estoque: estoqueData, // Envia os dados do estoque para o n8n
      }),
    });

    const result = await response.json();
    console.log("Resposta do n8n:", result);
    return true;
  } catch (error) {
    console.error("Erro ao enviar estoque para n8n:", error);
    return false;
  }
};