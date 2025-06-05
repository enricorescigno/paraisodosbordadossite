
import React from 'react';

interface ProductInfoProps {
  name: string;
  description?: string;
  isNew?: boolean;
}

const ProductInfo = ({ name, description, isNew }: ProductInfoProps) => {
  return (
    <div className="flex flex-col flex-grow w-full">
      <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2">
        {name}
        {isNew && (
          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Novo
          </span>
        )}
      </h3>
      
      {description && (
        <p className="text-center text-gray-500 mb-4 text-sm line-clamp-2 h-[2.5rem] overflow-hidden mx-auto max-w-[90%] md:text-sm">
          {description}
        </p>
      )}
    </div>
  );
};

export default ProductInfo;
