// components/AnimatedDiv.tsx
"use client"; // Mark this as a Client Component

import { motion, TargetAndTransition, VariantLabels } from "framer-motion";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  initial?: boolean | TargetAndTransition | VariantLabels | undefined;
  animate?: boolean | TargetAndTransition | VariantLabels | undefined;
  transition?: object;
  whileHover?: TargetAndTransition | VariantLabels | undefined;
  whileTap?: TargetAndTransition | VariantLabels | undefined;
}

export const AnimatedDiv = ({
  children,
  className,
  initial,
  animate,
  transition,
  whileHover,
  whileTap,
}: AnimatedDivProps) => {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.div>
  );
};