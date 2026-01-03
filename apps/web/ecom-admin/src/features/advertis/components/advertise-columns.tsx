import type { ColumnDef } from "@tanstack/react-table";
import type { AdvertiseDTO, } from "ecom";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table";
import { conf } from "@/config/config";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Dispatch } from "react";
import type { Action } from "@/hooks/useActionContext";

export const advertiseColumns = (setActions: Dispatch<Action>) =>
    [
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
        },

        {
            accessorKey: "title",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
            cell: ({ row }) => {
                const title = row.original.title
                return (
                    <div >{title}</div>
                )
            },

            enableSorting: false,
        },
        {
            accessorKey: "type",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
            cell: ({ row }) => {
                const type = row.original.type
                return (
                    <Badge className={`${type == "POPUP" ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-green-800"
                        }`}>{type}</Badge>
                )
            },

            enableSorting: false,
        }
        ,
        {
            accessorKey: "image",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Image' />,
            cell: ({ row }) => {
                const image = row.original.image ? conf.server_url + "/v1/cdn?url=" + row.original.image + "&w=200&h=200" : "";
                if (!image) {
                    return <Badge className="bg-muted-foreground">NULL</Badge>;
                }
                return (
                    <img
                        src={image}
                        alt="Advertise Image"
                        className="w-12 h-12 object-contain"
                    />
                )
            },
            enableSorting: false,
        },
        {
            accessorKey: "redirectUrl",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Redirect URL' />,
            cell: ({ row }) => {
                const redirectUrl = row.original.redirectUrl
                if (!redirectUrl) {
                    return <Badge className="bg-muted-foreground">NULL</Badge>;
                }
                return (
                    <div className="bg-muted-foreground">{redirectUrl}</div>
                )
            },
            enableSorting: false,
        },
        {
            accessorKey: "videoUrl",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Video URL' />,
            cell: ({ row }) => {
                const videoUrl = row.original.videoUrl
                if (!videoUrl) {
                    return <Badge className="bg-muted-foreground">NULL</Badge>;
                }
                return (
                    <div >{videoUrl}</div>
                )
            },
            enableSorting: false,
        },

        {
            accessorKey: "createdAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
            cell: ({ row }) => {
                const createdAt = new Date(row.original.createdAt).toLocaleDateString()
                return (
                    <div >{createdAt}</div>
                )
            },

            enableSorting: false,
        },
        {
            id: "actions",
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
                                Copy  ID
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <i className="fa-solid fa-eye mr-2"></i>
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                {/* edit */}
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => {
                                        setActions({ id: row.original.id, action: "edit" })
                                    }}
                                >
                                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                                    Edit Advertise
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild >
                                {/* delete */}
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-600 hover:text-red-600! hover:bg-accent"
                                    onClick={() => {
                                        // navigate to delete page
                                        setActions({ id: row.original.id, action: "delete" })
                                    }}
                                >
                                    <i className="fa-solid fa-trash mr-2"></i>
                                    Delete Advertise
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }
    ] satisfies ColumnDef<AdvertiseDTO>[];
