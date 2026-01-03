import { columns } from "./components/product-columns"
import { CommonHeader } from "@/components/layout/CommonHeader"
import { Main } from "@/components/layout/main"

import { useSearch } from "@tanstack/react-router"
import { useState } from "react"
import useGetData from "@/hooks/tanStack/useGetData"
import type { ProductListDto, ProductPaginatedDto } from "ecom"
import ProductPrimaryButtons from "./components/ProductPrimaryButtons"
import { ActionProvider, type Action } from "@/hooks/useActionContext"
import ProductDetail from "./components/product"
import { DataTable } from "@/components/data-table/data-table"
import { BeatLoader } from "react-spinners"
import Toolbar from "./components/Toolbar"
import { type DataTableBulkActionsProps } from "@/components/data-table/data-bulk-actions"
import { ProductStatusEnum } from "@schema/ecom"
import { CircleArrowUp, Clock, FileEdit, Zap } from "lucide-react"
import axiosInstance from "@/lib/axios"
import { useQueryClient } from "@tanstack/react-query"

// eslint-disable-next-line 
export const invalidatelist = ["products", "products-status"]


const List = () => {
    const query = useSearch({ from: "/_authenticated/products/" });
    const parms = new URLSearchParams(query);
    const [actions, setActions] = useState<Action>()
    const Columns = columns(setActions);
    const queryFetch = useQueryClient()

    const invalidate = async () => {
        for (const item of invalidatelist) {
            await queryFetch.invalidateQueries({ queryKey: [item] });
        }
    }

    const { data, isLoading, isRefetching } = useGetData<ProductPaginatedDto>({
        endpoint: "/public/product",
        queryKey: "products",
        params: parms.toString()
    });

    const value = {
        setActions,
        actions,
        query,
        pageCount: data?.pageCount
    }

    const bulkActions: Omit<DataTableBulkActionsProps<ProductListDto, ProductStatusEnum>, "table"> = {
        entryName: "product",
        actions: [
            {
                title: 'Change Status',
                icon: CircleArrowUp,
                options: [
                    { label: 'live', value: ProductStatusEnum.LIVE, icon: Zap },
                    { label: 'draft', value: ProductStatusEnum.DRAFT, icon: FileEdit },
                    { label: 'upcoming', value: ProductStatusEnum.UPCOMING, icon: Clock },
                ],
                handler: async (selectedRows, optionValue) => {
                    const ids = selectedRows.map(row => row.original.id);
                    await axiosInstance.patch('/admin/product/status/' + optionValue, { ids });
                    await invalidate();
                },
            }
        ],
        deleteAction: async (selectedRows) => {
            const ids = selectedRows.map(row => row.original.id);
            await axiosInstance.delete('/admin/products', { data: { ids } });
            await invalidate();
        }
    }


    return (
        <ActionProvider value={value}>
            <ProductDetail />
            <CommonHeader fixed />

            <Main className='flex flex-1 flex-col gap-4 relative'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                    <div>
                        <h2 className='text-xl font-bold tracking-tight'>Products</h2>
                        <p className='text-muted-foreground text-lg'>
                            Here&apos;s a list of your products!
                        </p>
                    </div>
                    <ProductPrimaryButtons />
                </div>
                <Toolbar />
                <DataTable bulkActionsProps={bulkActions} columns={Columns} data={data?.products} isLoading={isLoading || isRefetching}>
                    <div className="w-full flex items-center justify-center">
                        <BeatLoader size={18} color='#ffff' className="mx-auto" />
                    </div>
                </DataTable>
            </Main>
        </ActionProvider>
    )
}

export default List

