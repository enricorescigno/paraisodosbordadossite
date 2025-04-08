
// src/services/estoqueService.ts

const API_BASE_URL = "http://sgps.sgsistemas.com.br:8201";
const AUTH = {
  usuario: "homologacao",
  senha: "iVMfwV1q4y-&?c&p~6ei"
};

/**
 * Função para buscar o estoque completo da empresa
 */
export const buscarEstoque = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/estoque`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: AUTH.usuario,
        senha: AUTH.senha
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensagem || "Erro ao buscar o estoque");
    }

    return data;
  } catch (error: any) {
    console.error("Erro ao buscar estoque:", error.message);
    return null;
  }
};
