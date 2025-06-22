"use client"
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ripple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ripple = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [ripples, setRipples] = React.useState<{ x: number; y: number; size: number; key: number }[]>([]);
    const rippleCount = React.useRef(0);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        setRipples((prev) => [
          ...prev,
          { x, y, size, key: rippleCount.current++ }
        ]);
      }
      if (props.onClick) props.onClick(e);
    };

    React.useEffect(() => {
      if (ripples.length > 0) {
        const timeout = setTimeout(() => {
          setRipples((prev) => prev.slice(1));
        }, 500);
        return () => clearTimeout(timeout);
      }
    }, [ripples]);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "relative overflow-hidden")}
        ref={(node: any) => {
          if (!asChild) buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        onClick={handleClick as any}
        {...props}
      >
        {props.children}
        {ripple && (
          <span className="absolute inset-0 pointer-events-none">
            {ripples.map(({ x, y, size, key }) => (
              <span
                key={key}
                className="absolute bg-main-blue/30 rounded-full animate-ripple"
                style={{ left: x, top: y, width: size, height: size }}
              />
            ))}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// Add ripple animation to global styles if not present
// .animate-ripple { animation: ripple 0.5s linear; }
// @keyframes ripple { from { transform: scale(0); opacity: 0.7; } to { transform: scale(2); opacity: 0; } }

export { Button, buttonVariants };
