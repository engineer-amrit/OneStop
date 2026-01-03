import { useParams } from "react-router-dom"
import { Card } from "./Products";
import React, { useEffect, useMemo } from "react";
import Filter from "@/components/client/Filter";
import { useGetData } from "@/hooks/tanStack/useGetData";
import type { Products } from "@/config/Types";

const CategorizedProdcuts = () => {
    const { category } = useParams();
    const stickyRef = React.useRef<HTMLDivElement>(null);

    // get data
    const { data, isPending } = useGetData<Products>(`products`, 'products', 24, category)

    // filter data
    const products = useMemo(() => data?.pages.flatMap((el) => el["products"] as Products[]) || [], [data]);

    console.log(isPending);




    useEffect(() => {
        const scrollHandler = () => {
            if (stickyRef.current) {
                if (window.scrollY > stickyRef.current.clientHeight) {
                    stickyRef.current.classList.add("shadow-md");
                } else {
                    stickyRef.current.classList.remove("shadow-md");
                }
            }
        };

        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);
    return (
        <>
            <div ref={stickyRef} className="text-base z-10 h-fit  bg-white py-2 text-tertiary font-medium top-0  sticky flex justify-between items-center">
                <span className="px-2 py-1 bg-primary/95 rounded-r-md">Products/{category}</span>
                {/* <Filter className="mr-2 bg-tertiary hover:bg-tertiary/90 text-white" /> */}
                <Filter className="mr-1" />
            </div>

            <div className="products overflow-y-hidden grid auto-rows-[74vw] grid-cols-[repeat(2,44vw)] justify-evenly gap-y-[4.5vw] pb-2">
                {products?.map((_, index) => (
                    <Card
                        key={index}
                    />
                ))}
            </div>
        </>
    )
}

export default CategorizedProdcuts
