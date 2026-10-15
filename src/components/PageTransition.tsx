import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { withMotionConfig } from "@/components/motion-config";

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default withMotionConfig(PageTransition);
