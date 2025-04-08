
export const buscarDistribuicaoPedidoCompra = async (idPedido = "1234567") => {
  try {
    const response = await fetch(
      `http://sgps.sgsistemas.com.br:8201/integracao/sgsistemas/v1/pedidoscompra/distribuicao?idPedido=${idPedido}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("homologacao:iVMfwV1q4y-&?c&p~6ei"),
        },
      }
    );

    const data = await response.json();
    console.log("Resposta da API de distribuição de pedido de compra:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar distribuição de pedido de compra:", error);
    return null;
  }
};
