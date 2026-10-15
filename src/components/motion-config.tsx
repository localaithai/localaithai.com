import { MotionConfig } from "framer-motion";
import type { ComponentType } from "react";

/**
 * Next.js rendered every page inside one MotionConfig. Each Astro island is its
 * own React root, so every motion island carries the provider itself.
 */
export function withMotionConfig<P extends object>(
  Component: ComponentType<P>,
) {
  function MotionIsland(props: P) {
    return (
      <MotionConfig reducedMotion="user">
        <Component {...props} />
      </MotionConfig>
    );
  }
  return MotionIsland;
}
