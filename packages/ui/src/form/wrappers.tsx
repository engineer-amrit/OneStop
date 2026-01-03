import { cn } from "../utils.js";

export const FieldWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("flex flex-col gap-2 p-1", className)}>
        {children}
    </div>
);