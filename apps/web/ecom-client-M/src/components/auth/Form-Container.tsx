import { useNavigate } from "react-router-dom";
import Logo from "../common/logo";
import Terms$conditions from "./Terms$conditions";
import { useAppSelector } from "@/config/reduxTypes";
import { useEffect } from "react";

const FormContainer = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.Auth);
  useEffect(() => {
    if (user && !loading) {
      navigate(-1);
    }
  }, [user, loading, navigate]);

  if (!user && !loading) {
    return (
      <div className="flex h-svh w-svw flex-col sm:h-[585px] sm:w-full">
        <div className="logo mx-auto grid w-[55vw] flex-1 place-items-center sm:w-[55%]">
          <Logo
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        {/* Main content container with flex growth */}
        <div className="relative flex h-[70%] w-full overflow-hidden sm:max-h-96">
          {/* Background element */}
          <div className="absolute bottom-0 left-0 right-0 top-0 grid scale-x-125 place-items-center rounded-t-full bg-white"></div>

          {/* Content that should stay on top */}
          <div className="z-10 flex w-full flex-1 flex-col p-6">
            {children}
            <Terms$conditions />
          </div>
        </div>
      </div>
    );
  }
};

export default FormContainer;
