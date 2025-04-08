
import { useEffect, useState } from "react";
import { buscarTributacoes } from "../services/tributacoesService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface Tributacao {
  idProduto: number;
  codigo: string;
  descricao: string;
  ncm: string;
  cst: string;
  cfop: string;
  aliquotaIcms: number;
  aliquotaIpi: number;
}

const TributacoesPage = () => {
  const [tributacoes, setTributacoes] = useState<Tributacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    const carregarTributacoes = async () => {
      try {
        setLoading(true);
        const data = await buscarTributacoes(paginaAtual, itensPorPagina);
        
        if (data && data.dados) {
          setTributacoes(data.dados);
          
          // Calcular total de páginas se disponível
          if (data.totalRegistros) {
            setTotalPaginas(Math.ceil(data.totalRegistros / itensPorPagina));
          }
        } else {
          setTributacoes([]);
        }
        setErro(null);
      } catch (error: any) {
        console.error("Erro ao carregar tributações:", error);
        setErro("Não foi possível carregar os dados de tributações. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    carregarTributacoes();
  }, [paginaAtual]);

  const handlePaginaClick = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Tributações de Produtos</h1>
      
      {erro && (
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      <Card className="p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          Exibindo informações fiscais e tributárias dos produtos cadastrados no sistema.
          Página {paginaAtual} de {totalPaginas}.
        </p>
      </Card>

      {loading ? (
        <LoadingSpinner />
      ) : tributacoes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Nenhuma tributação encontrada.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Código</TableHead>
                <TableHead className="font-semibold">Descrição</TableHead>
                <TableHead className="font-semibold">NCM</TableHead>
                <TableHead className="font-semibold">CST</TableHead>
                <TableHead className="font-semibold">CFOP</TableHead>
                <TableHead className="font-semibold text-right">Alíquota ICMS</TableHead>
                <TableHead className="font-semibold text-right">Alíquota IPI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tributacoes.map((tributacao) => (
                <TableRow 
                  key={tributacao.idProduto}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{tributacao.idProduto}</TableCell>
                  <TableCell>{tributacao.codigo}</TableCell>
                  <TableCell>{tributacao.descricao}</TableCell>
                  <TableCell>{tributacao.ncm}</TableCell>
                  <TableCell>{tributacao.cst}</TableCell>
                  <TableCell>{tributacao.cfop}</TableCell>
                  <TableCell className="text-right">
                    {tributacao.aliquotaIcms.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}%
                  </TableCell>
                  <TableCell className="text-right">
                    {tributacao.aliquotaIpi.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {!loading && tributacoes.length > 0 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePaginaClick(Math.max(1, paginaAtual - 1))}
                className={paginaAtual === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
              const pagina = i + 1;
              return (
                <PaginationItem key={pagina}>
                  <PaginationLink
                    isActive={pagina === paginaAtual}
                    onClick={() => handlePaginaClick(pagina)}
                  >
                    {pagina}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPaginas > 5 && (
              <>
                <PaginationItem>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={totalPaginas === paginaAtual}
                    onClick={() => handlePaginaClick(totalPaginas)}
                  >
                    {totalPaginas}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePaginaClick(Math.min(totalPaginas, paginaAtual + 1))}
                className={paginaAtual === totalPaginas ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TributacoesPage;
