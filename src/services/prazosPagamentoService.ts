
export const buscarPrazosPagamento = async () => {
  try {
    const response = await fetch(
      "http://sgps.sgsistemas.com.br:8201/integracao/sgsistemas/v1/prazospagamento",
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("homologacao:iVMfwV1q4y-&?c&p~6ei"),
        },
      }
    );

    const data = await response.json();
    console.log("Resposta da API de prazos para pagamento:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar prazos para pagamento:", error);
    return null;
  }
};
