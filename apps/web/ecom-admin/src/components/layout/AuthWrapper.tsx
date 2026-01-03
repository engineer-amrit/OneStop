import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxTypes";
import { fetchUserData } from "@/store/auth-store";
import WholePageLoader from "../WholePageLoader";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.Auth);
    React.useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);
    if (loading) {
        return <WholePageLoader />;
    }

    return <>{children}</>;
};

export default AuthWrapper;
