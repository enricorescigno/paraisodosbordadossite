import { useEffect, useState } from "react";
import { buscarProdutos, enviarEstoqueParaN8n } from "../services/estoqueService";

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

const EstoquePage = () => {
  const [estoque, setEstoque] = useState<ProdutoEstoque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarEstoque = async () => {
      const data = await buscarProdutos();
      console.log("Resposta da API de estoque:", data);

      if (data && data.dados) {
        setEstoque(data.dados);
      }
      setLoading(false);
    };

    carregarEstoque();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Estoque Atual</h1>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={enviarEstoqueParaN8n}
      >
        Enviar Estoque para n8n
      </button>

      {loading ? (
        <p>Carregando estoque...</p>
      ) : estoque.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Código</th>
              <th className="border border-gray-300 px-4 py-2">Descrição</th>
              <th className="border border-gray-300 px-4 py-2">Unidade</th>
              <th className="border border-gray-300 px-4 py-2">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((produto) => (
              <tr key={produto.codigo}>
                <td className="border border-gray-300 px-4 py-2">{produto.codigo}</td>
                <td className="border border-gray-300 px-4 py-2">{produto.descricao}</td>
                <td className="border border-gray-300 px-4 py-2">{produto.unidade}</td>
                <td className="border border-gray-300 px-4 py-2">{produto.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EstoquePage;
