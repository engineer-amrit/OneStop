// PreviewPortal.tsx
import { createPortal } from "react-dom";

export function PreviewPortal({ children }: { children: React.ReactNode }) {
    if (typeof window === "undefined") return null;
    const root = document.getElementById("preview-root");
    return root ? createPortal(children, root) : null;
}
