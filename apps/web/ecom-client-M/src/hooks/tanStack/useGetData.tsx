import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useLocation } from "react-router-dom";


interface InfiniteApiResponse<T> {
    [key: string]: T[] | number | null;
    nextPage: number | null;
}



export const useGetData = <T,>(
    endpoint: string,
    queryKey: string,
    limit: number = 20,
    category?: string
) => {
    const location = useLocation();
    const queryString = location.search?.slice(1);


    return useInfiniteQuery<
        InfiniteApiResponse<T>,
        Error,
        InfiniteData<InfiniteApiResponse<T>, number>,
        string[],
        number
    >({
        queryKey: [queryKey, queryString, endpoint, String(limit), String(category)],
        queryFn: async ({ pageParam }) => {
            const response = await axiosInstance.get<InfiniteApiResponse<T>>(
                `/${endpoint}?currentPage=${pageParam}&limit=${limit}&${queryString}&isActive=true${category ? `&category=${category}` : ""
                }`
            );
            return response.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

