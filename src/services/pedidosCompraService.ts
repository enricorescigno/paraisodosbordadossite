
export const buscarProdutosPedidoCompra = async (idPedido = "1234567") => {
  try {
    const response = await fetch(
      `http://sgps.sgsistemas.com.br:8201/integracao/sgsistemas/v1/pedidoscompra/produtos?idPedido=${idPedido}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("homologacao:iVMfwV1q4y-&?c&p~6ei"),
        },
      }
    );

    const data = await response.json();
    console.log("Resposta da API de produtos de pedido de compra:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos de pedido de compra:", error);
    return null;
  }
};
