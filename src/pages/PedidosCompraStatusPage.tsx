
import { useEffect, useState } from "react";
import { buscarStatusPedidosCompra } from "../services/pedidosCompraStatusService";
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
import { Badge } from "@/components/ui/badge";

interface StatusPedidoCompra {
  id: number;
  descricao: string;
}

const PedidosCompraStatusPage = () => {
  const [statusList, setStatusList] = useState<StatusPedidoCompra[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarStatus = async () => {
      try {
        setLoading(true);
        const data = await buscarStatusPedidosCompra();
        
        if (data && data.dados) {
          setStatusList(data.dados);
        } else {
          setStatusList([]);
        }
        setErro(null);
      } catch (error: any) {
        console.error("Erro ao carregar status de pedidos:", error);
        setErro("Não foi possível carregar os dados de status. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarStatus();
  }, []);

  // Função para determinar a cor do badge com base no ID do status
  const getBadgeVariant = (id: number) => {
    switch(id) {
      case 1:
        return "default"; // Azul (padrão)
      case 2:
        return "secondary"; // Cinza
      case 3:
        return "outline"; // Contorno
      case 4:
        return "destructive"; // Vermelho
      case 5:
        return "success"; // Verde customizado
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Status de Pedidos de Compra</h1>
      
      {erro && (
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Lista de Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Exibindo informações de status disponíveis para pedidos de compra.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <LoadingSpinner />
      ) : statusList.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Nenhum status de pedido encontrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Descrição</TableHead>
                <TableHead className="font-semibold">Visualização</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statusList.map((status) => (
                <TableRow 
                  key={status.id}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{status.id}</TableCell>
                  <TableCell>{status.descricao}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(status.id)}>
                      {status.descricao}
                    </Badge>
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

export default PedidosCompraStatusPage;
