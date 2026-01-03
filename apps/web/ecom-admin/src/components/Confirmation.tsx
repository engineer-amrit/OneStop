import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BeatLoader } from 'react-spinners'


interface Props {
    action: () => void;
    isPending: boolean;
    children?: React.ReactNode;
    state: {
        setOpen: (n?: boolean) => void;
        open: boolean;
    },
    title: string;
    message: string;
}
const Confirmation = (props: Props) => {
    const { action, isPending, title, message } = props;
    return (

        < Dialog
            open={props.state.open}
            onOpenChange={(v) => props.state.setOpen(v)}
        >
            <DialogTrigger hidden={props.children ? false : true}>
                {props.children}
            </DialogTrigger>
            <DialogContent className="max-h-[98svh]  md:max-h-[98vh] w-[400px] xl:max-w-5xl bg-card p-5 rounded-lg overflow-auto
                    transition-all duration-300
                    transform
                    ">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription className="font-semibold text-white">
                        {message}
                    </DialogDescription>
                </DialogHeader>
                {!isPending ? (
                    <div className="flex justify-end gap-3 text-foreground">
                        <DialogClose asChild>
                            <Button variant={"destructive"} className="rounded-xl p-3">
                                No
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={() => {
                                action();
                                // props.state.setOpen(false);
                            }}
                            className="rounded-xl p-3"
                        >
                            Yes
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end">
                        <BeatLoader color="white" size={20} />
                    </div>
                )}
            </DialogContent>
        </Dialog >
    )
}

export default Confirmation
