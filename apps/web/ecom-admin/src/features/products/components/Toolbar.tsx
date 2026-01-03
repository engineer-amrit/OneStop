import { Badge } from "@/components/ui/badge"
import FilterMobile from "./filter"
import Search from "./Search"
import type { ProductStatus, ProductStatusDto } from "ecom"
import useGetData from "@/hooks/tanStack/useGetData"
import { Skeleton } from "@/components/ui/skeleton"
import { useWindowSize } from "@/hooks/dom"
type ProductBadges = {
    lable: string;
    className: string;
    key: keyof ProductStatus
}
const productBadges = [
    {
        lable: "Total",
        className: "bg-blue-200 text-blue-800 ",
        key: "totalProducts"
    },
    {
        lable: "Out of Stock soon",
        className: "bg-red-200 text-red-800 ",
        key: "almostOutOfStockProducts"
    }
    , {
        lable: "Live",
        className: "bg-green-200 text-green-800 ",
        key: "liveProducts"
    }, {
        lable: "Draft ",
        className: "bg-yellow-200 text-yellow-800 ",
        key: "draftProducts"
    },
    {
        lable: "Upcoming",
        className: "bg-purple-200 text-purple-800 ",
        key: "upComingProducts"
    }
] satisfies ProductBadges[];

const Toolbar = () => {
    const { data, isLoading } = useGetData<ProductStatusDto>({
        endpoint: "/admin/product/status",
        queryKey: "products-status"
    })

    const { width } = useWindowSize();


    return (
        <div className="flex justify-between flex-wrap gap-4">
            <Search />
            {width < 640 && <FilterMobile />}
            <div className="flex gap-3 items-baseline-last flex-wrap">
                {productBadges.map((badge) => (

                    isLoading ? <Skeleton key={badge.key} className={`w-16 h-6 rounded-full text-sm 
                    ${badge.className}`} /> : <Badge key={badge.lable} className={`size-fit rounded-full text-sm 
                    ${badge.className}}
                `}>
                        {badge.lable}: {data?.productStatus[badge.key] || 0}
                    </Badge>
                ))}
            </div>
            {width >= 640 && <FilterMobile />}
        </div>
    )
}

export default Toolbar
