import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-[3px] aria-invalid:ring-red-600/20 dark:aria-invalid:ring-red-600/40 aria-invalid:border-red-600 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        "primary-solid":
          "border-transparent bg-neutral-900 text-neutral-50 [a&]:hover:bg-neutral-900/90 focus-visible:border-neutral-400 focus-visible:ring-neutral-400/50",
        "primary-subtle":
          "border-transparent bg-neutral-100 text-neutral-900 font-bold [a&]:hover:bg-neutral-100/90 focus-visible:border-neutral-400 focus-visible:ring-neutral-400/50",
        "primary-outline":
          "text-neutral-950 [a&]:hover:bg-neutral-100 [a&]:hover:text-neutral-900 focus-visible:border-neutral-400 focus-visible:ring-neutral-400/50",
        "destructive-solid":
          "bg-red-600 text-white [a&]:hover:bg-red-600/90 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40 dark:bg-red-600/60",
        "destructive-subtle":
          "border-transparent bg-red-100 text-red-900 font-bold [a&]:hover:bg-red-100/90 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40 dark:bg-red-600/60",
        "destructive-outline":
          "border-red-500 bg-white text-red-600 [a&]:hover:text-red-500 [a&]:hover:border-red-500/90 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40 dark:bg-red-600/60",
        "success-solid":
          "bg-green-600 text-white [a&]:hover:bg-green-600/90 focus-visible:ring-green-600/20 dark:focus-visible:ring-green-600/40 dark:bg-green-600/60",
        "success-subtle":
          "border-transparent bg-green-100 text-green-900 font-bold [a&]:hover:bg-green-100/90 focus-visible:ring-green-600/20 dark:focus-visible:ring-green-600/40 dark:bg-green-600/60",
        "success-outline":
          "border-green-500 bg-white text-green-600 [a&]:hover:text-green-500 [a&]:hover:border-green-500/90 focus-visible:ring-green-600/20 dark:focus-visible:ring-green-600/40 dark:bg-green-600/60",
        "warning-solid":
          "bg-yellow-600 text-white [a&]:hover:bg-yellow-600/90 focus-visible:ring-yellow-600/20 dark:focus-visible:ring-yellow-600/40 dark:bg-yellow-600/60",
        "warning-subtle":
          "border-transparent bg-yellow-100 text-yellow-900 font-bold [a&]:hover:bg-yellow-100/90 focus-visible:ring-yellow-600/20 dark:focus-visible:ring-yellow-600/40 dark:bg-yellow-600/60",
        "warning-outline":
          "border-yellow-500 bg-white text-yellow-600 [a&]:hover:text-yellow-500 [a&]:hover:border-yellow-500/90 focus-visible:ring-yellow-600/20 dark:focus-visible:ring-yellow-600/40 dark:bg-yellow-600/60",
        "warm-solid":
          "bg-orange-600 text-white [a&]:hover:bg-orange-600/90 focus-visible:ring-orange-600/20 dark:focus-visible:ring-orange-600/40 dark:bg-orange-600/60",
        "warm-subtle":
          "border-transparent bg-orange-100 text-orange-900 font-bold [a&]:hover:bg-orange-100/90 focus-visible:ring-orange-600/20 dark:focus-visible:ring-orange-600/40 dark:bg-orange-600/60",
        "warm-outline":
          "border-orange-500 bg-white text-orange-600 [a&]:hover:text-orange-500 [a&]:hover:border-orange-500/90 focus-visible:ring-orange-600/20 dark:focus-visible:ring-orange-600/40 dark:bg-orange-600/60",
      },
    },
    defaultVariants: {
      variant: "primary-solid",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
