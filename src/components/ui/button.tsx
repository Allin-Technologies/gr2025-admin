import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 relative text-white rounded-lg text-sm font-semibold overflow-hidden hover:opacity-80 transition-all ease-linear duration-200 outline-none ring-transparent disabled:pointer-events-none h-14 disabled:pointer-events-none disabled:select-none",
  {
    variants: {
      variant: {
        primary: "bg-primary-110",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-[rgba(255,255,255,0.10)]",
        ghost: "!bg-transparent px-0 py-0 h-fit w-fit rounded-none",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[2.8rem] px-6 py-2",
        small: "min-w-[12rem] h-[2.5rem] px-6 min-w-fit",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
