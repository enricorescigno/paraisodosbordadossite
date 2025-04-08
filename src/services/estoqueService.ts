
export const buscarEstoque = async () => {
  try {
    const response = await fetch("http://sgps.sgsistemas.com.br:8201/api/estoque", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: "homologacao",
        senha: "iVMfwV1q4y-&?c&p~6ei"
      })
    });

    const data = await response.json();
    console.log("Resposta da API de estoque:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    return null;
  }
};
