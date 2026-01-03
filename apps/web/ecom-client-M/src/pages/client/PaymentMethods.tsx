import PagesContainer from "../../components/client/PagesContainer";
import { Link } from "react-router-dom";
import BankData from "../../assets/Bank.json";
import React, { useCallback, MouseEvent, useState } from "react";

const PaymentMethods = () => {
  const [show, setShow] = useState<boolean>(false);
  const clickHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    const nextSibling = target.nextElementSibling as HTMLElement;
    const plus = target.querySelector("#plus") as HTMLElement;
    const xyzRef = nextSibling.children[0] as HTMLElement;

    if (nextSibling && plus) {
      nextSibling.classList.toggle("grid-rows-[0fr]");
      nextSibling.classList.toggle("grid-rows-[1fr]");
      plus.classList.toggle("rotate-45");
      xyzRef.classList.toggle("py-2");
    }
  }, []);

  const AddHandler = useCallback(
    (e: MouseEvent, bol: boolean = false) => {
      console.log("d");

      const parent = e.currentTarget.parentElement
        ?.parentElement as HTMLElement;
      const target = bol ? parent : (e.currentTarget as HTMLElement);
      const children = target.children;
      target.classList.toggle("bg-slate-200/80");
      target.classList.toggle("bg-tertiary/95");
      target.classList.toggle("w-fit");
      children[0].classList.toggle("flex");
      children[0].classList.toggle("hidden");
      children[1].classList.toggle("hidden");
      children[1].classList.toggle("flex");
      setShow((prev) => !prev);
    },
    [setShow],
  );

  return (
    <PagesContainer title="Payment Methods" backLink="/">
      <div className="flex flex-col gap-1 py-5">
        <div
          onClick={clickHandler}
          className="flex items-center justify-between bg-slate-200/80 py-1 pl-3 pr-5"
        >
          <div className="flex items-center gap-2">
            <span className="size-[10vw]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
              >
                <polygon fill="#388e3c" points="29,4 18,45 40,24"></polygon>
                <polygon fill="#f57c00" points="21,3 10,44 32,23"></polygon>
              </svg>
            </span>
            <span className="text-base">UPI</span>
          </div>
          <i id="plus" className="fa-solid fa-plus text-xl text-tertiary"></i>
        </div>
        <div className="upi grid grid-cols-1 grid-rows-[0fr]">
          <div className="flex flex-col gap-2 overflow-hidden px-8 transition-all duration-200 ease-in-out">
            <div className="card flex items-center justify-between rounded-lg bg-slate-200/80 p-3 text-base">
              <span>8745466666@upi.okbank</span>
              <i className="fa-regular fa-trash-can text-xl text-red-500"></i>
            </div>
            <div
              onClick={show ? undefined : AddHandler}
              className="add w-fit gap-2 rounded-lg bg-slate-200/80 p-3 text-base"
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-plus text-xl text-tertiary"></i>
                <span>Add New</span>
              </span>
              <form className="relative hidden flex-col gap-3 text-white">
                <button
                  onClick={(e) => AddHandler(e, true)}
                  type="button"
                  className="absolute -right-6 -top-6 grid size-8 place-items-center rounded-full border border-tertiary bg-white text-xl text-tertiary"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
                <label htmlFor="upi">Enter your UPI</label>
                <input
                  type="text"
                  id="upi"
                  placeholder="Enter your UPI"
                  className="rounded-lg bg-white p-2 text-base text-tertiary"
                />
                <button
                  type="button"
                  className="mx-auto w-full rounded-lg bg-secondary p-2 font-bold text-tertiary shadow-md"
                >
                  Add UPI
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          onClick={clickHandler}
          className="flex items-center justify-between bg-slate-200/80 py-1 pl-3 pr-5"
        >
          <div className="flex items-center gap-2">
            <span className="grid size-[10vw] place-items-center">
              <i className="fa-regular fa-credit-card text-2xl text-tertiary"></i>
            </span>
            <span className="text-base">Credit / Debit Card</span>
          </div>
          <i id="plus" className="fa-solid fa-plus text-xl text-tertiary"></i>
        </div>
        <div className="credit-card grid grid-cols-1 grid-rows-[0fr]">
          <div className="flex flex-col gap-2 overflow-hidden px-8 transition-all duration-200 ease-in-out">
            <div className="card flex items-center justify-between rounded-lg bg-slate-200/80 p-3 text-base">
              <span className="my-auto text-tertiary">VISA</span> XXXX XXXX XXXX
              1234
              <i className="fa-regular fa-trash-can text-xl text-red-500"></i>
            </div>
            <div
              onClick={show ? undefined : AddHandler}
              className="add w-fit gap-3 rounded-lg bg-slate-200/80 p-4 text-base"
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-plus text-xl text-tertiary"></i>
                <span>Add New</span>
              </span>
              <form className="relative hidden flex-col gap-3">
                <button
                  onClick={(e) => AddHandler(e, true)}
                  type="button"
                  className="absolute -right-6 -top-6 grid size-8 place-items-center rounded-full border border-tertiary bg-white text-xl text-tertiary"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="rounded-lg bg-white p-2 text-base"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="rounded-lg bg-white p-2 text-base"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-2/4 rounded-lg bg-white p-2 text-base"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-2/4 rounded-lg bg-white p-2 text-base"
                  />
                </div>
                <button
                  type="button"
                  className="mx-auto w-full rounded-lg bg-secondary p-2 font-bold text-tertiary shadow-md"
                >
                  Add Card
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          onClick={clickHandler}
          className="flex items-center justify-between bg-slate-200/80 py-1 pl-3 pr-5"
        >
          <div className="flex items-center gap-2">
            <span className="grid size-[10vw] place-items-center">
              <i className="fa-regular fa-building-columns text-2xl text-tertiary"></i>
            </span>
            <span className="text-base">Bank Transfer</span>
          </div>
          <i id="plus" className="fa-solid fa-plus text-xl text-tertiary"></i>
        </div>
        <div className="credit-card grid grid-cols-1 grid-rows-[0fr]">
          <div className="flex flex-col gap-2 overflow-hidden px-8 transition-all duration-200 ease-in-out">
            {BankData.banks.map((data, index) => (
              <React.Fragment key={index}>
                <div className="card flex w-fit items-center justify-between rounded-lg bg-tertiary p-2 text-base font-bold">
                  <span className="my-auto text-white">{data.title} :-</span>
                </div>

                {data.content.map((content, index) => (
                  <Link
                    to={content.website}
                    target="_blank"
                    key={index}
                    className="card flex items-center justify-between rounded-lg bg-slate-200/80 p-2 text-base font-bold"
                  >
                    <img
                      src={content.icon}
                      loading="lazy"
                      alt={content.name}
                      className="size-[8vw]"
                    />
                    <span className="line-clamp-1 text-base text-tertiary">
                      {content.name}
                    </span>
                  </Link>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </PagesContainer>
  );
};

export default PaymentMethods;
