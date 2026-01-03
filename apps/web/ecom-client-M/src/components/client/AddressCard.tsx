type Data = {
  name: string;
  landmark: string;
  street1: string;
  street2: string;
  state: string;
  pin: string;
  phone: string;
};
interface AddressCardProps {
  data: Data;
  isDefault?: boolean;
  show?: boolean;
}
const AddressCard = ({ data, isDefault, show }: AddressCardProps) => {
  return (
    <div className="card mt-4 w-full rounded-lg px-3 pt-2 text-base shadow-lg outline outline-1 outline-slate-300">
      <div className="flex flex-col pb-3 text-tertiary">
        {isDefault && (
          <span className="w-fit rounded-sm bg-green-400 px-[min(0.5rem,1.88vw)] py-[min(0.25rem,0.94vw)] text-lg font-bold text-white">
            Default
          </span>
        )}
        <span className="name mt-2 text-lg font-bold text-black">
          {data.name}
        </span>
        <span className="landmark">{data.landmark}</span>
        <span className="street1">{data.street1}</span>
        <span className="street2">{data.street2}</span>
        <span className="state-pin">
          {data.state}, India - {data.pin}
        </span>
        <span className="phone mt-2">
          Phone : <i className="font-semibold not-italic">{data.phone}</i>
        </span>
      </div>
      <div className="flex w-full items-center gap-5 border-t-2 border-slate-300 py-2 text-lg font-bold">
        <span className="cursor-pointer text-red-500">Delete</span>
        <span className="cursor-pointer text-tertiary">Edit</span>
        {!isDefault && !show && (
          <span className="cursor-pointer text-tertiary">Mark as Default</span>
        )}{" "}
      </div>
    </div>
  );
};

export default AddressCard;
