import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface InfiniteApiResponse<T> {
    [key: string]: T[] | number | null;
    nextPage: number | null;
}



export const useGetDataInfinity = <T,>(
    endpoint: string,
    queryKey: string,
    parms: string
) => {
    // const query = parms.toString();

    return useInfiniteQuery<
        InfiniteApiResponse<T>,
        Error,
        InfiniteData<InfiniteApiResponse<T>, number>,
        string[],
        number
    >({
        queryKey: [queryKey, parms, endpoint],
        queryFn: async ({ pageParam }) => {
            const url = `/${endpoint}?page=${pageParam}` + `&${parms}`;
            const response = await axiosInstance.get<InfiniteApiResponse<T>>(
                url
            );

            return response.data;
        },

        initialPageParam: 1,
        retry: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

