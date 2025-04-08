const API_BASE_URL = "http://sgps.sgsistemas.com.br:8201";
const AUTH = {
  usuario: "homologacao",
  senha: "iVMfwV1q4y-&?c&p~6ei"
};

/**
 * Função para buscar o estoque completo da empresa
 */
export const buscarEstoque = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/estoque`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: AUTH.usuario,
        senha: AUTH.senha
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensagem || "Erro ao buscar o estoque");
    }

    return data;
  } catch (error: any) {
    console.error("Erro ao buscar estoque:", error.message);
    return null;
  }
};

/**
 * Função para enviar os dados do estoque para o n8n
 */
export const enviarEstoqueParaN8n = async () => {
  try {
    // Chamar o endpoint para buscar os dados do estoque
    const data = await buscarEstoque();

    if (data && data.dados) {
      // Enviar os dados para o n8n
      const envioResponse = await fetch(
        "https://enrico-paraiso.app.n8n.cloud/webhook/7b6c6b7e-a532-4f94-b01d-6c66d43dd061", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.dados) // Enviar os dados do estoque
        }
      );

      const envioData = await envioResponse.json();
      console.log("Dados enviados ao n8n:", envioData);
      return envioData;
    } else {
      throw new Error("Dados de estoque inválidos.");
    }
  } catch (error: any) {
    console.error("Erro ao enviar dados para o n8n:", error);
    return false;
  }
};