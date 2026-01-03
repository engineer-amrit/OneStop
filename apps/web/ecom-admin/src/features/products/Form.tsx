import type { Variant } from '@schema/ecom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FormKeyHandler, FieldWrapper, InputErrorhandler } from "@ui/lib"
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '@/lib/reduxTypes'
import { useState, useEffect } from 'react'
import { type NodeOptions, setNodes } from '@/utils/node'
import type { ProductForm, NodeApi, ProductDto } from 'ecom'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Dropdown from '@/components/ui/dropdown'
import TagsInput from '@/components/ui/tagsInput'
import File from '@/components/ui/file'
import axiosInstance from '@/lib/axios'
import { fetchNode } from '@/store/node-store'
import { toast } from 'sonner'
import { BeatLoader } from 'react-spinners'
import { type Options, useUpsertMutation } from '@/hooks/tanStack/useUpsertData'
import Confirmation from '@/components/Confirmation'
import { cleanErrors as CE, mapFormErrors } from '@utils/shared'
import type { ApiError, ApiSuccess } from 'common'
import { getFileFields } from '@/utils/fetch'
import { useDialog } from '@/components/ui/customDialog'
import { useActionContext, type Action } from '@/hooks/useActionContext'
import { invalidatelist } from '.'


export const Form = () => {
    const dState = useDialog();
    const { actions: query, setActions } = useActionContext();
    const condition = query?.action == "edit" && query.id && query.slug;

    const [open, setOpen] = useState(false);
    const { nodes: node } = useAppSelector(state => state.Node);

    const [nodeLoading, setNodeLoading] = useState(true);

    const [loading, setLoading] = useState(query?.action == "edit");

    const [nodes, setnodes] = useState<NodeOptions>({});

    const [data, setData] = useState<ProductForm | null>(null);

    const dispatch = useAppDispatch();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        reset,
        watch,
    } = useForm<ProductForm>({
        defaultValues: condition ? getValues({
            query, setLoading
        }) : {
            variants: [{} as Variant]
        }
    });

    const options: Options<ProductForm> = {
        mediaArray: ["thumbnail", "sideImages"],
        onSuccess: () => {
            dState.setOpen(false);
            showSubmittedData(data);
            if (condition) reset({})
            reset();
            toast.success(`Product ${condition ? "update" : "upload"} successfully`);
        },
        onError: (error) => {
            if (error.errors) {
                mapFormErrors(error.errors, setError)
            } else {
                toast.error(error.message);
            }
        },
        onSettled: () => {
            setOpen(false);
            if (condition) setActions(undefined);
        }
    }

    const { mutate, isPending } = useUpsertMutation<ProductForm>(invalidatelist, "/admin/product", "/admin/product", options);

    useEffect(() => {
        dispatch(fetchNode())
    }, [dispatch]);



    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    })


    const category = watch("category");



    useEffect(() => {
        if (node) {
            axiosInstance.get<NodeApi>("/public/node/?type=GROUP&include=UNIT&include=GST")
                .then((res) => {
                    setnodes(setNodes({ ...node, ...res.data.nodes }));
                }).catch((e: Error) => {
                    toast.error((e).message);
                    setnodes(setNodes(node));
                }).finally(() => {
                    setNodeLoading(false);
                });
        }
    }, [node]);

    const formsubmit = () => {
        if (data) {
            mutate({ data, id: condition ? query.id : undefined });
        }
    }


    const onsubmit = async (data: ProductForm) => {
        if (data.sku == "") delete data.sku;
        delete data.isSku
        setData(data);
        setOpen(true);
    };
    return (
        <>
            <Confirmation
                title={condition ? "Update Product" : "Upload Product"}
                message={!condition ? "Are you sure you want to submit the form?" : "Are you sure you want to update the product?"}
                state={{
                    open: open,
                    setOpen: (n) => {
                        setOpen(prev => n ?? !prev);
                    },
                }}
                action={
                    formsubmit
                } isPending={isPending
                } />
            <form autoCorrect="on" autoComplete="on" onKeyDown={(e) => FormKeyHandler(e, (name, e) => {
                if (name !== "tags" && name !== "features") {
                    const form = (e.target as HTMLFormElement).form;
                    const index = Array.from(form).indexOf(e.target);
                    form.elements[index + 1].focus();
                }
            })}
                onSubmit={handleSubmit(onsubmit)}
                onChange={(e) => {
                    const changedFeildName = (e.target as HTMLInputElement).name as keyof ProductForm;
                    clearErrors(changedFeildName);
                }}
                className="grid w-full gap-2 p-2"
            >
                {(loading || nodeLoading) ? <div className="absolute bg-accent opacity-60
          inset-0  rounded-lg flex justify-center items-center z-10
          ">

                    <BeatLoader color="white" size={50} />
                </div> : null}

                {/* buttons */}
                <div className=" gap-4 lg:flex w-fit ml-auto hidden">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>
                    <Button type="submit" onClick={() => CE<ProductForm>(errors, clearErrors)}>
                        Submit
                    </Button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 border p-2 rounded-md gap-2 bg-accent/40'>
                    <div className="flex w-full h-fit flex-wrap gap-2 p-1 max-h-[80vh] overflow-y-auto custom-scrollbar ">
                        <div className="flex flex-wrap gap-4 justify-start w-full max-h-60 overflow-y-auto custom-scrollbar border-2 rounded-md p-2">
                            <Controller name="thumbnail" control={control} render={({ field }) => <File required className="size-20"{...field} errors={errors} accept="image/*" label="Thumbnail" />} />
                            <Controller name="sideImages" control={control} render={({ field }) => <File multiple required className="size-20"{...field} errors={errors} accept="image/*" label="Side images" />} />
                            <div className="w-full flex gap-4">
                                <InputErrorhandler errors={errors} name="thumbnail" />
                                <InputErrorhandler errors={errors} name="sideImages" />
                            </div>

                        </div>
                        <FieldWrapper className="w-[calc(50%)]">
                            <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
                            <Input id="name" placeholder="Product name" autoComplete="on" {...register("name")} />
                            <InputErrorhandler errors={errors} name="name" />
                        </FieldWrapper>

                        <Controller name="brand" control={control} render={({ field }) =>
                            <Dropdown
                                {...field}
                                className="w-[calc(50%-1rem)]"
                                errors={errors}
                                options={nodes.brands}
                                label="Brand"
                                others
                                required />
                        }
                        />
                        <FieldWrapper className="w-full">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Product description" className="w-full" {...register("description")} />
                            <InputErrorhandler errors={errors} name="description" />
                        </FieldWrapper>
                        <Controller name="category" control={control} render={({ field }) =>
                            <Dropdown
                                {...field}
                                className="w-[calc(100%/3)]"
                                errors={errors}
                                options={nodes.categories}
                                label="Category"
                                others
                                required />
                        }
                        />
                        <Controller name="subCategory" control={control} render={({ field }) =>
                            <Dropdown
                                {...field}
                                disabled={!category || category === "others"}
                                className="w-[calc((100%/3)-1rem)]"
                                errors={errors}
                                options={nodes.subCategories?.(category)}
                                label="Sub Category"
                                others
                                required />
                        }
                        />

                        <Controller name="gst" control={control} render={({ field }) =>
                            <Dropdown
                                sufix="%"
                                isnumber
                                {...field}
                                className="w-[calc((100%/3)-1rem)]"
                                errors={errors}
                                options={nodes.gsts}
                                label="GST"
                                others
                                required />
                        }
                        />

                        <FieldWrapper className="w-full flex flex-row items-center h-10">
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    disabled={!!condition}
                                    {...register("isSku", {
                                        value: true
                                    })}
                                    type="checkbox" className="peer sr-only " />
                                <div
                                    className="h-6 w-11 rounded-full bg-slate-400
           peer-checked:bg-blue-600
           peer-disabled:cursor-not-allowed
           after:absolute after:left-0.5 after:top-0.5
           after:h-5 after:w-5 after:rounded-full after:bg-white
           after:transition-all
           peer-checked:after:translate-x-full"
                                ></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Auto Generate SKU
                                </span>
                            </label>
                            <Input
                                readOnly={!!condition}
                                hidden={watch("isSku")}
                                placeholder="Enter SKU"
                                data-state={condition ? "disabled" : ""}
                                className="ml-4 flex-1 data-[state=disabled]:cursor-not-allowed"
                                {...register("sku")}
                            />
                        </FieldWrapper>

                        {/* Add other form fields similarly */}
                    </div>
                    <div className="flex  w-full flex-wrap gap-2 p-1  max-h-[80vh] overflow-y-auto custom-scrollbar ">
                        <Accordion type="single" collapsible className="border p-2 grid gap-2 rounded-md w-full max-h-80 overflow-auto custom-scrollbar">
                            <div className="flex items-center justify-between">
                                <span className="w-fit">Variants</span> <Button type="button" variant="outline" className="w-fit" size="sm" onClick={() => append({} as Variant)}>
                                    <i className="fa-solid fa-plus " />
                                </Button>
                            </div>
                            {fields.map((field, index) => {
                                // eslint-disable-next-line 
                                const unit = watch(`variants.${index}.unit`);

                                return (<AccordionItem value={`variants${index}`} key={field.id}>
                                    <AccordionTrigger className="bg-accent-foreground text-accent px-2 h-10 items-center justify-between rounded-md flex"><span>Variants {index + 1}
                                    </span>
                                        <InputErrorhandler errors={errors} name={`variants.` + index} className="w-fit" />
                                        {index == 0 && <InputErrorhandler errors={errors} name="variants" className="w-fit" />}
                                        <span hidden={index == 0} className="ml-auto text-red-500 cursor-pointer" onClick={(e) => {
                                            e.stopPropagation();
                                            remove(index);
                                        }}>
                                            <i className="fa-solid fa-trash-can" />
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="grid gap-2 p-2">
                                        <div className="flex flex-wrap gap-2 border p-2 rounded-md">
                                            <Controller name={`variants.${index}.unit`} control={control} render={({ field }) =>
                                                <Dropdown
                                                    {...field}
                                                    className="w-[calc((100%/3)-1rem)]"
                                                    errors={errors}
                                                    options={nodes.units}
                                                    label="unit"
                                                    others
                                                    required />
                                            }
                                            />
                                            <FieldWrapper className="w-[calc(100%/3-1rem)]">
                                                <Label htmlFor="magnitude">
                                                    {unit === "others" || !unit ? "Specify Unit" : unit == "bag" ? "Weight in Kg" : "Size in " + unit}
                                                </Label>
                                                <Input type="number" placeholder={
                                                    unit === "others" || !unit ? "Enter unit" : "Enter in " + unit
                                                } className="w-full" disabled={!unit || unit === "others"}  {...register(`variants.${index}.magnitude`)} />
                                                <InputErrorhandler errors={errors} name={`variants.${index}.magnitude`} />
                                            </FieldWrapper>
                                            <FieldWrapper className="w-[calc(100%/3)]">
                                                <Label htmlFor="stock">Stock/Quantity</Label>
                                                <Input placeholder="stock" type="number" {...register(`variants.${index}.stock`)} />
                                                <InputErrorhandler errors={errors} name={`variants.${index}.stock`} />
                                            </FieldWrapper>
                                            <FieldWrapper className="w-[calc(100%/2-1rem)]">
                                                <Label htmlFor="price">Price</Label>
                                                <Input placeholder="price" type="number" {...register(`variants.${index}.price`)} />
                                                <InputErrorhandler errors={errors} name={`variants.${index}.price`} />
                                            </FieldWrapper>
                                            <FieldWrapper className="w-[calc(100%/2)]">
                                                <Label htmlFor="discount">Discount (%)</Label>
                                                <Input placeholder="discount" type="number" {...register(`variants.${index}.discount`)} />
                                                <InputErrorhandler errors={errors} name={`variants.${index}.discount`} />
                                            </FieldWrapper>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>)
                            })}
                        </Accordion>

                        <Controller name="tags" control={control} render={({ field }) => (
                            <TagsInput
                                {...field}
                                errors={errors}
                                label="Tags"
                                placeholder="Enter tags"
                            />
                        )} />
                        <Controller name="features" control={control} render={({ field }) => (
                            <TagsInput
                                {...field}
                                errors={errors}
                                label="Features"
                                placeholder="Enter features"
                            />
                        )} />

                        <Label>
                            <input
                                {...register("draft")}
                                type="checkbox" className="mr-1 size-4" />
                            Save as Draft
                        </Label>

                        <Label >
                            <input
                                {...register("upComing")}
                                type="checkbox" className="mr-1 size-4" />
                            Mark as Upcoming
                        </Label>

                        <div id="btns" className="flex justify-between w-full lg:hidden mt-4">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => reset()}
                                className="mx-2"
                            >
                                Reset
                            </Button>
                            <Button type="submit" className="mx-2" onSubmit={() => {
                                CE<ProductForm>(errors, clearErrors)
                            }}>
                                Submit
                            </Button>
                        </div>

                    </div>
                </div>

            </form >
        </>
    )
}
type GetValuesPayload = {
    query: Action,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
type K = () => Promise<ProductForm>
const getValues = (parms: GetValuesPayload): K => {
    const { query, setLoading } = parms;
    return async () => {
        try {
            const res = await axiosInstance.get<ApiSuccess<"product", ProductDto>>("/public/product/" + query.slug + "/" + query.id)
            return passData(res.data.product, setLoading);
        } catch (error) {
            toast.error((error as ApiError).message || "Failed to fetch product data");
            return {} as ProductForm;
        }
        finally {
            setLoading(false);
        }
    }
}

const passData = async (data: ProductDto, setLoading: GetValuesPayload["setLoading"]): Promise<ProductForm> => {
    const { thumbnail, sideImages, brand, subCategory, sku, variants, gst, ...rest } = data;
    const thumbnailFiles = await getFileFields(thumbnail);
    const sideImageFiles = await getFileFields(sideImages);
    setLoading(false);
    return {
        thumbnail: thumbnailFiles[0],
        sideImages: sideImageFiles,
        brand: brand.name || "",
        category: subCategory.parent?.name || "",
        subCategory: subCategory.name || "",
        sku: sku,
        gst: gst.value || 0,
        isSku: false,
        variants: variants.map(v => ({
            ...v,
            unit: v.unit.name || ""
        })),
        ...rest,
    } satisfies ProductForm;
}

