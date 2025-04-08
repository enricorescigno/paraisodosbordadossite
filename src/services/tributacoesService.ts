
export const buscarTributacoes = async (pagina = 1, itensPorPagina = 10) => {
  try {
    const response = await fetch(
      `http://sgps.sgsistemas.com.br:8201/integracao/sgsistemas/v1/produtos/tributacoes?filial=1&pagina=${pagina}&itensPorPagina=${itensPorPagina}&por=idProduto&direcao=asc`, 
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("homologacao:iVMfwV1q4y-&?c&p~6ei"),
        },
      }
    );

    const data = await response.json();
    console.log("Resposta da API de tributações:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar tributações:", error);
    return null;
  }
};
