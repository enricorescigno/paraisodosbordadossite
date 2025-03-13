
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const appleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-brand-red text-white hover:bg-brand-red/90 shadow-sm hover:shadow-md",
        secondary: "bg-white text-brand-dark border border-gray-200 hover:bg-gray-50 shadow-sm",
        outline: "bg-white text-brand-red border-2 border-brand-red hover:bg-brand-red hover:text-white transition-colors ease-in-out duration-300",
        ghost: "text-brand-dark hover:bg-gray-100",
        link: "text-brand-red underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AppleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appleButtonVariants> {
  asChild?: boolean
}

const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(appleButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
AppleButton.displayName = "AppleButton"

export { AppleButton, appleButtonVariants }
