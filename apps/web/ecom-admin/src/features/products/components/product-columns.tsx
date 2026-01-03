import type { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import type { ProductListDto } from "ecom"
import type { Dispatch } from "react"
import type { Action } from "@/hooks/useActionContext"
import { conf } from "@/config/config"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table"




export const columns = (setActions: Dispatch<Action>): ColumnDef<ProductListDto>[] => {
    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Select all'
                    className='translate-y-[2px]'
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label='Select row'
                    className='translate-y-[2px]'
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "sku",
            header: ({ column }) => <DataTableColumnHeader column={column} title='SKU' />,
            cell: ({ row }) => {
                return (
                    <div className="w-[80px]">{row.original.sku}</div>
                )
            },
            enableSorting: false,
            meta: {
                hideBelow: "lg"
            }
        },
        {
            accessorKey: "thumbnail",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title='Thumbnail' />
            },
            cell: ({ row }) => {
                const thumbnail = row.original.thumbnail
                return (
                    <img
                        src={conf.server_url + "/v1/cdn?url=" + thumbnail + "&w=100&h=100"}
                        alt="Thumbnail"
                        className="size-10 rounded-md object-cover mx-auto"
                    />
                )
            },
            enableSorting: false
        },
        {
            accessorKey: "name",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
            enableSorting: false,

        },
        {
            accessorKey: "category",

            header: ({ column }) => <DataTableColumnHeader column={column} title='Category' />,
            cell: ({ row }) => {
                return (
                    <span>{row.original.subCategory?.parent?.name}</span>
                )
            },
            meta: { hideBelow: "lg" }, // desktop only
            enableSorting: false,
        }, {
            accessorKey: "subCategory",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Sub Category' />,
            cell: ({ row }) => {
                return (
                    <span>{row.original.subCategory?.name}</span>
                )
            },
            meta: { hideBelow: "lg" }, // desktop only


            enableSorting: false,
        },
        {
            accessorKey: "brand",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Brand' />,
            cell: ({ row }) => {
                return (
                    <span>{row.original.brand?.name}</span>
                )
            },
            meta: { hideBelow: "md" },

            enableSorting: false,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
            cell: ({ row }) => {
                // if draft is true then show draft else show if upComing is true then show upcoming else show live
                const draft = row.original.draft;
                const upComing = row.original.upComing;
                return (
                    draft ? <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Draft</span> :
                        upComing ? <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Upcoming</span> :
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Live</span>
                )
            },
            enableSorting: false,
        },
        {
            accessorKey: "stock",
            enableSorting: false,
            header: ({ column }) => <DataTableColumnHeader column={column} title='Stock' />,
            cell: ({ row }) => {
                return (
                    <span>{row.original.variants[0].stock} {row.original.variants[0].unit.name}(s)</span>
                )
            },
            meta: { hideBelow: "md" },

        },
        {
            accessorKey: "price",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
            cell: ({ row }) => {
                return (
                    <span>
                        ₹
                        {row.original.variants[0].price.toFixed(2)}</span>
                )
            },

            enableSorting: false,
            meta: { hideBelow: "md" },

        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
            cell: ({ row }) => {
                return (
                    <span>
                        {new Date(row.original.createdAt).toLocaleDateString()}
                    </span>
                )
            },
            meta: { hideBelow: "lg" },
            enableSorting: false,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 bg-card hover:scale-105">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(row.original.id)
                                }}
                            >
                                Copy product ID
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <i className="fa-solid fa-eye mr-2"></i>
                                View product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                {/* edit */}
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => {
                                        setActions({ id: row.original.id, slug: row.original.slug, action: "edit" })
                                    }}
                                >
                                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                                    Edit product
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild >
                                {/* delete */}
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-600 hover:text-red-600! hover:bg-accent"
                                    onClick={() => {
                                        // navigate to delete page
                                        setActions({ id: row.original.id, slug: row.original.slug, action: "delete" })
                                    }}
                                >
                                    <i className="fa-solid fa-trash mr-2"></i>
                                    Delete product
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

} 