import { Input } from "@/components/ui/input"
import React, { useEffect } from "react"
import { debounce } from "@ui/lib";
import { useNavigate, useSearch } from "@tanstack/react-router";

const Search = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isSearch = useSearch({ from: "/_authenticated/products/" }).search
    const nav = useNavigate({ from: "/products" });
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = isSearch || "";
        }
    }, [isSearch]);
    const dbounce = debounce<string>((value) => {
        if (!value || value.trim() === "") {
            nav({
                search: (prev) => {
                    const data = { ...prev };
                    delete data.search;

                    return {
                        ...data
                    }
                }
            })
            return;
        }
        nav({
            search: (prev) => ({
                ...prev,
                search: value
            })
        });
    }, 500);

    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
        dbounce(e.currentTarget.value);
    }

    return (

        <Input
            ref={inputRef}
            id="search"
            // value={parms.get("search")?.toString()}
            placeholder="Search products..." className="w-fit md:flex-none text-base flex-1 bg-card placeholder:text-sm"
            onInput={onInput}
        />
    )
}

export default Search
