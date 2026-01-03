import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/utils/axiosInstance' // adjust to your project

interface Deletion {
    id?: string // If present, will do PUT /update-url/id
}

interface Error {
    status: number
    message: string
    extraDetails: string
}

export const useDeleteData = (
    queryKey: string[],
    deleteUrl: string,
    options?: {
        onSuccess?: () => void
        onError?: (error: Error) => void
        onSettled?: () => void
    }
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id }: Deletion) => {
            const url = `${deleteUrl}/${id}`

            return axiosInstance.delete(url)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
            options?.onSuccess?.()
        },
        onError: (error) => {
            options?.onError?.(error as unknown as Error)
        },
        onSettled: () => {
            options?.onSettled?.()
        },
    })
}
