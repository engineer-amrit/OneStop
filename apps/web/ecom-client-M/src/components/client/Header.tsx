import Logo from "../common/logo";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, memo, useRef, useState } from "react";
import Search from "./Search";
import { SheetDemo } from "./Sidebar";

interface Props {
  mainRef: React.RefObject<HTMLDivElement>;
}

const Header = memo(({ mainRef }: Props) => {

  const navigate = useNavigate();

  const headerRef = useRef<HTMLDivElement>(null);

  const navRef = useRef<HTMLDivElement>(null);

  const [hide, setHide] = useState<"focused" | "unfocused">("unfocused");


  useEffect(() => {
    const header = headerRef.current;
    const main = mainRef.current;

    if (!header || !main) return;

    // Initial margin-top adjustment
    const adjustMainMargin = () => {
      main.style.marginTop = `${header.offsetHeight}px`;
    };

    adjustMainMargin();

    // Scroll-based header hide/show
    let lastScroll = 0;
    const scrollHandler = () => {
      const { scrollY: scroll, innerHeight } = window;
      const scrollHeight = window.document.documentElement.scrollHeight;
      const isAtBottom = scroll + innerHeight >= scrollHeight;
      const headerHeight = header.offsetHeight;

      if (!isAtBottom) {
        if (scroll > headerHeight && scroll > lastScroll && header.style.top === "") {
          header.style.top = "-100%";
        } else if (scroll < lastScroll && header.style.top === "-100%") {
          header.style.top = "";
        }
        lastScroll = scroll;
      }
    };

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", adjustMainMargin); // Optional: keeps margin in sync

    return () => {
      main.style.marginTop = "";
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", adjustMainMargin);
    };
  }, [mainRef]);


  return (
    <header
      ref={headerRef}
      data-state={hide}
      className="fixed top-0 z-20 w-full bg-white data-[state=focused]:px-0 data-[state=unfocused]:px-3 data-[state=focused]:py-0 data-[state=unfocused]:py-2 data-[state=unfocused]:space-y-2 transition-all shadow-md">

      <nav
        ref={navRef}
        data-state={hide}
        className="nav flex items-center justify-between overflow-hidden transition-all  data-[state=unfocused]:max-h-24 data-[state=focused]:max-h-0 data-[state=unfocused]:opacity-100 data-[state=focused]:opacity-0">
        <div className="logo w-[35vw]">
          <Logo
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="flex items-center gap-8">
          <Link to="/notifications" className="notification relative">
            <span className="outline-3 absolute -right-1 -top-0 grid size-[3.8vw] place-items-center rounded-full bg-red-600 text-xs font-semibold text-white outline outline-white">
              5
            </span>
            <i className="fa-solid fa-bell text-3xl text-secondary"></i>
          </Link>
          <SheetDemo />
        </div>
      </nav>
      <Search
        hide={hide}
        navRef={navRef}
        setHide={setHide}
      />
      <div
        data-state={hide}
        className="flex items-center gap-2 text-sm relative data-[state=focused]:hidden">
        <i className="fa-solid fa-location-dot text-xl text-tertiary"></i>
        <span>Delivering to V3T</span>-
        <span className="text-blue-500">Update</span>
      </div>
    </header>
  );
});

export default Header;
