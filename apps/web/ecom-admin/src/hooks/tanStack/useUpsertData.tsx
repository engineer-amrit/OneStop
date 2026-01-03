import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axios' // adjust to your project
import type { ApiError, FormDataAcceptable } from 'common'
import { FormDataMaker } from '@utils/shared'

interface UpsertOptions<T> {
    data: T
    id?: string // If present, will do PUT /update-url/id
}

export interface Options<T> {
    mediaArray?: (keyof T)[],
    onSuccess?: () => void
    onError?: (error: ApiError) => void
    onSettled?: () => void
}


export const useUpsertMutation = <T extends FormDataAcceptable<T>>(
    queryKey: string[],
    uploadUrl: string,
    updateUrl: string,
    options?: Options<T>
) => {
    const queryClient = useQueryClient()

    return useMutation<
        unknown,
        ApiError,
        UpsertOptions<T>
    >({
        mutationFn: ({ data, id }: UpsertOptions<T>) => {
            const url = id ? `${updateUrl}/${id}` : uploadUrl
            return axiosInstance({
                method: id ? 'put' : 'post',
                url,
                data: FormDataMaker<T>(data, options?.mediaArray),
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        onSuccess: () => {
            queryKey.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: [key] })
            })
            options?.onSuccess?.()
        },
        onError: (error) => {
            options?.onError?.(error)
        },
        onSettled: () => {
            options?.onSettled?.()
        },
    })
}
