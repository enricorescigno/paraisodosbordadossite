
import { useEffect, useState } from "react";
import { buscarDistribuicaoPedidoCompra } from "../services/pedidosCompraDistribuicaoService";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Filial {
  idFilial: number;
  quantidadePedida: number;
  quantidadeAtendida: number;
}

interface DistribuicaoProduto {
  idProduto: number;
  quantidadePorEmbalagem: number;
  filiais: Filial[];
}

const PedidosCompraDistribuicaoPage = () => {
  const [distribuicao, setDistribuicao] = useState<DistribuicaoProduto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [idPedido, setIdPedido] = useState("1234567");
  const [inputIdPedido, setInputIdPedido] = useState("1234567");

  useEffect(() => {
    const carregarDistribuicao = async () => {
      try {
        setLoading(true);
        const data = await buscarDistribuicaoPedidoCompra(idPedido);
        
        if (data && data.dados) {
          setDistribuicao(data.dados);
        } else {
          setDistribuicao([]);
        }
        setErro(null);
      } catch (error: any) {
        console.error("Erro ao carregar distribuição do pedido:", error);
        setErro("Não foi possível carregar os dados de distribuição do pedido. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarDistribuicao();
  }, [idPedido]);

  const handleBuscar = () => {
    setIdPedido(inputIdPedido);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Distribuição do Pedido de Compra</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
        <div className="flex-1">
          <label htmlFor="idPedido" className="block text-sm font-medium text-gray-700 mb-1">
            ID do Pedido
          </label>
          <Input
            id="idPedido"
            value={inputIdPedido}
            onChange={(e) => setInputIdPedido(e.target.value)}
            placeholder="Digite o ID do pedido"
            className="max-w-xs"
          />
        </div>
        <Button onClick={handleBuscar}>Buscar</Button>
      </div>
      
      {erro && (
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Distribuição por Filial - Pedido {idPedido}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Exibindo informações de distribuição do pedido de compra entre filiais.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <LoadingSpinner />
      ) : distribuicao.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Nenhuma distribuição encontrada para este pedido.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {distribuicao.map((produto) => (
            <Card key={produto.idProduto} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">
                  Produto ID: {produto.idProduto} - Qtd. por Embalagem: {produto.quantidadePorEmbalagem}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">ID Filial</TableHead>
                        <TableHead className="font-semibold text-right">Qtd. Pedida</TableHead>
                        <TableHead className="font-semibold text-right">Qtd. Atendida</TableHead>
                        <TableHead className="font-semibold text-right">% Atendimento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {produto.filiais.map((filial) => (
                        <TableRow 
                          key={`${produto.idProduto}-${filial.idFilial}`}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">{filial.idFilial}</TableCell>
                          <TableCell className="text-right">{filial.quantidadePedida}</TableCell>
                          <TableCell className="text-right">{filial.quantidadeAtendida}</TableCell>
                          <TableCell className="text-right">
                            {filial.quantidadePedida > 0 
                              ? `${((filial.quantidadeAtendida / filial.quantidadePedida) * 100).toFixed(1)}%` 
                              : '0%'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidosCompraDistribuicaoPage;
