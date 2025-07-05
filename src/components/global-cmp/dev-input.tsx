//TSX code 
import React, { forwardRef } from "react";

type InputProps = {
  variant?: "base" | "bordered" | "faded" | "underline";
  size?: "sm" | "md" | "lg";
  labelName?: string;
  icon2?: React.ReactNode;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  reverseIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<"input">, "size">;

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const DevInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "base",
      size = "md",
      labelName,
      className,
      icon,
      icon2,
      rounded = "full",
      reverseIcon = false,
      ...props
    },
    ref
  ) => {
    const commonStyle = `w-full flex border border-input transition-[opacity, translate-x] ring-input/50 items-center ${
      icon && " gap-2 "
    },
    ${reverseIcon && "flex-row-reverse"}`;

    const inputVariants = {
      base: "bg-[#F5F8FF] dark:bg-[#1f2937]",
      bordered: "bg-transparent",
      faded: "bg-input/20 text-input",
      underline:
        "border-0 !ring-0 !border-input border-b relative after:content-[''] after:absolute after:h-0.5 after:bg-primary/50 after:-bottom-0.5 after:w-full after:scale-x-0  after:transition after:duration-300 after:origin-center rounded-none px-0 has-[:focus]:after:scale-x-100",
    };

    const inputRoundness = {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    };

    const inputSizes: { [key: string]: string } = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    };

    const inputSize = inputSizes[size] || inputSizes.md;
    const inputVariant = inputVariants[variant] || inputVariants.base;
    const inputRound = inputRoundness[rounded] || inputRoundness.full;

    return (
      <div>
        {labelName && (
          <label htmlFor={labelName} className="text-sm block m-1">
            {labelName}
          </label>
        )}

        <div
          className={cn(
            "has-[:focus]:ring",
            inputSize,
            commonStyle,
            inputRound,
            inputVariant,
            className
          )}
        >
          <span className="text-xl text-primary">{icon}</span>
          <input
            ref={ref}
            id={labelName && labelName}
            {...props}
            className="autofill:duration-[5000s] autofill:delay-0 autofill:ease-in-out bg-transparent rounded text-sm outline-0 w-full placeholder:text-muted-foreground/50"
          />
          <span className="text-xl text-primary">{icon2}</span>
        </div>
      </div>
    );
  }
);

export default DevInput;
