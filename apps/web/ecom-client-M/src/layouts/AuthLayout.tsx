import sideimg from "../assets/images/yellow-wall-with-blue-background-brick-that-says-concrete_1110958-16288.jpg";
import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <div className="sm:flex sm:min-h-screen sm:w-full sm:items-center sm:justify-center sm:bg-slate-100">
      <div className="container overflow-hidden sm:max-w-[min(375px,50vw)] sm:rounded-2xl sm:bg-white sm:shadow-md lg:flex lg:max-w-4xl">
        <div className="w-full bg-secondary sm:w-full lg:w-[375px]">
          {/* This is where your routed content will go */}
          <Outlet />
        </div>
        <div className="hidden flex-1 lg:block">
          <img
            src={sideimg}
            alt="sideimg"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Authlayout;
