import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import WholePageLoader from "./components/common/WholePageLoader";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthRouters } from "./routers/AuthRouters";
import { ClientRouters } from "./routers/ClientRouters";
import { Suspense, lazy } from "react";
import AuthWrapper from "./components/auth/AuthWrapper";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable focus refetch globally
    },
  },
})

const ERROR = lazy(() => import("./pages/404"));

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {ClientRouters}
      {AuthRouters}
      <Route
        path="*"
        element={
          <Suspense fallback={<WholePageLoader />}>
            <ERROR />
          </Suspense>
        }
      />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <RouterProvider router={routers} />
        </AuthWrapper>
      </QueryClientProvider >
    </Provider>
  </>,
);
