
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface ProductActionsProps {
  id: number | string;
  isPortfolio?: boolean;
  showActionButton?: boolean;
}

const ProductActions = ({ id, isPortfolio = false, showActionButton = true }: ProductActionsProps) => {
  if (!showActionButton) return null;

  return (
    <div className="flex justify-center mt-auto w-full">
      <Link to={`/produto/${id}`} className="w-full sm:w-auto flex justify-center">
        <Button 
          variant="default" 
          size="lg" 
          className="rounded-full px-8 w-full max-w-[200px] min-h-[48px]" 
          aria-label={`Ver detalhes de produto ${id}`}
        >
          {isPortfolio ? "Ver Detalhes" : "Saiba Mais"}
        </Button>
      </Link>
    </div>
  );
};

export default ProductActions;
