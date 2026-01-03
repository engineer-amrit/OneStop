import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Form from "./form"

const AdvertisPrimaryBtns = () => {
    const [open, setOpen] = useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen} modal={false}>
            <SheetTrigger asChild>
                <Button className="w-fit relative">
                    <i className="fa-solid fa-plus cursor-pointer text-lg" />
                    Create
                </Button>
            </SheetTrigger>
            <SheetContent className="p-4 w-[90vw]  overflow-auto" >
                <SheetHeader>
                    <SheetTitle>
                        Create Advertis
                    </SheetTitle>
                    <SheetDescription>
                        Fill the form below to create a new advertis.
                    </SheetDescription>
                </SheetHeader>
                <Form
                    closeSheet={() => setOpen(false)}
                />
            </SheetContent>
        </Sheet>
    )
}

export default AdvertisPrimaryBtns
