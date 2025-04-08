import { useEffect, useState } from "react";
import { buscarEstoque, enviarEstoqueParaN8n } from "../services/estoqueService";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface ProdutoEstoque {
  codigo: string;
  descricao: string;
  saldo: number;
  unidade: string;
}

const EstoquePage = () => {
  const [estoque, setEstoque] = useState<ProdutoEstoque[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarEstoque = async () => {
      try {
        setLoading(true);
        const data = await buscarEstoque();
        
        if (data && data.dados) {
          setEstoque(data.dados);
          
          // Enviar os dados para o n8n
          await enviarEstoqueParaN8n();
        } else {
          setEstoque([]);
        }
        setErro(null);
      } catch (error: any) {
        console.error("Erro ao carregar estoque:", error);
        setErro("Não foi possível carregar os dados do estoque. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarEstoque();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Estoque Atual</h1>
      
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {erro}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : estoque.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado no estoque.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">Código</TableHead>
                <TableHead className="font-semibold">Descrição</TableHead>
                <TableHead className="font-semibold">Unidade</TableHead>
                <TableHead className="font-semibold text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estoque.map((produto) => (
                <TableRow 
                  key={produto.codigo}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{produto.codigo}</TableCell>
                  <TableCell>{produto.descricao}</TableCell>
                  <TableCell>{produto.unidade}</TableCell>
                  <TableCell className="text-right">
                    {produto.saldo.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EstoquePage;