
import { useEffect, useState } from "react";
import { buscarProdutosPedidoCompra } from "../services/pedidosCompraService";
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

interface ProdutoPedidoCompra {
  idProduto: number;
  descricao: string;
  quantidadePedida: number;
  quantidadeAtendida: number;
  preco: number;
  unidadeDeMedida: string;
}

const PedidosCompraProdutosPage = () => {
  const [produtos, setProdutos] = useState<ProdutoPedidoCompra[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [idPedido, setIdPedido] = useState("1234567");
  const [inputIdPedido, setInputIdPedido] = useState("1234567");

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        const data = await buscarProdutosPedidoCompra(idPedido);
        
        if (data && data.dados) {
          setProdutos(data.dados);
        } else {
          setProdutos([]);
        }
        setErro(null);
      } catch (error: any) {
        console.error("Erro ao carregar produtos do pedido:", error);
        setErro("Não foi possível carregar os dados dos produtos do pedido. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [idPedido]);

  const handleBuscar = () => {
    setIdPedido(inputIdPedido);
  };

  // Formatar valor monetário
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Produtos do Pedido de Compra</h1>

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
          <CardTitle>Detalhes do Pedido {idPedido}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Exibindo informações dos produtos do pedido de compra.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <LoadingSpinner />
      ) : produtos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado para este pedido.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">ID Produto</TableHead>
                <TableHead className="font-semibold">Descrição</TableHead>
                <TableHead className="font-semibold text-right">Qtd. Pedida</TableHead>
                <TableHead className="font-semibold text-right">Qtd. Atendida</TableHead>
                <TableHead className="font-semibold text-right">Preço</TableHead>
                <TableHead className="font-semibold">Unidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow 
                  key={produto.idProduto}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{produto.idProduto}</TableCell>
                  <TableCell>{produto.descricao}</TableCell>
                  <TableCell className="text-right">
                    {produto.quantidadePedida.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    {produto.quantidadeAtendida.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatarMoeda(produto.preco)}
                  </TableCell>
                  <TableCell>{produto.unidadeDeMedida}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PedidosCompraProdutosPage;
