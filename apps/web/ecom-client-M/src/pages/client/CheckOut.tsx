import PagesContainer from "../../components/client/PagesContainer";
import { Link } from "react-router-dom";

const CheckOut = () => {
  return (
    <>
      <PagesContainer title="CheckOut" backLink="/cart">
        <div className="progress-bar my-3 flex items-center gap-2 px-8">
          <div>
            {" "}
            <span className="grid size-[8vw] place-items-center rounded-full border-2 border-tertiary text-xl text-tertiary">
              <i className="fas fa-check"></i>
            </span>
          </div>
          <div className="h-fit flex-1 rounded-full border-b-2 border-tertiary"></div>
          <div>
            {" "}
            <span className="grid size-[8vw] place-items-center rounded-full border-2 border-tertiary bg-tertiary text-xl text-white">
              2
            </span>
          </div>
          <div className="h-fit flex-1 rounded-full border-b-2 border-slate-300"></div>

          <div>
            {" "}
            <span className="grid size-[8vw] place-items-center rounded-full border-2 border-slate-300 text-xl text-slate-300">
              3
            </span>
          </div>
        </div>
        <div className="address mx-3 flex justify-between rounded-md p-2 outline outline-1 outline-slate-300">
          <div className="flex flex-col gap-1 p-2 text-base text-tertiary">
            <h1 className="mb-1 text-lg font-semibold">Delivery to:</h1>
            <span className="text-lg text-slate-500">Rohit</span>
            <span>
              <span className="line-clamp-1">
                Bharat dharam kanta, sirsa road haryana
              </span>
              <span>125104</span>
            </span>
            <span className="font-bold">8437212635</span>
          </div>
          <button className="h-fit rounded-md border border-tertiary px-3 py-1 text-lg font-semibold text-[#40BFFF]">
            Change
          </button>
        </div>
        <div className="cart-items mx-3 flex flex-col gap-3 py-3 text-base text-tertiary/85">
          <span>Cart (2 items)</span>
          <div className="card flex h-[26vw] items-center justify-between rounded-xl px-[3vw] py-[2.5vw] outline outline-1 outline-slate-300">
            <div className="img h-[20vw] w-[16vw] outline outline-1 outline-slate-300"></div>
            <div className="details flex h-full flex-col justify-between text-base text-tertiary">
              <span className="font-semibold">Pro Plus Cement</span>
              <span className="review space-x-[0.5vw] text-secondary">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fa-duotone fa-solid fa-star-half"></i>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg font-bold">&#8377; 1000</span>
                <del className="text-sm text-tertiary/55">&#8377; 1000</del>
                <span className="text-lg font-bold text-d-green">40%</span>
              </span>
            </div>
            <div className="action flex h-full flex-col items-end justify-between">
              <span className="flex gap-3 text-2xl">
                <i className="fa-regular fa-heart text-slate-400"></i>
                <i className="fa-regular fa-trash-can text-slate-400"></i>
              </span>
              <span className="inci-decre flex h-fit rounded-md text-lg outline outline-1 outline-slate-300">
                <button className="px-[1.5vw]">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="grid place-items-center bg-slate-200 px-[2vw]">
                  5
                </span>
                <button className="px-[1.5vw]">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="card flex h-[26vw] items-center justify-between rounded-xl px-[3vw] py-[2.5vw] outline outline-1 outline-slate-300">
            <div className="img h-[20vw] w-[16vw] outline outline-1 outline-slate-300"></div>
            <div className="details flex h-full flex-col justify-between text-base text-tertiary">
              <span className="font-semibold">Pro Plus Cement</span>
              <span className="review space-x-[0.5vw] text-secondary">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fa-duotone fa-solid fa-star-half"></i>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg font-bold">&#8377; 1000</span>
                <del className="text-sm text-tertiary/55">&#8377; 1000</del>
                <span className="text-lg font-bold text-d-green">40%</span>
              </span>
            </div>
            <div className="action flex h-full flex-col items-end justify-between">
              <span className="flex gap-3 text-2xl">
                <i className="fa-solid fa-heart text-red-500"></i>
                <i className="fa-regular fa-trash-can text-slate-400"></i>
              </span>
              <span className="inci-decre flex h-fit rounded-md text-lg outline outline-1 outline-slate-300">
                <button className="px-[1.5vw]">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="grid place-items-center bg-slate-200 px-[2vw]">
                  5
                </span>
                <button className="px-[1.5vw]">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="m-3 rounded-md px-3 text-base text-tertiary outline outline-1 outline-slate-200">
          <div className="flex flex-col gap-2 py-2">
            <h1 className="mb-1 text-lg font-semibold">Price Details</h1>
            <span className="flex justify-between">
              <span>Price (2 items)</span>
              <span className="font-semibold">&#8377; 3600.00</span>
            </span>
            <span className="flex justify-between">
              <span>Discount</span>
              <span className="font-semibold text-d-green">
                <i className="fa-solid fa-minus mr-1"></i>&#8377; 1500.00
              </span>
            </span>
            <span className="flex justify-between">
              <span>Coupons for you</span>
              <span></span>
            </span>
            <span className="flex justify-between">
              <span>Platform Fee</span>
              <span></span>
            </span>
            <span className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-semibold">
                <del>&#8377; 120.00</del>
                <i className="ml-1 text-base uppercase not-italic text-d-green">
                  Free Delivery
                </i>
              </span>
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-200 py-2 text-lg font-semibold">
            <span>Total Ammount</span>
            <span>&#8377; 2000.00</span>
          </div>
        </div>
        <div className="m-2 pl-2 text-lg font-bold text-d-green">
          You will save ₹1500 on this order
        </div>
        <Link
          to=""
          className="mx-auto mb-14 mt-1 w-[90%] rounded-lg bg-tertiary p-3 text-center text-lg text-white"
        >
          Proceed to Payment
        </Link>
      </PagesContainer>
    </>
  );
};

export default CheckOut;
