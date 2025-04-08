
import { useEffect, useState } from "react";
import { buscarPrazosPagamento } from "../services/prazosPagamentoService";
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
import { Separator } from "@/components/ui/separator";

interface PrazoPagamento {
  id: string;
  prazos: number[];
}

const PrazosPagamentoPage = () => {
  const [prazos, setPrazos] = useState<PrazoPagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarPrazos = async () => {
      try {
        setLoading(true);
        const data = await buscarPrazosPagamento();
        
        if (data && data.dados) {
          setPrazos(data.dados);
        } else {
          setPrazos([]);
        }
        setErro(null);
      } catch (error: any) {
        console.error("Erro ao carregar prazos de pagamento:", error);
        setErro("Não foi possível carregar os dados de prazos de pagamento. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarPrazos();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Prazos para Pagamento</h1>
      
      {erro && (
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Condições de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Exibindo prazos disponíveis para pagamento em dias.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <LoadingSpinner />
      ) : prazos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Nenhum prazo de pagamento encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prazos.map((prazo) => (
            <Card key={prazo.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">ID: {prazo.id}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="font-medium text-sm text-muted-foreground mb-2">Parcelas (dias):</div>
                <div className="flex flex-wrap gap-2">
                  {prazo.prazos.map((dias, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 bg-gray-50">
                      {dias} dias
                    </Badge>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-sm">
                  <div>Total de parcelas:</div>
                  <div className="font-semibold">{prazo.prazos.length}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente Badge personalizado para este contexto
const Badge = ({ children, className, variant }: { children: React.ReactNode, className?: string, variant: string }) => {
  const baseClass = "rounded-full text-sm font-medium";
  const variantClass = variant === "outline" ? "border border-gray-300" : "bg-gray-100";
  
  return (
    <span className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

export default PrazosPagamentoPage;
