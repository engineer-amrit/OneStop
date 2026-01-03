import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axios";

interface Options {
    endpoint: string;
    queryKey: string;
    params?: string;
}

const useGetData = <TDATA,>(options: Options) => {
    const { endpoint, queryKey, params } = options;
    return useQuery<TDATA>({
        queryKey: [queryKey, params, endpoint],
        queryFn: async () => {
            const url = `${endpoint}` + (params ? `?${params}` : '');
            const response = await axiosInstance.get<TDATA>(url);
            return response.data;
        },
        retry: 1,
    })
}

export default useGetData
