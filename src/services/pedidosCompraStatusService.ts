
export const buscarStatusPedidosCompra = async () => {
  try {
    const response = await fetch(
      "http://sgps.sgsistemas.com.br:8201/integracao/sgsistemas/v1/pedidoscompra/status",
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("homologacao:iVMfwV1q4y-&?c&p~6ei"),
        },
      }
    );

    const data = await response.json();
    console.log("Resposta da API de status de pedidos de compra:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar status de pedidos de compra:", error);
    return null;
  }
};
