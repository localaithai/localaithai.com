import { type MouseEvent, type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { withMotionConfig } from "@/components/motion-config";

interface CrossSiteLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

function CrossSiteLink({
  href,
  children,
  className = "",
}: CrossSiteLinkProps) {
  const [navigating, setNavigating] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNavigating(true);
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>

      <AnimatePresence>
        {navigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060a14]"
          >
            {/* Spinner */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-[#00e5ff]/20 border-t-[#00e5ff]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="text-xs text-[#94a3b8] tracking-wider">
                Loading...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default withMotionConfig(CrossSiteLink);
