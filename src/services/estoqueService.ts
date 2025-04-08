// /src/services/estoqueService.ts

const API_URL = "http://sgps.sgsistemas.com.br:8201/api/estoque";

export const buscarEstoque = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " + btoa("homologacao:iVMfwV1q4y-&?c&p~6ei"),
      },
    });

    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }

    const data = await response.json();
    return data; // deve conter a chave `dados`
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    return null;
  }
};