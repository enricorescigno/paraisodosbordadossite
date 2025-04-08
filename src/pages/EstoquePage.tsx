
import { useEffect, useState } from "react";
import { buscarEstoque, enviarEstoqueParaN8n } from "../services/estoqueService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface ProdutoEstoque {
  codigo: string;
  descricao: string;
  saldo: number;
  unidade: string;
}

const EstoquePage = () => {
  const [estoque, setEstoque] = useState<ProdutoEstoque[]>([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const carregarEstoque = async () => {
      try {
        const data = await buscarEstoque();
        console.log("Resposta da API de estoque:", data);

        if (data && data.dados) {
          setEstoque(data.dados);
        } else {
          console.log("Nenhum dado encontrado no estoque.");
        }
      } catch (error) {
        console.error("Erro ao carregar estoque:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do estoque.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    carregarEstoque();
  }, [toast]);

  const handleEnviarParaN8n = async () => {
    setEnviando(true);
    try {
      const resultado = await enviarEstoqueParaN8n();
      if (resultado) {
        toast({
          title: "Sucesso",
          description: "Dados enviados com sucesso para o n8n.",
        });
      } else {
        toast({
          title: "Erro",
          description: "Falha ao enviar os dados para o n8n.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar para n8n:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar os dados para o n8n.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Estoque Atual</h1>
      
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-6 flex items-center gap-2 disabled:opacity-70"
        onClick={handleEnviarParaN8n}
        disabled={loading || enviando}
      >
        {enviando ? "Enviando..." : "Enviar Estoque para n8n"}
      </button>

      {loading ? (
        <LoadingSpinner />
      ) : estoque.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estoque.map((produto) => (
                <TableRow key={produto.codigo}>
                  <TableCell>{produto.codigo}</TableCell>
                  <TableCell>{produto.descricao}</TableCell>
                  <TableCell>{produto.unidade}</TableCell>
                  <TableCell>{produto.saldo}</TableCell>
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
