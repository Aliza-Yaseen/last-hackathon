// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@/components/lib/utils"

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-8",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button"
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = "Button"

// export { Button, buttonVariants }



// src/components/ui/button.tsx

import React from "react";

// Define the types for ButtonProps, including `className` and `disabled`
type ButtonProps = {
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | "danger";  // added "danger" if needed
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; // Allow custom class names
  disabled?: boolean; // Allow disabled state
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  onClick,
  children,
  className = "", // Default to an empty string for className if not passed
  disabled = false, // Default to false for disabled
}) => {
  // Base class for the button
  let classNames = "px-4 py-2 rounded-md";

  if (variant === "default") {
    classNames += " bg-blue-500 text-white";
  } else if (variant === "destructive") {
    classNames += " bg-red-500 text-white";
  } else if (variant === "outline") {
    classNames += " border border-gray-500 text-gray-500";
  } else if (variant === "secondary") {
    classNames += " bg-gray-500 text-white";
  } else if (variant === "ghost") {
    classNames += " bg-transparent text-black";
  } else if (variant === "danger") {
    classNames += " bg-red-600 text-white"; // Custom "danger" class
  }

  // Add custom classNames if provided
  classNames += ` ${className}`;

  return (
    <button onClick={onClick} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
};

export { Button };
