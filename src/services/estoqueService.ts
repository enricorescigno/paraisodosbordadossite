interface ProdutoEstoque {
  codigo: string;
  descricao: string;
  saldo: number;
  unidade: string;
}

export const buscarEstoque = async () => {
  try {
    const response = await fetch(
      "http://sgps.sgsistemas.com.br:8201/api/estoque",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: "homologacao",
          senha: "iVMfwV1q4y-&?c&p~6ei",
        }),
      }
    );

    const data = await response.json();
    console.log("Resposta da API de estoque:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    throw error; // Propagate the error for proper handling in the component
  }
};

// This function exists to maintain backward compatibility
export const buscarProdutos = async () => {
  return buscarEstoque();
};

export const enviarEstoqueParaN8n = async () => {
  try {
    console.log("Enviando dados de estoque para n8n...");
    alert("Função de envio para n8n ainda não implementada.");
    return true;
  } catch (error) {
    console.error("Erro ao enviar estoque para n8n:", error);
    return false;
  }
};
