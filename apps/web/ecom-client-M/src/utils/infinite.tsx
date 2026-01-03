import { useCallback, useEffect, useMemo, useState } from "react";

interface PropsType {
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
}

const useInfinite = (p: PropsType) => {
    const { isFetchingNextPage, hasNextPage, fetchNextPage } = p;

    // Flag to track if a debounced fetch is already in progress
    const [isFetching, setIsFetching] = useState(false);

    // Memoized debounce function
    const debouncedFetchNextPage = useMemo(
        () =>
            debounce(() => {
                // This function is called only after 2 seconds of inactivity
                console.log("Debounced fetch triggered"); // Check in the console
                setIsFetching(false);
                fetchNextPage(); // Trigger the actual page fetch
            }, 200),
        [fetchNextPage]
    );

    // Scroll handler to check if we're at the bottom of the page
    const scrollHandler = useCallback(() => {
        const { innerHeight, scrollY } = window;
        const scrollHeight = document.documentElement.scrollHeight;

        // Check if we're near the bottom and if the fetch operation is not in progress
        if (innerHeight + scrollY >= scrollHeight - 10 && !isFetchingNextPage && hasNextPage) {
            if (!isFetching) {
                setIsFetching(true); // Set fetching flag
                console.log("Scroll triggered, debounce initiated"); // Check in the console
                debouncedFetchNextPage(); // Call the debounced function
            }
        }
    }, [isFetchingNextPage, hasNextPage, isFetching, debouncedFetchNextPage]);

    // Adding and cleaning up the scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [scrollHandler]);

    return null;
};

// Debounce function to limit repeated calls
function debounce(func: () => void, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timer); // Clear the previous timeout
        timer = setTimeout(func, delay); // Set a new timeout
    };
}

export default useInfinite;
