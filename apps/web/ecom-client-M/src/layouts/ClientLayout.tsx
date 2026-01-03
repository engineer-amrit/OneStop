import Header from "../components/client/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useRef } from "react";
import { HashLoader } from "react-spinners";
import Navbar from "../components/client/Navbar";

const ClientLayout = () => {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  const navbar_hide_ON_location = [
    "/products",
    `/product-details/${pathname.split("/")[2]}`,
    `/categorized-products/${pathname.split("/")[2]}`,
  ];

  const hide_ON_location = [
    "/categories&services/services",
    "/categories&services",
    "/cart",
  ];

  return (
    <div className="grid min-h-svh">
      {!hide_ON_location.includes(pathname) && (
        <>
          <Header
            mainRef={mainRef}
          />
        </>
      )}

      <main className="grid" ref={mainRef}>
        <Suspense
          fallback={
            <div className="grid place-items-center">
              <HashLoader color="#facc15" size={80} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      {!navbar_hide_ON_location.includes(pathname) && <Navbar />}
    </div>
  );
};

export default ClientLayout;
