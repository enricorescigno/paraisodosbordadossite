
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  message: string;
  buttonText: string;
  buttonLink: string;
}

const EmptyState = ({ message, buttonText, buttonLink }: EmptyStateProps) => {
  return (
    <div className="text-center py-20">
      <p className="text-lg text-gray-600">{message}</p>
      <Link to={buttonLink} className="inline-block mt-4">
        <Button 
          variant="default" 
          size="lg" 
          className="rounded-full px-8"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
