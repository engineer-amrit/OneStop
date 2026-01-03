import { useParams } from "react-router-dom";
import PagesContainer from "../../components/client/PagesContainer";
import AddressCard from "../../components/client/AddressCard";

const Order_Details = () => {
  const { _id } = useParams();
  console.log(_id);

  const data = {
    name: "Rohit",
    landmark: "back side of khalsa school",
    street1: "chouhan nagar ward no. 20",
    street2: "",
    state: "Haryana",
    city: "Charkhi Dadri",
    pin: "125694",
    phone: "+91 1234567890",
  };

  return (
    <PagesContainer title="Order Details" backLink="/orders">
      <div className="flex flex-1 flex-col gap-5 px-3 py-4">
        <div className="progress-bar relative flex justify-between text-sm">
          <div className="line absolute left-[5.5vw] top-[22%] z-[-1] h-1 w-[48vw] -translate-y-[22%] bg-secondary"></div>
          <div className="line absolute right-[5.5vw] top-[22%] z-[-1] h-1 w-[35vw] -translate-y-[22%] bg-slate-300"></div>

          <div className="flex flex-col items-center">
            <span className="grid h-[8vw] w-[8vw] place-items-center rounded-full bg-secondary text-[min(1.4rem,5.30vw)] text-white">
              <i className="fa-solid fa-check"></i>
            </span>
            <span className="mt-2 text-gray-500">Packing</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="grid h-[8vw] w-[8vw] place-items-center rounded-full bg-secondary text-[min(1.4rem,5.30vw)] text-white">
              <i className="fa-solid fa-check"></i>
            </span>
            <span className="mt-2 text-gray-500">Shipping</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="grid h-[8vw] w-[8vw] place-items-center rounded-full bg-slate-300 text-[min(1.4rem,5.30vw)] text-white">
              <i className="fa-solid fa-check"></i>
            </span>
            <span className="mt-2 text-gray-500">Arriving</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="grid h-[8vw] w-[8vw] place-items-center rounded-full bg-slate-300 text-[min(1.4rem,5.30vw)] text-white">
              <i className="fa-solid fa-check"></i>
            </span>
            <span className="mt-2 text-gray-500">Success</span>
          </div>
        </div>
        <div>
          <h1 className="mb-4 text-lg font-semibold">Products</h1>
          <div className="list flex flex-col gap-4">
            <div className="card flex min-h-20 items-center gap-[8vw] rounded-lg p-5 outline outline-1 outline-slate-200">
              <div className="img h-[20vw] w-[15vw] outline outline-1 outline-slate-200"></div>
              <div className="flex flex-1 flex-col gap-2">
                <h1 className="text-base font-semibold">Product Name</h1>
                <span className="text-sm">Quantity: 2 Bag</span>
                <span className="text-lg font-bold text-d-green">
                  &#8377; 100
                </span>
              </div>
            </div>
            <div className="card flex min-h-20 items-center gap-[8vw] rounded-lg p-5 outline outline-1 outline-slate-200">
              <div className="img h-[20vw] w-[15vw] outline outline-1 outline-slate-200"></div>
              <div className="flex flex-1 flex-col gap-2">
                <h1 className="text-[min(1.1rem,4.14vw)] font-bold">
                  Product Name
                </h1>
                <span className="text-[min(0.95rem,3.60vw)]">
                  Quantity: 2 Bag
                </span>
                <span className="text-[min(1.1rem,4.14vw)] font-bold text-d-green">
                  &#8377; 100
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="all">
          <h1 className="text-lg font-semibold">Address</h1>
          <AddressCard data={data} show={true} />
        </div>

        <div className="all">
          <h1 className="text-lg font-semibold">Payment Details</h1>
          <div className="card mt-4 w-full rounded-xl px-3 text-base shadow-lg outline outline-1 outline-slate-300">
            <div className="flex flex-col gap-[1vw] py-3 capitalize text-tertiary/85">
              <div className="flex justify-between">
                <span>Items (2)</span>
                <span className="font-semibold text-tertiary">
                  &#8377; 1500
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="font-semibold text-d-green">
                  - &#8377; 900
                </span>
              </div>
              <div className="flex justify-between">
                <span>Coupon</span>
                <span className="font-semibold text-tertiary">
                  - &#8377; 10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <del className="font-semibold text-tertiary">&#8377; 450</del>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-5 border-t-2 border-dashed border-slate-400 py-2 text-lg font-bold">
              <span className="cursor-pointer text-tertiary">Total</span>
              <span className="cursor-pointer text-d-green">&#8377; 1200</span>
            </div>
          </div>
        </div>

        <h1 className="mx-2 text-right text-xl font-bold text-d-green">
          You saved &#8377; 910
        </h1>

        <span className="mx-auto mb-3 w-fit rounded-lg bg-secondary p-2 px-3 text-lg font-bold text-tertiary">
          We will keep Your updated
        </span>
      </div>
    </PagesContainer>
  );
};

export default Order_Details;
