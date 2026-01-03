import { Outlet, Link, useLocation } from "react-router-dom";
import PagesContainer from "../components/client/PagesContainer";
import { useEffect, Suspense } from "react";
import { HashLoader } from "react-spinners";

const ROLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const OR = document.querySelectorAll("#OR a") as NodeListOf<HTMLElement>;
    const line = document.querySelector("#OR .line") as HTMLElement;
    if (pathname === "/rewards-offers") {
      line.style.width = OR[0].offsetWidth + 10 + "px";
      line.style.left = OR[0].offsetLeft - 5 + "px";
    } else {
      line.style.width = OR[1].offsetWidth + 10 + "px";
      line.style.left = OR[1].offsetLeft - 5 + "px";
    }
  }, [pathname]);
  return (
    <>
      <PagesContainer title="Offers & Rewards" backLink="/">
        <div
          id="OR"
          className="relative flex items-center justify-between border-b-2 border-slate-200 px-10 py-3 text-lg text-tertiary"
        >
          <div className="line absolute bottom-0 h-1 bg-tertiary transition-all duration-200"></div>
          <Link to="/rewards-offers" className="flex items-center gap-1">
            <i className="fa-regular fa-badge-percent text-2xl"></i>
            <span>Offers</span>
          </Link>
          <Link to="rewards" className="flex items-center gap-1">
            <i className="fa-regular fa-gift text-xl"></i>
            <span>Rewards</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="grid w-full flex-1 place-items-center">
              <HashLoader color="#facc15" size={80} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </PagesContainer>
    </>
  );
};

export default ROLayout;
