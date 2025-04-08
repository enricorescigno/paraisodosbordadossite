
export const buscarVendas = async (dataInicial = "2024-02-01", dataFinal = "2024-02-28") => {
  try {
    const response = await fetch(
      `http://sgps.sgsistemas.com.br:8201/integracao/sgsistemas/v1/produtos/vendas?filial=1&filtroDataInicial=${dataInicial}&filtroDataFinal=${dataFinal}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("homologacao:iVMfwV1q4y-&?c&p~6ei"),
        },
      }
    );

    const data = await response.json();
    console.log("Resposta da API de vendas:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    return null;
  }
};
