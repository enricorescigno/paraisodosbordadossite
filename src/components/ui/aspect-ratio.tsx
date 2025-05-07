
import * as React from "react"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  className?: string;
  children?: React.ReactNode;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1, children, ...props }, ref) => {
    return (
      <div 
        className={`relative w-full overflow-hidden ${className || ''}`} 
        ref={ref} 
        {...props}
      >
        <div 
          style={{ 
            paddingBottom: `${100 / ratio}%`,
            height: 0 
          }} 
        />
        <div className="absolute inset-0">
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
