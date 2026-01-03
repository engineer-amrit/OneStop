import WholePageLoader from "@/components/common/WholePageLoader";
import { lazy, Suspense } from "react";
import { Outlet, Route } from "react-router-dom";

const ClientLayout = lazy(() => import("../layouts/ClientLayout"));
const Home = lazy(() => import("../pages/client/Home"));
const Notifications = lazy(() => import("../pages/client/Notifications"));
const Profile = lazy(() => import("../pages/client/Profile"));
const Orders = lazy(() => import("../pages/client/Orders"));
const Addresses = lazy(() => import("../pages/client/Addresses"));
const Order_Details = lazy(() => import("../pages/client/Order-Details"));
const PaymentMethods = lazy(() => import("../pages/client/PaymentMethods"));
const CSLayout = lazy(() => import("../layouts/CSLayout"));
const ROLayout = lazy(() => import("../layouts/ROLayout"));
const Categories = lazy(() => import("../pages/client/Categories"));
const Services = lazy(() => import("../pages/client/Services"));
const Offers = lazy(() => import("../pages/client/Offers"));
const Rewards = lazy(() => import("../pages/client/Rewards"));
const ReferAFriend = lazy(() => import("../pages/client/ReferAFriend"));
const Cart = lazy(() => import("../pages/client/Cart"));
const Coupons = lazy(() => import("../pages/client/Coupons"));
const CheckOut = lazy(() => import("../pages/client/CheckOut"));
const Products = lazy(() => import("../pages/client/Products"));
const ProductDetails = lazy(() => import("../pages/client/Product-details"));
const WriteReview = lazy(() => import("../pages/client/WriteReview"));
const CategorizedProducts = lazy(() => import("../pages/client/CategorizedProducts"));

const Wraper = () => {
  return (
    <Suspense fallback={<WholePageLoader />}>
      <Outlet />
    </Suspense>
  );
};

export const ClientRouters = (
  <>
    <Route
      element={
        <Suspense fallback={<WholePageLoader />}>
          <ClientLayout />
        </Suspense>
      }
    >
      <Route path="/" element={<Home />} />

      <Route path="categories&services" element={<CSLayout />}>
        <Route index element={<Categories />} />
        <Route path="services" element={<Services />} />
      </Route>
      <Route path="products" element={<Products />} />
      <Route path="product-details/:_id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="categorized-products/:category" element={<CategorizedProducts />} />
    </Route>
    <Route element={<Wraper />}>
      <Route path="coupons" element={<Coupons />} />
      <Route path="checkout" element={<CheckOut />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="orders" element={<Orders />} />
      <Route path="order-details/:_id" element={<Order_Details />} />
      <Route path="profile" element={<Profile />} />
      <Route path="addresses" element={<Addresses />} />
      <Route path="payment-methods" element={<PaymentMethods />} />
      <Route path="write-review/:_id" element={<WriteReview />} />
      <Route path="rewards-offers" element={<ROLayout />}>
        <Route index element={<Offers />} />
        <Route path="rewards" element={<Rewards />} />
      </Route>
      <Route path="refer-a-friend" element={<ReferAFriend />} />
    </Route>
  </>
);
