import { Button } from '@/components/ui/button'
import React from 'react'

interface State {
    open?: boolean;
    setOpen?: (v?: boolean) => void;
    children: React.ReactNode;
}

const DialogContext = React.createContext<{
    open: boolean;
    setOpen: (v?: boolean) => void;
} | null>(null);

export const useDialog = () => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

const CustomDialog = (props: State) => {
    const { children, open: controlledOpen, setOpen: controlledSetOpen } = props;
    const [internalOpen, setInternalOpen] = React.useState(false);

    const open = controlledOpen ? controlledOpen ?? !internalOpen : internalOpen;
    const setOpen = controlledSetOpen ?? ((v) => {
        setInternalOpen(prev => v ?? !prev);
    });

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
};

interface Props {
    children: React.ReactNode;
    className?: string;
}

const CDialogTrigger = ({ children, className }: Props) => {
    const { setOpen } = useDialog();
    if (!children) return null;
    return (
        <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            className={className}
        >
            {children}
        </Button>
    )
};

const CDialogContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => {
        const { open, setOpen } = useDialog();
        const [visible, setVisible] = React.useState(false);
        const overlayRef = React.useRef<HTMLDivElement>(null);


        // Trigger fade-in/fade-out on open change
        React.useEffect(() => {
            if (open) {
                requestAnimationFrame(() => setVisible(true));
            } else {
                setVisible(false);
            }
        }, [open]);

        // Close handler with transitionend
        const close = (e?: React.MouseEvent) => {
            if (!e || e.target === e.currentTarget) {
                setVisible(false);
                const overlay = overlayRef.current;
                if (overlay) {
                    const handler = (ev: TransitionEvent) => {
                        if (ev.propertyName === "opacity") {
                            setOpen(false); // unmount after animation
                            overlay.removeEventListener("transitionend", handler);
                        }
                    };
                    overlay.addEventListener("transitionend", handler);
                }
            }
        };

        // Don't render if closed and not visible
        if (!open && !visible) return null;

        return (
            <div
                ref={overlayRef}
                onClick={close}
                {...props}
                className={`
                    fixed inset-0 grid place-items-center bg-black/50 z-50
                    transition-opacity duration-300
                    ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            >
                <div
                    ref={ref}
                    className={`${className} transition-transform duration-300 ${visible ? "scale-100" : "scale-95"}`}
                >
                    {children}
                </div>

                <button
                    onClick={close}
                    className="absolute right-5 top-5 rounded-full p-1 lg:hidden transition"
                >
                    ×
                </button>
            </div>
        );
    }
);



export {
    CDialogTrigger,
    CustomDialog,
    CDialogContent
};
