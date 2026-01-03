import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/utils/axiosInstance' // adjust to your project
import { FormDataMaker } from '@/utils/formDataMaker'

interface UpsertOptions<T> {
    data: T
    id?: string // If present, will do PUT /update-url/id
}

interface Error {
    status: number
    message: string
    extraDetails: string
}

export type FormDataAcceptable =
    Record<
        string,
        | string
        | number
        | boolean
        | string[]
        | Blob
        | File
        | Blob[]
        | File[]
        | Record<string, string | number>
        | { from: Date; to: Date }
    >

export const useUpsertMutation = <T extends FormDataAcceptable>(
    queryKey: string[],
    uploadUrl: string,
    updateUrl: string,
    options?: {
        onSuccess?: () => void
        onError?: (error: Error) => void
        onSettled?: () => void
    }
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ data, id }: UpsertOptions<T>) => {
            const url = id ? `${updateUrl}/${id}` : uploadUrl

            return axiosInstance({
                method: id ? 'put' : 'post',
                url,
                data: FormDataMaker(data),
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
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
