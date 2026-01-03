import type { ColumnDef, VisibilityState } from "@tanstack/react-table"
const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const

export type Screen = keyof typeof BREAKPOINTS

function getScreen(width: number): Screen {
    if (width <= BREAKPOINTS.sm) return "sm"
    if (width <= BREAKPOINTS.md) return "md"
    if (width <= BREAKPOINTS.lg) return "lg"
    if (width <= BREAKPOINTS.xl) return "xl"
    return "2xl"
}

export function resolveColumnVisibility<TData, TDATA>(
    columns: ColumnDef<TData, TDATA>[],
    width: number
): VisibilityState {
    const screen = getScreen(width)
    return Object.fromEntries(
        columns.flatMap((col) => {
            const id =
                col.id ??
                ("accessorKey" in col && typeof col.accessorKey === "string"
                    ? col.accessorKey
                    : null)

            if (!id) return []

            const hideBelow = col.meta?.hideBelow
            if (!hideBelow) return [[id, true]]

            const visible =
                BREAKPOINTS[screen] >= BREAKPOINTS[hideBelow]

            return [[id, visible]]
        })
    )
}
