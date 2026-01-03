
import { useState, useMemo } from 'react'
import {
    type ColumnDef,
    type SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/data-table'
import { useActionContext } from '@/hooks/useActionContext'
import { useNavigate } from '@tanstack/react-router'
// import type { ProductState } from '../../types'
import { DataTableBulkActions, type DataTableBulkActionsProps } from './data-bulk-actions'
import { resolveColumnVisibility } from '@/hooks/use-table-hide'
import { useWindowSize } from '@/hooks/dom'
// import { priorities, statuses } from '../data/data'
// import { type Task } from '../data/schema'
// import { DataTableBulkActions } from './data-table-bulk-actions'
// import { tasksColumns as columns } from './tasks-columns'
export interface Common {
    id: string;
    slug?: string;
}

interface DataTableProps<TData extends Common, TValue, T extends string> {
    data: TData[] | undefined,
    columns: ColumnDef<TData, TValue>[],
    children: React.ReactNode,
    isLoading: boolean,
    bulkActionsProps: Omit<DataTableBulkActionsProps<TData, T>, 'table'>
}

export function DataTable<TData extends Common, TValue, T extends string>({ data, columns, children, isLoading
    , bulkActionsProps
}: DataTableProps<TData, TValue, T>) {
    // Local UI-only states
    const [rowSelection, setRowSelection] = useState({})
    const navigate = useNavigate({ from: "/products" })
    const [sorting, setSorting] = useState<SortingState>([])
    const { query, pageCount, setActions } = useActionContext()
    const { width } = useWindowSize();

    const columnVisibility = useMemo(
        () => resolveColumnVisibility(columns, width),
        [columns, width]
    )

    // Local state management for table (uncomment to use local-only state, not synced with URL)
    // const [globalFilter, onGlobalFilterChange] = useState('')
    // const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>([])
    // const [pagination, onPaginationChange] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

    // Synced with URL states (updated to match route search schema defaults)

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: data || [],
        columns,
        pageCount,
        getRowId: (originalRow) => originalRow.id,
        manualPagination: true,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex: Number(query.page ? query.page : 1) - 1,
                pageSize: Number(query.limit ? query.limit : 10),
            }
        },
        onPaginationChange: updater => {
            // 1️⃣ Read current pagination from URL
            const currentPage = Number(query.page ?? 1)
            const currentLimit = Number(query.limit ?? 10)

            const prevPagination = {
                pageIndex: currentPage - 1,
                pageSize: currentLimit,
            }

            // 2️⃣ Resolve TanStack updater
            const next =
                typeof updater === "function"
                    ? updater(prevPagination)
                    : updater

            // 3️⃣ Write back to URL (single source of truth)
            navigate({
                search: prev => ({
                    ...prev,
                    page: String(next.pageIndex + 1),
                    limit: String(next.pageSize),
                }),
                replace: true, // optional: avoids history spam
            })
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <div
            className={cn(
                'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
                'flex flex-1 flex-col gap-4 '
            )}
        >
            <div className='overflow-auto rounded-md border'>
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(
                                                header.column.columnDef.meta?.className,
                                                header.column.columnDef.meta?.thClassName
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    onClick={(e) => {
                                        const exclude = (e.target as HTMLElement).closest('button, a, input, svg, path');
                                        if (exclude) return;
                                        if (row.original.slug) setActions({ action: "view", id: row.original.id, slug: row.original.slug })
                                    }}
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                cell.column.columnDef.meta?.className,
                                                cell.column.columnDef.meta?.tdClassName
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    {isLoading ? children : 'No results.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} className='mt-auto' />
            <DataTableBulkActions table={table} {...bulkActionsProps} />
        </div>
    )
}
