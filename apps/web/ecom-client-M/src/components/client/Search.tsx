import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

interface P {
  hide: "focused" | "unfocused";
  setHide: React.Dispatch<React.SetStateAction<"focused" | "unfocused">>;
  navRef: React.RefObject<HTMLDivElement>;
}

const searches = [
  {
    name: "search1",
    img: <i className="fa-solid fa-search"></i>,
  },
  {
    name: "search2",
    img: <i className="fa-solid fa-search"></i>,
  },
  {
    name: "search3",
    img: <i className="fa-solid fa-search"></i>,
  },
  {
    name: "search4",
    img: <i className="fa-solid fa-search"></i>,
  },
  {
    name: "search4",
    img: <i className="fa-solid fa-search"></i>,
  },
];

const products = [
  {
    img: "",
    name: "product1",
    category: "category1",
  },
  {
    img: "",
    name: "product2",
    category: "category2",
  },
  {
    img: "",
    name: "product3",
    category: "category3",
  },
  {
    img: "",
    name: "product4",
    category: "category4",
  },
  {
    img: "",
    name: "product5",
    category: "category5",
  },
  {
    img: "",
    name: "product6",
    category: "category",
  },
];

const suggestions = [
  {
    name: "suggestion1",
    category: "category1",
    img: "",
  },
  {
    name: "suggestion2",
    category: "category2",
    img: "",
  },
  {
    name: "suggestion3",
    category: "category3",
    img: "",
  },
  {
    name: "suggestion4",
    category: "category4",
    img: "",
  },
  {
    name: "suggestion5",
    category: "category5",
    img: "",
  },
  {
    name: "suggestion1",
    category: "category1",
    img: "",
  },
  {
    name: "suggestion2",
    category: "category2",
    img: "",
  },
  {
    name: "suggestion3",
    category: "category3",
    img: "",
  },
  {
    name: "suggestion4",
    category: "category4",
    img: "",
  },
  {
    name: "suggestion5",
    category: "category5",
    img: "",
  },
];

const Search = ({ hide, setHide, navRef }: P) => {

  const [showRecent, setShowRecent] = useState<"hide" | "show">("hide");

  const [showSuggestions, setShowSuggestions] = useState<"show" | "hide">("hide");

  const searchRef = useRef<HTMLDivElement>(null);

  const focusHandler = () => {
    setHide("focused");
    const nav = navRef.current;
    const search = searchRef.current;
    nav?.addEventListener("transitionend", () => {
      const height = search?.offsetHeight;
      const recentDiv = search?.querySelector<HTMLDivElement>("#recent");
      const suggestionsDiv = search?.querySelector<HTMLDivElement>("#suggestions");
      if (recentDiv && suggestionsDiv) {
        recentDiv.style.top = `${height}px`;
        suggestionsDiv.style.top = `${height}px`;
      }
      setShowRecent("show");
    },
      { once: true });
  }

  const searchBHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value && showSuggestions == 'hide') {
        setShowSuggestions("show");
        setShowRecent("hide");
      } else if (
        (!value && showRecent == 'hide')
      ) {
        setShowSuggestions("hide");
        setShowRecent("show");
      }
    },
    [showSuggestions, showRecent],
  );


  useEffect(() => {
    if (hide == "focused") {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {

      document.body.style.overflow = '';
    };
  }, [hide]);

  return (
    <>
      <div
        data-state={hide}
        ref={searchRef}
        className="flex relative  items-center justify-center gap-3 transition-all   data-[state=focused]:bg-tertiary data-[state=unfocused]:bg-white data-[state=focused]:px-3  data-[state=focused]:py-6 data-state=unfocused:py-0">

        <span
          onClick={() => {
            setHide("unfocused"); setShowRecent("hide"); setShowSuggestions("hide");
            const input = searchRef.current?.querySelector("input") as HTMLInputElement;
            if (input) {
              input.value = "";
            }
          }}
          data-state={hide}
          className=" data-[state=unfocused]:hidden grid size-[min(3rem,11.29vw)] place-items-center rounded-full bg-white text-xl"
        >
          <i className="fa-solid fa-arrow-left rounded-full"></i>
        </span>

        <input
          type="text"
          placeholder="Search Onestop.com"
          name="search"
          autoComplete="off"
          onFocus={focusHandler}
          onChange={searchBHandler}
          className="h-[min(3rem,11.29vw)] w-2 flex-1 rounded-xl bg-slate-200 px-3 text-base placeholder:text-tertiary"
        />
        <button className="grid size-[min(3rem,11.29vw)] place-items-center rounded-xl bg-primary text-white">
          <i className="fa-solid fa-search text-xl text-tertiary"></i>
        </button>

        <div
          data-state={showRecent}
          id="recent"
          className="fixed z-20 bottom-0 transition-all  w-screen  data-[state=show]:flex data-[state=hide]:hidden flex-col gap-4 overflow-y-auto bg-slate-100"
        >
          <div className="flex flex-col gap-2 bg-white px-3 py-2 shadow-lg">
            <h1 className="text-lg font-bold">Recent Searches</h1>
            <div className="searches grid grid-cols-[repeat(5,18vw)] justify-between">
              {searches.map((search, index) => (
                <div key={index} className="card grid gap-1 text-sm">
                  <div className="img mx-auto size-[13vw] rounded-full outline outline-1"></div>
                  <span className="line-clamp-1 text-center capitalize">
                    {search.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="similar flex flex-col gap-3 bg-white px-3 pb-3 pt-2 text-sm font-medium shadow-lg">
            <h1 className="text-lg font-bold">Similar Searches</h1>
            <div className="similars flex h-fit justify-between">
              <div className="flex flex-wrap justify-between gap-3">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="card flex h-[12vw] gap-2">
                      <div className="img w-[12vw] rounded-sm bg-slate-100 outline outline-1 outline-slate-300"></div>
                      <div className="line-clamp-1 grid w-[28vw] place-items-center rounded-sm bg-slate-100 capitalize outline outline-1 outline-slate-300">
                        search1
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="popular mb-1 flex flex-col gap-3 bg-white px-3 py-2">
            <h1 className="text-lg font-bold">Popular Searches</h1>

            <div className="products grid auto-rows-[36vw] grid-cols-[repeat(auto-fill,_minmax(26vw,26vw))] justify-center gap-[7vw]">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="card flex h-full w-full flex-col items-center gap-[2.5vw] rounded-sm p-[2vw] outline outline-1 outline-slate-300"
                >
                  <div className="img w-[75%] flex-1 outline outline-1 outline-slate-200"></div>
                  <div className="text-center text-sm capitalize leading-5">
                    {product.name}
                    <div className="text-[min(0.68rem,2.56vw)] capitalize text-slate-500">
                      {product.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div
          id="suggestions"
          data-state={showSuggestions}
          className="fixed z-20  bottom-0 w-screen data-[state=hide]:hidden flex-col gap-5 overflow-auto bg-slate-200"
        >
          <div className="suggestions bg-white py-2 pl-[9vw] text-base">
            {suggestions.map((suggestion, index) => (
              <Link
                onClick={() => {
                  setHide("unfocused"); setShowRecent("hide"); setShowSuggestions("hide");
                  const input = searchRef.current?.querySelector("input") as HTMLInputElement;
                  if (input) {
                    input.value = suggestion.name;
                  }
                }}
                to="/products"
                key={index}
                className="card flex h-20 w-full gap-5"
              >
                <div className="img my-auto h-[15vw] w-[13vw] rounded-sm bg-slate-100 shadow-lg outline outline-1 outline-slate-300"></div>
                <div className="flex w-full items-center justify-between border-b-[1.8px] border-tertiary pr-5 capitalize">
                  <div className="written flex flex-col items-center justify-center">
                    <span className="capitalize leading-9">
                      {suggestion.name}
                    </span>
                    <span className="text-secondary">
                      {" "}
                      in {suggestion.category}
                    </span>
                  </div>
                  <i className="fa-solid fa-arrow-up-left text-2xl"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div >




    </>
  );
};

export default Search;
