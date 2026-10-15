import { useEffect } from "react";
import { Toaster, toast } from "sonner";

function messageOf(event: Event): string | null {
  if (!(event instanceof CustomEvent)) return null;
  const detail: unknown = event.detail;
  if (typeof detail !== "object" || detail === null || !("message" in detail)) return null;
  return typeof detail.message === "string" ? detail.message : null;
}

export default function OmniToaster() {
  useEffect(() => {
    function onSent(event: Event) {
      const message = messageOf(event);
      if (message === null) return;
      event.preventDefault();
      toast.success(message);
    }
    function onError(event: Event) {
      const message = messageOf(event);
      if (message === null) return;
      event.preventDefault();
      toast.error(message);
    }
    document.addEventListener("omni:sent", onSent);
    document.addEventListener("omni:error", onError);
    return () => {
      document.removeEventListener("omni:sent", onSent);
      document.removeEventListener("omni:error", onError);
    };
  }, []);

  return <Toaster position="bottom-right" theme="dark" richColors closeButton />;
}
