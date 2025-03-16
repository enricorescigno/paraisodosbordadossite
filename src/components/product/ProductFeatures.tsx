
import React from 'react';

interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures = ({ features }: ProductFeaturesProps) => {
  if (!features || features.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-gray-800">Características:</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red mt-1.5"></span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
