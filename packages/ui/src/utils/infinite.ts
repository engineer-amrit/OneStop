import { useCallback, useEffect, useMemo, useState } from "react";

interface PropsType {
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    element: React.RefObject<HTMLElement | null> | Window;
}

export const useInfinite = (p: PropsType) => {
    const { isFetchingNextPage, hasNextPage, fetchNextPage, element } = p;
    const isWindow = element instanceof Window;
    // Flag to track if a debounced fetch is already in progress
    const [isFetching, setIsFetching] = useState(false);

    // Memoized debounce function
    const debouncedFetchNextPage = useMemo(
        () =>
            debounce(() => {
                // This function is called only after 2 seconds of inactivity
                setIsFetching(false);
                fetchNextPage(); // Trigger the actual page fetch
            }, 200),
        [fetchNextPage]
    );

    // Scroll handler to check if we're at the bottom of the page
    const scrollHandler = useCallback(() => {
        // const { innerHeight, scrollY } = window;
        // const scrollHeight = document.documentElement.scrollHeight;

        let scrollTop = 0;
        let scrollHeight = 0;
        let clientHeight = 0;

        if (isWindow) {
            scrollTop = window.scrollY;
            clientHeight = window.innerHeight;
            scrollHeight = document.documentElement.scrollHeight;
        } else if (element?.current) {
            scrollTop = element.current.scrollTop;
            clientHeight = element.current.clientHeight;
            scrollHeight = element.current.scrollHeight;
        }

        // Check if we're near the bottom and if the fetch operation is not in progress
        if (scrollTop + clientHeight + 1 >= scrollHeight && !isFetchingNextPage && hasNextPage) {
            if (!isFetching) {
                setIsFetching(true);
                debouncedFetchNextPage();
            }
        }
    }, [isFetchingNextPage, hasNextPage, isFetching, debouncedFetchNextPage, element, isWindow]);

    // Adding and cleaning up the scroll event listener
    useEffect(() => {
        if (element) {
            const el = isWindow ? element : element.current;
            el?.addEventListener("scroll", scrollHandler);
            return () => el?.removeEventListener("scroll", scrollHandler);
        }
    }, [scrollHandler, element, isWindow]);


    return null;
};

// Debounce function to limit repeated calls
export function debounce<T>(func: (e?: T) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (e?: T) => {
        clearTimeout(timer); // Clear the previous timeout
        timer = setTimeout(
            () => {
                func(e); // Call the actual function
            }
            , delay); // Set a new timeout
    };
}

