import PagesContainer from "../../components/client/PagesContainer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Coupons = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const bottomNav = document.querySelector("#apply-c") as HTMLElement;

    let lastScroll = 0;
    const scrollHandler = () => {
      const { scrollY: scroll, innerHeight } = window;
      const scrollHeight = document.documentElement.scrollHeight;
      const isAtBottom = scroll + innerHeight >= scrollHeight;
      if (!isAtBottom) {
        if (scroll > 100 && scroll > lastScroll) {
          bottomNav.style.bottom = "-100%";
        } else {
          bottomNav.style.bottom = "1rem";
        }
        lastScroll = scroll;
      }
    };

    if (bottomNav) {
      window.addEventListener("scroll", scrollHandler);
    }
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [location]);
  return (
    <>
      <PagesContainer title="Coupons" backLink="/cart">
        <div className="inpt my-3 flex gap-3 px-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Have a coupon code?"
            className="w-full rounded-md border-none bg-slate-200 px-3 py-2 text-base text-tertiary outline-tertiary placeholder:text-base placeholder:text-tertiary/90 focus:outline-1"
          />
          <button className="rounded-lg bg-tertiary px-3 text-base text-white">
            Apply
          </button>
        </div>
        <button
          id="apply-c"
          className="fixed bottom-4 left-2/4 w-[90%] -translate-x-2/4 rounded-md bg-tertiary p-3 text-lg text-white"
        >
          Apply Coupon
        </button>
        <div className="flex flex-col gap-4 px-5 pb-16">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </PagesContainer>
    </>
  );
};

const Card = () => {
  return (
    <label className="card flex border-b border-slate-200 py-2">
      <input type="checkbox" name="" id="" className="size-[5vw]" />
      <div className="ml-4 grid text-lg text-tertiary">
        <span className="w-fit border-2 border-dashed border-tertiary p-1">
          FIRST100
        </span>
        <span className="mb-1 mt-2 w-[min(250px,50vw)]">
          Get flat Rs 100 off on cart value of 2499 & above
        </span>
        <span className="font-bold text-green-400">Save &#8377;100</span>
      </div>
    </label>
  );
};

export default Coupons;
