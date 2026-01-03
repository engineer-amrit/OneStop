import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import WholePageLoader from "@/components/common/WholePageLoader";
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const AuthForm = lazy(() => import("../pages/auth/AuthForm"));
const UserForm = lazy(() => import("../pages/auth/UserForm"));

export const AuthRouters = (
  <Route
    path="auth"
    element={
      <Suspense fallback={<WholePageLoader />}>
        <AuthLayout />
      </Suspense>
    }
  >
    <Route path="" element={<AuthForm />} />
    <Route path="user-form" element={<UserForm />} />
  </Route>
);
