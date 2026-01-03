import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axios' // adjust to your project
import type { ApiError } from 'common'
interface Deletion {
    id?: string // If present, will do PUT /update-url/id
}

interface ResponseData {
    message: string
}


export const useDeleteData = (
    queryKey: string[],
    deleteUrl: string,
    options?: {
        onSuccess?: (r: ResponseData) => void
        onError?: (error: ApiError) => void
        onSettled?: () => void
    }
) => {
    const queryClient = useQueryClient()

    return useMutation<
        ResponseData,
        ApiError,
        Deletion
    >({
        mutationFn: async ({ id }: Deletion) => {
            const url = `${deleteUrl}/${id}`

            return (await axiosInstance.delete(url)).data
        },
        onSuccess: (r) => {
            queryKey.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: [key] })
            })
            options?.onSuccess?.(r)
        },
        onError: (error) => {
            options?.onError?.(error)
        },
        onSettled: () => {

            options?.onSettled?.()
        },
    })
}
