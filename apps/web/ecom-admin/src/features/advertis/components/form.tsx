import { Button } from "@/components/ui/button"
import { type Advertise as FType, AdvertiseType } from "@schema/ecom"
import { Controller, useForm, useWatch } from "react-hook-form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FieldWrapper, InputErrorhandler } from "@ui/lib"
import { Input } from "@/components/ui/input"
import File from "@/components/ui/file"
import { Textarea } from "@/components/ui/textarea"
import { type Options, useUpsertMutation } from "@/hooks/tanStack/useUpsertData"
import type { ApiError } from "common"
import { cleanErrors, mapFormErrors } from "@utils/shared"
import { toast } from "sonner"
import Confirmation from "@/components/Confirmation"
import { useState } from "react"


interface Advertise extends Omit<FType, "image"> {
    image: File
}
type ToogleOptions = {
    value: Advertise["type"],
    label: string
}[]

const toggleOptions: ToogleOptions = [
    { value: AdvertiseType.POPUP, label: 'Popup' },
    { value: AdvertiseType.BANNER, label: 'Banner' },
]

const Form = ({ closeSheet }: {
    closeSheet: () => void
}) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<Advertise | null>(null);
    const { register, reset, control, setError, clearErrors: clearE, formState: { errors }, handleSubmit } = useForm<Advertise>({
        defaultValues: {
            type: AdvertiseType.POPUP,
        }
    })

    const options: Options<Advertise> = {
        mediaArray: ["image"],
        onSuccess: () => {
            toast.success("Advertise submitted successfully");
            reset()
            closeSheet();
        },
        onError: (error: ApiError) => {
            if (error.errors)
                mapFormErrors(error.errors, setError)
            else
                toast.error(error.message)
        },
        onSettled: () => {
            // any final operation
            setOpen(false);
        }
    }

    const { mutate, isPending } = useUpsertMutation<Advertise>(
        ["advertises"],
        "/admin/advertise",
        "/admin/advertise",
        options
    )

    const type = useWatch({
        control,
        name: "type"
    })
    const onsubmit = (data: Advertise) => {
        setData(data);
        setOpen(true);
    }
    const handleFinalSubmit = () => {
        if (data) {
            mutate({
                data
            });
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)} className="grid gap-3">
                {/* <div className="md:flex justify-end hidden gap-2">
                <Button type="button" variant={"destructive"}>
                    Reset
                </Button>
                <Button type="submit" >
                    Submit
                </Button>
            </div> */}
                <FieldWrapper>
                    <label htmlFor="title">Title
                        <span className="text-red-500"> *</span>
                    </label>
                    <Input id="title" placeholder="Title" {...register("title")} />
                    <InputErrorhandler errors={errors} name="title" />
                </FieldWrapper>

                <Controller name="type" control={control} render={({ field: { value, onChange } }) => <ToggleGroup type="single" className="flex justify-between w-full border-2 p-2" defaultValue="active" onValueChange={onChange} value={value} >
                    {toggleOptions.map((option) => (
                        <ToggleGroupItem
                            key={option.value}
                            value={option.value}
                            className="w-fit data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex-1 justify-center hover:bg-accent hover:text-accent-foreground"
                        >
                            {option.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>} />

                <div className="grid place-items-center">
                    <Controller name="image" control={control} render={({ field }) => <File className="h-28 w-72"{...field} errors={errors} accept="image/*" label="Image" />} />
                    <InputErrorhandler errors={errors} name="image" />
                </div>

                {type == AdvertiseType.POPUP && <FieldWrapper>
                    <label htmlFor="message">Message</label>
                    <Textarea id="message" placeholder="Message" {...register("message")} />
                    <InputErrorhandler errors={errors} name="message" />
                </FieldWrapper>}
                {type == AdvertiseType.BANNER && <FieldWrapper>
                    <label htmlFor="videoUrl">Video Url</label>
                    <Input id="videoUrl" placeholder="Video Url" {...register("videoUrl")} />
                    <InputErrorhandler errors={errors} name="videoUrl" />
                </FieldWrapper>}
                <FieldWrapper>
                    <label htmlFor="redirect">Redirect Link</label>
                    <Input id="redirect" placeholder="Redirect" {...register("redirectUrl")} />
                    <InputErrorhandler errors={errors} name="redirectUrl" />
                </FieldWrapper>

                <label className="flex items-center space-x-2">
                    <Input type="checkbox"
                        className="size-4" {...register("isDraft", {
                            value: true
                        })} />
                    <span>Save as Draft</span>
                </label>

                <div className="justify-end mt-6 mb-4 mr-4 flex">
                    <Button type="button" onClick={() => reset()} variant={"destructive"}>
                        Reset
                    </Button>
                    <Button type="submit" className="ml-2" onClick={() => {
                        cleanErrors<Advertise>(errors, clearE)
                    }}>
                        Submit
                    </Button>
                </div>
            </form>

            <Confirmation
                isPending={isPending}
                title="Submitting Advertise"
                message="Are you sure you want to submit this advertise?"
                action={handleFinalSubmit}
                state={{
                    open, setOpen: (v) => {
                        setOpen((prev) => v ?? !prev);
                    }
                }}
            />
        </>
    )
}

export default Form
