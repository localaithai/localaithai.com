import { MotionConfig } from "framer-motion";
import { type ComponentType, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function useStaticMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}

/**
 * Next.js rendered every page inside one MotionConfig. Each Astro island is its
 * own React root, so every motion island carries the provider itself.
 */
export function withMotionConfig<P extends object>(
  Component: ComponentType<P>,
) {
  function MotionIsland(props: P) {
    const staticMotion = useStaticMotion();
    return (
      <MotionConfig reducedMotion="user" skipAnimations={staticMotion}>
        <Component {...props} />
      </MotionConfig>
    );
  }
  return MotionIsland;
}
