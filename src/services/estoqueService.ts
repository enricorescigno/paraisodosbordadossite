export const enviarEstoqueParaN8n = async () => {
  try {
    const response = await fetch('http://sgps.sgsistemas.com.br:8201/integracao/sgsistemas/v1/produtos/estoque?filial=1', {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + btoa('homologacao:iVMfwV1q4y-&?c&p~6ei'),
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    await fetch('https://enrico-paraiso.app.n8n.cloud/webhook/7b6c6b7e-a532-4f94-b01d-6c66d43dd061', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log("Dados enviados com sucesso para o n8n.");
  } catch (error) {
    console.error("Erro ao enviar para o n8n:", error);
  }
};