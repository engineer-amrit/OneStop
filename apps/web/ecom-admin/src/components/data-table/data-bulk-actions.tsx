
import { useState } from 'react'
import type { Table, Row } from '@tanstack/react-table'
import { Trash2, CircleArrowUp } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import type { Common } from './data-table'
import type { ApiError } from 'common'
import { AnyMultiUpsertDialog, type Action as DAction } from '@/components/data-table/multi-upsert-dialog'


interface Options<T extends string> {
    label: string,
    value: T;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface Handler<TDATA, T extends string> {
    (selectedRows: Row<TDATA>[], optionValue: T): Promise<void>
}

interface Action<TDATA, T extends string> {
    title: string,
    handler: Handler<TDATA, T>,
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    options: Options<T>[]
}


export type DataTableBulkActionsProps<TData extends Common, T extends string> = {
    table: Table<TData>;
    entryName: string;
    actions: Action<TData, T>[];
    deleteAction?: DAction<TData>;
}

export function DataTableBulkActions<TData extends Common, T extends string>({
    table,
    entryName,
    actions,
    deleteAction,
}: DataTableBulkActionsProps<TData, T>) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const [isLoading, setIsLoading] = useState(false);

    const handler = async (option: T, action: Handler<TData, T>) => {
        setIsLoading(true);
        await action(selectedRows, option).then(() => {
            table.resetRowSelection()
            toast.success(`Status updated to ${option} for ${selectedRows.length} ${entryName}${selectedRows.length > 1 ? 's' : ''}`)
        }).catch((e: ApiError) => {
            toast.error(e.message)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const deletePreHandle: DAction<TData> = async (selectedRows) => {
        setIsLoading(true);
        if (deleteAction) {
            await deleteAction(selectedRows).finally(() => {
                setIsLoading(false);
            })
        }
    }



    return (
        <>
            <BulkActionsToolbar isLoading={isLoading} className='absolute' table={table} entityName={entryName}>
                {actions.map((action) =>
                    <DropdownMenu key={action.title}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='outline'
                                        size='icon'
                                        className='size-8'
                                        aria-label='Update status'
                                        title='Update status'
                                    >
                                        <CircleArrowUp />
                                        <span className='sr-only'>Update status</span>
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Update status</p>
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent sideOffset={14}>
                            {action.options.map((op) => (
                                <DropdownMenuItem
                                    key={op.value}
                                    defaultValue={op.value}
                                    onClick={() => handler(op.value, action.handler)}
                                >
                                    {op.icon && (
                                        <op.icon className='size-4 text-muted-foreground' />
                                    )}
                                    {op.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>)}

                {deleteAction && <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='destructive'
                            size='icon'
                            onClick={() => setShowDeleteConfirm(true)}
                            className='size-8'
                            aria-label='Delete selected tasks'
                            title='Delete selected tasks'
                        >
                            <Trash2 />
                            <span className='sr-only'>Delete selected tasks</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete selected tasks</p>
                    </TooltipContent>
                </Tooltip>}

            </BulkActionsToolbar>

            {deleteAction && <AnyMultiUpsertDialog
                action={deletePreHandle}
                entryName={entryName}
                confirmWord='DELETE'
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
                table={table}
            />}
        </>
    )
}
