import AddressCard from "../../components/client/AddressCard";
import PagesContainer from "../../components/client/PagesContainer";

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

const Addresses = () => {
  return (
    <PagesContainer title="Addresses" backLink="/">
      <div className="my-5 flex flex-1 flex-col gap-5">
        <div className="default px-[min(1.25rem,4.6vw)]">
          <h1 className="text-lg font-semibold">Default Address</h1>
          <AddressCard data={data} isDefault={true} />
        </div>
        <div className="all px-[min(1.25rem,4.6vw)]">
          <h1 className="text-lg font-semibold">All Address</h1>
          <AddressCard data={data} />
        </div>
      </div>
    </PagesContainer>
  );
};

export default Addresses;
