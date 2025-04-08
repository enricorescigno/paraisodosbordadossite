
export const buscarEstoque = async () => {
  try {
    // Faça a chamada ao seu endpoint para buscar dados do estoque
    const response = await fetch("http://sgps.sgsistemas.com.br:8201/api/estoque", {
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
    console.log("Estoque recebido:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    throw error; // Propaga o erro para tratamento adequado no componente
  }
};

export const enviarEstoqueParaN8n = async () => {
  try {
    // Faça a chamada ao seu endpoint para buscar dados do estoque
    const response = await fetch("http://sgps.sgsistemas.com.br:8201/api/estoque", {
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
    console.log("Estoque recebido:", data);

    // Enviar para o n8n
    const envioResponse = await fetch(
      "https://enrico-paraiso.app.n8n.cloud/webhook/7b6c6b7e-a532-4f94-b01d-6c66d43dd061", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data) // Enviando o estoque para o n8n
      }
    );

    const envioData = await envioResponse.json();
    console.log("Dados enviados ao n8n:", envioData);
    return envioData;
  } catch (error) {
    console.error("Erro ao enviar dados para o n8n:", error);
    return false;
  }
};
