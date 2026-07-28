"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

// Native drag/animation event handlers conflict with framer-motion's own typings,
// so we omit them from the wrapped HTML attribute types.
type ConflictingProps = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration";

type Variant = "primary" | "outline" | "dark" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium text-[14.5px] px-6 py-3 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-red text-white shadow-glow hover:bg-red-dark",
  outline:
    "border border-ink/20 dark:border-white/25 text-ink dark:text-paper hover:border-red hover:text-red",
  dark: "bg-ink text-white dark:bg-white dark:text-ink hover:opacity-90",
  ghost: "text-ink dark:text-paper hover:text-red",
};

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps>) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function LinkButton({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingProps> & { href: string }) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
