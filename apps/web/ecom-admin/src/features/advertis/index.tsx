import { CommonHeader } from "@/components/layout/CommonHeader"
import { Main } from "@/components/layout/main"
import AdvertisPrimaryBtns from "./components/advertis-primary-buttons"
import { DataTable } from "@/components/data-table/data-table"
import { BeatLoader } from "react-spinners"
import { advertiseColumns } from "./components/advertise-columns"
import type { DataTableBulkActionsProps } from "@/components/data-table/data-bulk-actions"
import type { AdvertiseDTO, AdvertiseDTOResponse } from "ecom"
import { ActionProvider, type Action } from "@/hooks/useActionContext"
import { useState } from "react"
import useGetData from "@/hooks/tanStack/useGetData"

type T = never

const Index = () => {
    const [action, setAction] = useState<Action>()
    const columns = advertiseColumns(setAction);
    const { data, isLoading, isRefetching } = useGetData<AdvertiseDTOResponse>({
        queryKey: 'advertises',
        endpoint: '/public/advertises',
    })
    const buildBulkActions: Omit<DataTableBulkActionsProps<AdvertiseDTO, T>, 'table'> = {
        entryName: 'advertise',
        actions: [],
    }
    const value = {
        actions: action,
        setActions: setAction,
        pageCount: undefined,
        query: {}
    }
    return (
        <ActionProvider value={value}>
            <CommonHeader fixed />
            <Main className='flex flex-1 flex-col gap-4'>
                <div className='flex flex-wrap items-end justify-between gap-2'>
                    <div>
                        <h2 className='text-xl font-bold tracking-tight'>Advertis</h2>
                        <p className='text-muted-foreground text-lg'>
                            Here&apos;s a list of your advertis!
                        </p>
                    </div>
                    <AdvertisPrimaryBtns />
                </div>
                {/* Advertis Table */}
                <DataTable columns={columns} data={data?.advertises} bulkActionsProps={buildBulkActions} isLoading={isLoading || isRefetching}>
                    <div className="w-full flex items-center justify-center">
                        <BeatLoader size={18} color='#ffff' className="mx-auto" />
                    </div>
                </DataTable>
            </Main>

        </ActionProvider>
    )
}

export default Index
