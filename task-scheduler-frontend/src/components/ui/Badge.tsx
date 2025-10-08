import { cva, type VariantProps } from "class-variance-authority";
import type { FC, HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        ACTIVE: "bg-green-100 text-green-800",
        INACTIVE: "bg-gray-100 text-gray-800",
        SUCCESS: "bg-blue-100 text-blue-800",
        FAILED: "bg-red-100 text-red-800",
        RETRYING: "bg-yellow-100 text-yellow-800",
      },
    },
    defaultVariants: {
      variant: "INACTIVE",
    },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div
      className={badgeVariants({ variant, className })}
      {...props}
    />
  );
};

export { Badge, badgeVariants };
