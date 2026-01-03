import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ImgCarousel } from "@/components/ui/CustomCarosul";
import React, { useEffect, useMemo } from "react";
import { BeatLoader } from "react-spinners";
import axiosInstance from "@/lib/axios";
import { conf } from "@/config/config"
import type { ProductDto } from "ecom";
import { useActionContext } from "@/hooks/useActionContext";

const ProductDetail = () => {
    const [data, setData] = React.useState<ProductDto>();
    const { actions, setActions } = useActionContext();
    const condition = useMemo(() => actions && actions.action === "view", [actions]);
    useEffect(() => {
        if (condition)
            axiosInstance.get(`/public/product/${actions?.slug}/${actions?.id}`)
                .then((res) => {

                    setData(res.data.product);
                })

        return () => { setData(undefined) }
    }, [actions, condition])
    return (
        <Sheet open={condition} onOpenChange={() => { setActions(undefined) }}>

            <SheetContent className=" p-2 py-4 w-screen text-foreground outline-none overflow-y-auto">
                <SheetHeader hidden>
                    <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                <SheetDescription hidden>
                </SheetDescription>
                <div className="flex justify-between">
                    <span className="grid shrink-0 place-items-center size-9 bg-accent-foreground rounded-full
                    hover:scale-125 transition-transform duration-500  cursor-pointer"
                        onClick={() => setActions(undefined)}
                    >
                        {/* back icon */}
                        <i className="fa-solid fa-arrow-left text-xl text-black  cursor-pointer transition-transform duration-300 text-center"></i>
                    </span>

                    <span className="text-accent-foreground self-center ">{data && new Date(data.createdAt).toDateString()}</span>
                </div>

                {!data ? (
                    <div className="m-auto">
                        <BeatLoader size={30} color="gray" />
                    </div>
                ) : (<div className="grid gap-3">

                    <ImgCarousel
                        images={
                            [conf.server_url + "/v1/cdn/?url=" + data.thumbnail, ...data.sideImages.map(img => conf.server_url + "/v1/cdn/?url=" + img)]
                        }
                        size="17rem"
                    />

                    <div className="flex flex-col gap-2 p-2 bg-accent rounded-lg">
                        <h1 className="text-lg font-semibold capitalize text-tertiary">
                            {`${data.name} by ${data.brand?.name} `}
                            <i className="rounded-bl-full bg-[#FF8205] p-1 pl-4 text-sm not-italic text-white">
                                Most Popular
                            </i>
                        </h1>
                        <span className="review space-x-0.5 text-xl text-yellow-500">
                            {[...Array(Math.floor(data.rating))].map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-500" />
                            ))}
                            {data.rating % 1 !== 0 && (
                                <i className="fas fa-star-half-alt text-yellow-500" />
                            )}
                            <span className="mx-1 text-base text-tertiary">
                                {data.rating} Rating
                            </span>
                        </span>
                        {PriceShow(data.variants, data.gst)}
                    </div>
                    {/* variants display */}
                    {data.variants.length > 1 && <div>
                        <h2 className="text-lg font-semibold text-tertiary">Available Variants</h2>
                        <div className="variants mt-2 flex flex-wrap gap-3">
                            {data.variants.map((variant, index) => (
                                <div key={index} className="variant flex flex-col gap-1 rounded-lg border-2 border-accent-foreground p-3">
                                    <span className="text-base font-medium text-white">
                                        {variant.magnitude} {variant.unit.name}
                                    </span>
                                    <span className="text-sm text-white/80">
                                        Price: Rs. {variant.price}
                                    </span>
                                    <span className="text-sm text-white/80">
                                        Stock: {variant.stock} items
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>}

                    <div className="Specification relative  flex flex-col rounded-lg bg-secondary p-4 text-base font-medium capitalize leading-relaxed text-white">
                        <span
                            data-state={data.draft ? "draft" : data.upComing ? "upcoming" : "live"}
                            className="absolute right-2 top-2 text-sm w-fit  rounded-3xl  p-1 px-2 font-semibold
                            data-[state=draft]:text-yellow-800 data-[state=draft]:bg-yellow-200
                            data-[state=upcoming]:text-blue-800 data-[state=upcoming]:bg-blue-200 data-[state=live]:text-green-800 data-[state=live]:bg-green-200">
                            {
                                data.draft ? "Draft" : data.upComing ? "Upcoming" : "Live"
                            }
                        </span>
                        <h2 className="mb-1 text-lg font-semibold">Specification</h2>
                        <span>Model number : {data.sku}</span>
                        <span>Brand : {data.brand?.name}</span>
                        <span>Category : {
                            data.subCategory?.parent?.name
                        }</span>
                        <span>Sub-Category : {
                            data.subCategory?.name
                        }</span>

                        {data.variants.length == 1 && <span>
                            Packing size : {data.variants[0].magnitude} {data.variants[0].unit.name}(s)
                        </span>}
                    </div>

                    <div className="btns mt-4 grid grid-cols-2 grid-rows-[min(3.1875rem,12vw)] gap-5 font-medium text-white">
                        <Button
                            onClick={() => {
                                setActions({
                                    id: data.id,
                                    slug: data.slug,
                                    action: "edit"
                                })
                            }}
                            className="rounded-xl p-5 text-xl"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => {
                                setActions({
                                    id: data.id,
                                    slug: data.slug,
                                    action: "delete"
                                })
                            }}
                            variant={"destructive"}
                            className="rounded-xl p-5 text-xl"
                        >
                            Delete
                        </Button>
                    </div>

                    <div className="bg-accent">
                        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-b-slate-200">
                            <span>Product Description</span>
                            <i className="fa-solid fa-chevron-right text-xl"></i>
                        </div>
                        <div className="p-4 text-base font-normal">
                            <p className="leading-snug">
                                {data.description}
                            </p>
                            <div className="p-4">
                                <div className="mb-2 text-lg font-semibold">Key Features</div>
                                <ul className="list-disc">
                                    {data.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-4">
                                <div className="mb-2 text-lg font-semibold">Tags</div>
                                <ul className="list-disc">
                                    {data.tags.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-accent grid gap-1">
                        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-b-slate-200">
                            <span>Product Rating & Review</span>
                            <i className="fa-solid fa-chevron-right text-xl"></i>
                        </div>

                        <div className="p-3 text-base font-normal space-y-4 relative overflow-auto h-[50vh] custom-scrollbar">
                            <div className="space-y-1 grid sticky top-0 bg-accent py-2.5 z-10 border-b-2 border-b-slate-200">
                                <span className="font-semibold text-tertiary/50">
                                    {" "}
                                    Review Filter
                                </span>

                                <div className="btns text-sm flex justify-between font-semibold h-10  text-accent text-nowrap">
                                    <button className="rounded-md bg-accent-foreground p-2 text-nowrap">
                                        All reviews
                                    </button>
                                    {Array(5).fill(0).map((_, i) => (
                                        <button
                                            key={i}
                                            className="rounded-md p-2 text-nowrap text-slate-400 outline 
                                            hover:bg-accent-foreground hover:text-accent transition-all duration-300 cursor-pointer
                                            outline-slate-200">
                                            <i className="fas fa-star "></i> {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 rounded-md bg-accent-foreground/10 p-2">
                                <div className="profile flex w-fit items-center justify-center gap-2">
                                    <span className="grid size-14 place-items-center rounded-full outline-2 text-xl font-bold">
                                        AS
                                    </span>
                                    <div>
                                        <span className="font-semibold">Amrit Singh</span>
                                        <div className="review space-x-1  text-yellow-500">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fa-duotone fa-solid fa-star-half"></i>
                                        </div>
                                    </div>
                                </div>
                                <p className="line-clamp-2 text-base font-medium">
                                    This is really amazing product, i like the product, I hope can
                                    buy it again!
                                </p>
                                <p className="text-sm text-slate-400">December 10, 2021</p>
                            </div>
                            <div className="space-y-2 rounded-md bg-accent-foreground/10 p-2">
                                <div className="profile flex w-fit items-center justify-center gap-2">
                                    <span className="grid size-14 place-items-center rounded-full outline-2 text-xl font-bold">
                                        AS
                                    </span>
                                    <div>
                                        <span className="font-semibold">Amrit Singh</span>
                                        <div className="review space-x-1  text-yellow-500">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fa-duotone fa-solid fa-star-half"></i>
                                        </div>
                                    </div>
                                </div>
                                <p className="line-clamp-2 text-base font-medium">
                                    This is really amazing product, i like the product, I hope can
                                    buy it again!
                                </p>
                                <p className="text-sm text-slate-400">December 10, 2021</p>
                            </div>
                        </div>

                    </div>
                </div>)}
            </SheetContent>
        </Sheet >
    )
}

const PriceShow = (variants: ProductDto["variants"], gst: ProductDto["gst"]) => {
    if (variants.length == 1) {
        const data = {
            price: variants[0].price,
            discount: variants[0].discount,
            gst: gst.value
        }
        return <div className="p-info flex flex-col gap-2 font-sans text-base tracking-tighter">
            <span className="flex items-center gap-3 text-white">
                <span className="text-lg font-bold">Rs. {data.price}</span>
                <del className="text-white/80">
                    Rs. {((data.price * data.discount) / 100) + data.price}
                </del>
                <span className="text-lg font-bold text-green-600">
                    {data.discount}% off
                </span>
                <span className="group relative grid size-[min(1.859375rem,7vw)] place-items-center rounded-full bg-slate-200 text-card">
                    {/* Tooltip */}
                    <div className="duration-450 absolute bottom-8 left-1/2 w-fit text-nowrap -translate-x-1/2 scale-95 rounded-lg bg-accent-foreground shadow-white/20 shadow-[0_1px_12px_rgba(0,0,1,0.2)] p-2.5 text-center text-sm  opacity-0 transition-opacity group-hover:scale-100 group-hover:opacity-100 font-semibold">
                        GST : {data.gst}%
                        <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-accent-foreground"></div>
                    </div>
                    {/* Icon */}
                    <i className="fa-solid fa-info"></i>
                </span>
            </span>
            <span className="tracking-wide text-white/80">
                Inclusive of all taxes
            </span>
        </div>
    }

    return <span className="p-info flex flex-col gap-2 font-sans text-base font-bold tracking-tighter w-fit ml-auto">
        GST: {gst.value}%
    </span>;
}

export default ProductDetail
