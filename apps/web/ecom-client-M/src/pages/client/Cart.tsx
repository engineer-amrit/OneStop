import { useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  useEffect(() => {
    const cc = document.getElementById("cc") as HTMLElement;
    const kk = document.getElementById("kk") as HTMLElement;
    kk.style.marginTop = `${cc.clientHeight + 15}px`;
  }, []);
  return (
    <>
      <div
        id="cc"
        className="fixed left-0 right-0 top-0 z-10 flex w-full flex-col justify-between gap-1 border-b-2 border-slate-300 bg-white py-2"
      >
        <div className="flex h-fit w-full justify-between px-5">
          <span className="flex flex-col items-center justify-evenly text-base">
            <span className="text-xl font-bold">&#8377; 2000.00</span>
            <Link to="" className="text-sm text-[#40A3FF]">
              View details
            </Link>
          </span>
          <Link
            to="/checkout"
            className="my-auto h-fit rounded-md bg-tertiary px-3 py-2 text-lg font-semibold text-white"
          >
            Proceed to Checkout
          </Link>
        </div>
        <div className="bg-primary p-1 text-center text-base font-medium text-tertiary/80">
          <i className="text-xl not-italic">🎊</i> Great job! ₹1500 saved on
          your cart items!
        </div>
      </div>
      <div className="non fixed top-[40%] hidden w-full -translate-y-[40%] transform flex-col items-center justify-center gap-5">
        <svg
          className="size-[75vw]"
          viewBox="0 0 274 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M184.228 102.397C164.82 102.397 145.064 101.494 126.584 95.5987C108.451 89.8356 91.8023 78.6548 76.9623 65.7212C67.2467 57.3024 58.4123 50.5833 45.7982 51.5925C33.4579 52.3574 21.6572 57.6353 12.1299 66.6507C-3.9159 82.7447 -1.50439 112.569 4.91856 133.443C14.5646 164.967 43.92 186.931 68.8698 201.139C97.692 217.631 129.366 227.219 161.11 232.716C188.935 237.576 224.69 241.082 248.805 220.287C270.949 201.139 277.025 157.478 271.599 127.999C270.282 119.29 266.233 111.433 260.214 105.903C244.655 92.8632 221.444 101.574 203.961 101.999C197.468 102.158 190.86 102.344 184.228 102.397Z"
            fill="#FFD964"
          />
          <path
            d="M192.784 222.597C198.816 222.597 203.705 216.997 203.705 210.089C203.705 203.18 198.816 197.58 192.784 197.58C186.752 197.58 181.863 203.18 181.863 210.089C181.863 216.997 186.752 222.597 192.784 222.597Z"
            fill="white"
            stroke="#BABABA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M116.729 229.981C122.761 229.981 127.65 224.38 127.65 217.472C127.65 210.564 122.761 204.963 116.729 204.963C110.697 204.963 105.808 210.564 105.808 217.472C105.808 224.38 110.697 229.981 116.729 229.981Z"
            fill="white"
            stroke="#BABABA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M137.667 284.397C184.679 284.397 222.789 281.674 222.789 278.316C222.789 274.957 184.679 272.234 137.667 272.234C90.6561 272.234 52.5459 274.957 52.5459 278.316C52.5459 281.674 90.6561 284.397 137.667 284.397Z"
            fill="#334155"
            fillOpacity="0.29"
          />
          <path
            d="M17.5559 43.8377L47.6997 40.9164C51.4586 40.5394 55.2165 41.6527 58.3443 44.07C61.4721 46.4873 63.78 50.0618 64.8817 54.1952L93.7734 164.941L88.1156 176.547C86.6624 179.537 85.945 182.923 86.0399 186.343C86.1348 189.764 87.0385 193.091 88.6545 195.97C90.2706 198.848 92.5384 201.171 95.2163 202.689C97.8941 204.207 100.882 204.865 103.86 204.592L219.566 193.331"
            stroke="#334155"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M69.1946 71.0063L203.682 57.9399C205.007 57.8099 206.341 58.0231 207.584 58.5639C208.827 59.1047 209.948 59.959 210.863 61.0636C211.778 62.1682 212.465 63.4947 212.872 64.9446C213.278 66.3946 213.395 67.9308 213.212 69.4394L204.1 144.784C203.823 147.044 202.89 149.132 201.452 150.712C200.014 152.292 198.153 153.272 196.17 153.495L93.7734 164.941L69.1946 71.0063Z"
            stroke="#334155"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42.8777 34.4335L14.4592 37.1953C11.9964 37.4346 10.215 40.5309 10.4802 44.1109C10.7455 47.6909 12.9569 50.3991 15.4196 50.1598L43.8382 47.398C46.3009 47.1586 48.0824 44.0624 47.8171 40.4824C47.5519 36.9023 45.3405 34.1941 42.8777 34.4335Z"
            fill="#334155"
          />
          <path
            d="M125.819 129.194C126.373 124.347 128.358 119.863 131.443 116.486C134.529 113.108 138.529 111.04 142.782 110.624C147.035 110.209 151.283 111.471 154.824 114.201C158.364 116.932 160.983 120.966 162.246 125.635"
            stroke="#334155"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M162.548 100.538C163.982 100.538 165.145 99.2066 165.145 97.5638C165.145 95.9211 163.982 94.5894 162.548 94.5894C161.113 94.5894 159.951 95.9211 159.951 97.5638C159.951 99.2066 161.113 100.538 162.548 100.538Z"
            fill="#334155"
          />
          <path
            d="M121.39 104.522C122.824 104.522 123.987 103.19 123.987 101.547C123.987 99.9047 122.824 98.573 121.39 98.573C119.955 98.573 118.793 99.9047 118.793 101.547C118.793 103.19 119.955 104.522 121.39 104.522Z"
            fill="#334155"
          />
          <path
            d="M48.2329 213.781V225.227"
            stroke="#BABABA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M43.2476 219.49H53.2182"
            stroke="#BABABA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M207.555 1V12.4198"
            stroke="#BABABA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M89.5068 35.1267V46.5465"
            stroke="#BABABA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M84.4983 40.8367H94.4921"
            stroke="#BABABA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M232.435 77.1146C233.741 77.1146 234.8 75.9017 234.8 74.4057C234.8 72.9096 233.741 71.6968 232.435 71.6968C231.129 71.6968 230.07 72.9096 230.07 74.4057C230.07 75.9017 231.129 77.1146 232.435 77.1146Z"
            fill="white"
            stroke="#BABABA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M144.044 52.761C145.299 52.761 146.316 51.5957 146.316 50.1583C146.316 48.7209 145.299 47.5557 144.044 47.5557C142.789 47.5557 141.771 48.7209 141.771 50.1583C141.771 51.5957 142.789 52.761 144.044 52.761Z"
            fill="#CFCFCF"
          />
          <path
            d="M159.301 241.639C160.556 241.639 161.574 240.474 161.574 239.037C161.574 237.599 160.556 236.434 159.301 236.434C158.046 236.434 157.029 237.599 157.029 239.037C157.029 240.474 158.046 241.639 159.301 241.639Z"
            fill="#CFCFCF"
          />
        </svg>
        <span className="text-center text-base text-tertiary/60">
          <p>Your cart feels a little light! Add some amazing building</p>
          <p>materials or services to get started</p>
        </span>
        <Link
          to=""
          className="custom-shadow rounded-lg bg-black px-3 py-2 text-white"
        >
          Check out our products
        </Link>
      </div>
      <div id="kk" className="px-2">
        <div className="cart-items flex flex-col gap-3 text-base text-tertiary/85">
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
        <Link
          to="/coupons"
          className="coupon my-8 flex rounded-sm p-3 text-lg font-medium text-tertiary outline outline-1 outline-slate-200"
        >
          <i className="fa-solid fa-badge-percent text-2xl text-secondary"></i>
          <span className="ml-3">Add Coupon</span>
        </Link>
        <div className="rounded-md px-3 text-base text-tertiary outline outline-1 outline-slate-200">
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
        <div className="mb-[15vh] mt-3 pl-2 text-lg font-bold text-d-green">
          You will save ₹1500 on this order
        </div>
      </div>
    </>
  );
};

export default Cart;
