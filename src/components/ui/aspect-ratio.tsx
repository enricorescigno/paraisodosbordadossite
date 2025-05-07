
import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className={`relative w-full overflow-hidden ${className || ''}`} ref={ref}>
    <div style={{ 
      paddingBottom: `${100 / (props.ratio || 1)}%`,
      height: 0 
    }} />
    <div className="absolute inset-0">
      {props.children}
    </div>
  </div>
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
