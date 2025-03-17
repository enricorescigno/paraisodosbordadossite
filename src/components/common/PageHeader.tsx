
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="mb-16 space-y-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight font-medium text-center">
        {title}
      </h1>
      <p className="text-center text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-normal">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
