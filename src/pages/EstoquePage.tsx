import { useEffect, useState } from "react";
import { buscarEstoque } from "../services/estoqueService";

interface ProdutoEstoque {
  codigo: string;
  descricao: string;
  saldo: number;
  unidade: string;
}

const EstoquePage = () => {
  const [estoque, setEstoque] = useState<ProdutoEstoque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarEstoque = async () => {
      const data = await buscarEstoque();
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
