import React from "react";
import { useAppDispatch, useAppSelector } from "@/config/reduxTypes";
import { fetchUserData } from "@/store/features/authanticationSlice";
import WholePageLoader from "../common/WholePageLoader";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.Auth);
  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return <>{loading ? <WholePageLoader /> : children}</>;
};

export default AuthWrapper;
