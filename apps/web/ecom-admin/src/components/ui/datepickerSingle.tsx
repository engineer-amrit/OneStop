"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export function DatePickerDemo(props: {
    date: Date | undefined
    size?: string;
    setDate: (date: Date | undefined) => void
}) {
    const { date, setDate, size } = props
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className={"data-[empty=true]:text-muted-foreground justify-start text-left font-normal " + (size ? "w-" + size : "w-48")}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" >
                <Calendar
                    onDayClick={() => {
                        setOpen(false)
                    }}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
            </PopoverContent>
        </Popover>
    )
}
