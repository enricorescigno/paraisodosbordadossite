
import { useEffect, useState } from "react";
import { buscarVendas } from "../services/vendasService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface Venda {
  idProduto: number;
  codigo: string;
  descricao: string;
  quantidade: number;
  valorTotal: number;
  data: string;
}

const VendasPage = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [dataInicial, setDataInicial] = useState("2024-02-01");
  const [dataFinal, setDataFinal] = useState("2024-02-28");
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalQuantidade, setTotalQuantidade] = useState(0);

  useEffect(() => {
    const carregarVendas = async () => {
      try {
        setLoading(true);
        const data = await buscarVendas(dataInicial, dataFinal);
        
        if (data && data.dados) {
          setVendas(data.dados);
          
          // Calcular totais
          const totQuant = data.dados.reduce((acc: number, venda: Venda) => acc + venda.quantidade, 0);
          const totValor = data.dados.reduce((acc: number, venda: Venda) => acc + venda.valorTotal, 0);
          
          setTotalQuantidade(totQuant);
          setTotalVendas(totValor);
        } else {
          setVendas([]);
          setTotalQuantidade(0);
          setTotalVendas(0);
        }
        setErro(null);
      } catch (error: any) {
        console.error("Erro ao carregar vendas:", error);
        setErro("Não foi possível carregar os dados de vendas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarVendas();
  }, [dataInicial, dataFinal]);

  const handlePeriodoChange = () => {
    // Esta função seria implementada para um seletor de período
    // Por ora, usamos valores padrão
  };

  // Formatar valor monetário
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Relatório de Vendas</h1>
      
      {erro && (
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Período</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dataInicial.split('-').reverse().join('/')} a {dataFinal.split('-').reverse().join('/')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Total de Itens Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {totalQuantidade.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-brand-red">
              {formatarMoeda(totalVendas)}
            </p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : vendas.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Nenhuma venda encontrada no período selecionado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Código</TableHead>
                <TableHead className="font-semibold">Descrição</TableHead>
                <TableHead className="font-semibold">Data</TableHead>
                <TableHead className="font-semibold text-right">Quantidade</TableHead>
                <TableHead className="font-semibold text-right">Valor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendas.map((venda, index) => (
                <TableRow 
                  key={`${venda.idProduto}-${index}`}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{venda.idProduto}</TableCell>
                  <TableCell>{venda.codigo}</TableCell>
                  <TableCell>{venda.descricao}</TableCell>
                  <TableCell>{venda.data ? formatarData(venda.data) : "N/A"}</TableCell>
                  <TableCell className="text-right">
                    {venda.quantidade.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatarMoeda(venda.valorTotal)}
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

export default VendasPage;
