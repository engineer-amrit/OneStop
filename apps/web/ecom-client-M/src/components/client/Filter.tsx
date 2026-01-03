import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import FilterForm from "./FilterForm";
import { useRef } from "react";

const Filter = ({ className }: {
    className?: string
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button ref={buttonRef} className={className} variant={"tertiary"}>
                    <i className="fa-solid fa-bars-filter"></i>
                    <span>Filter</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="p-4 text-foreground ">
                <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                <SheetDescription className="text-nowrap">
                    Filter products by category, price, and more.
                </SheetDescription>

                <FilterForm buttonRef={buttonRef} />
            </SheetContent>
        </Sheet>
    );
};

export default Filter;
