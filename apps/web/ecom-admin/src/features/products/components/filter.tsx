import { Button } from "@/components/ui/button";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxTypes";
import { fetchNode } from "@/store/node-store";
import { type ProductQueryFront } from "@schema/ecom";
// import { FilterFields } from "@/config/form/filter";
import { flattenToQuery, queryToObj } from "@utils/shared";
import { DatePickerDemo } from "@/components/ui/datepickerSingle";
import {
    Sheet,
    SheetContent, SheetTrigger,
    SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldWrapper } from "@ui/lib";
import { useNavigate, useSearch } from "@tanstack/react-router";


const FilterMobile = () => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const d = useSearch({ from: "/_authenticated/products/" });
    const keys = Object.keys(d);
    const dont = ['page', 'limit', 'sortBy', 'sortOrder'];
    const isFilter = keys.some((key) => !dont.includes(key));

    useEffect(() => {
        dispatch(fetchNode())
    }, [dispatch])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="w-fit relative">
                    <i className="fa-solid fa-filter cursor-pointer text-lg" />
                    {/* red big dot */}
                    {isFilter && <span className="absolute top-0.5 right-0.5 h-3 w-3 bg-red-600 rounded-full border-2"></span>}
                </Button>
            </SheetTrigger>
            <SheetContent className="p-4 pt-7 w-[90vw] " >
                <SheetHeader hidden>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <Form
                    d={d}
                    keys={keys}
                    setOpen={setOpen}
                />

            </SheetContent>
        </Sheet>
    )
}
const Form = ({
    setOpen,
    d,
    keys,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    d: Record<string, string>;
    keys: string[];
}) => {
    const navigate = useNavigate({ from: "/products" });
    const { nodes: node } = useAppSelector(state => state.Node);
    const { control, register, reset, handleSubmit, setValue } = useForm<ProductQueryFront>({
    });
    useEffect(() => {
        if (keys.length > 0) {
            const obj = queryToObj(d) as ProductQueryFront;
            for (const key of Object.keys(obj)) {
                setValue(key as keyof ProductQueryFront, obj[key as keyof ProductQueryFront]);
            }
        }
    }, [d, setValue, keys]);

    const category = useWatch({
        control,
        name: "category"
    });

    const getSubCat = useCallback((cat: string) => {
        const subcat = node?.categories.find((e) => e.name === cat);
        return subcat?.children?.map((el) => el.name) || []
    }
        , [node])


    const onSubmit = (data: ProductQueryFront) => {
        const query = flattenToQuery(data);
        navigate({ search: query });
        setOpen(false);
    }
    return <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-2 space-y-3.5 justify-between w-full items-center">
        <Label>Price</Label>
        <div className="flex gap-2 justify-center items-center ">
            <Input
                {...register("price.min", { valueAsNumber: true })}
                placeholder="min Price" type="number" className=" bg-card " step={0.1} />
            <span className="border w-4 border-accent-foreground" />
            <Input
                {...register("price.max", { valueAsNumber: true })}
                placeholder="max Price" type="number" className="bg-card " step={0.1} />

        </div>

        <FieldWrapper className="w-[calc((100%/2)-0.5rem)]">
            <Label>Brand</Label>
            <select
                {...register("brand")}
                className=" rounded-md border bg-white text-secondary p-1 h-fit flex-1 md:flex-none ">
                <option value="">All Brands</option>
                {node?.brands.map((el) => (
                    el.name && <option key={el.name} value={el.name}>{el.name}</option>
                ))}
            </select>
        </FieldWrapper>

        <FieldWrapper className="w-[calc((100%/2)-0.5rem)]">
            <Label>Category</Label>
            <select
                {...register("category")}
                className=" rounded-md border bg-white text-secondary p-1 h-fit flex-1 md:flex-none ">
                <option value="">All Categories</option>
                {node?.categories.map((el) => (
                    el.name && <option key={el.name} value={el.name}>{el.name}</option>
                ))}
            </select>
        </FieldWrapper>

        <FieldWrapper className="w-[calc((100%/2)-0.5rem)]">
            <Label>Sub-category</Label>
            <select
                disabled={!category}
                {...register("subCategory")}
                className=" rounded-md border disabled:opacity-55 disabled:cursor-not-allowed bg-white text-secondary p-1 h-fit flex-1 md:flex-none ">
                <option value="">All sub-categories</option>
                {getSubCat(category || "").map((el) => (
                    el &&
                    <option key={el} value={el}>{el}</option>
                ))}
            </select>
        </FieldWrapper>
        <FieldWrapper className="w-[calc((100%/2))]">
            <Label>Status</Label>
            <select
                {...register("status")}
                className=" rounded-md border bg-white text-secondary p-1 h-fit md:flex-none flex-1">
                <option value="">All Status</option>
                <option value="LIVE">Live</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="DRAFT">Draft</option>
            </select>
        </FieldWrapper>
        <Controller
            name="date.date"
            control={control}
            render={({ field }) => <DatePickerDemo size={"full"}
                date={field.value as Date}
                setDate={field.onChange}
            />}
        ></Controller>
        <Button type="button"
            onClick={() => {
                reset();
                navigate({ search: undefined });
                setOpen(false);
            }}
            className="w-full md:w-auto"
            // disabled={parms.toString().length === 0}
            variant={"destructive"}>Reset</Button>
        <Button type="submit"
            className="w-full md:w-auto"
        >
            Apply
        </Button>
    </form>
}
export default FilterMobile;
