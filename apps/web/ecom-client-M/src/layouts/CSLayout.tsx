import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, Suspense } from "react";
import { HashLoader } from "react-spinners";

const Links = [{
  name: "Product",
  link: "/categories&services",
}, {
  name: "Services",
  link: "/categories&services/services",
}]

const CSLayout = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();


  useEffect(() => {
    const slider = sliderRef.current;
    const activeLink = document.querySelectorAll(
      ".cat-services-nav > div > a",
    ) as NodeListOf<HTMLAnchorElement>;
    activeLink.forEach((link) => {
      if (link.classList.contains("text-tertiary") && slider) {
        slider.style.left = `${link.offsetLeft}px`;
        slider.style.width = `${link.offsetWidth}px`;
        setTimeout(() => {
          slider.style.height = `${link.offsetHeight}px`;
        }, 100);
      }
    });
  }, []);

  const clickEffect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const slider = sliderRef.current;
    const target = e.currentTarget as HTMLAnchorElement;
    if (slider) {
      slider.style.left = `${target.offsetLeft}px`;
      slider.style.width = `${target.offsetWidth}px`;
      slider.style.height = `${target.offsetHeight}px`;
    }
  }

  useEffect(() => {
    const cat_services_nav = document.querySelector(
      ".cat-services-nav",
    ) as HTMLElement;
    const sibling = cat_services_nav.nextElementSibling as HTMLElement;
    sibling.style.marginTop = `${cat_services_nav.offsetHeight}px`;
  }, [pathname]);

  return (
    <>
      <div className="cat-services-nav fixed left-0 right-0 top-0 grid w-full place-items-center bg-white/70 py-2 backdrop-blur-[2px]">
        <div className="relative mx-auto flex justify-between gap-4 rounded-full bg-tertiary p-[0.2rem] text-lg text-white">
          <div
            ref={sliderRef}
            className="absolute rounded-full bg-secondary transition-all"
          ></div>
          {
            Links.map((link, index) => (
              <Link
                key={index}
                onClick={clickEffect}
                to={link.link}
                className={`z-10 px-[min(1.25rem,4.70vw)] py-[min(0.6rem,2.25vw)] ${pathname === link.link ? "font-semibold text-tertiary" : ""}`}
              >
                {link.name}
              </Link>
            ))
          }

        </div>
      </div>
      <div>
        <Suspense
          fallback={
            <div className="grid h-full place-items-center">
              <HashLoader color="#facc15" size={80} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default CSLayout;
