import { HashLoader } from "react-spinners";

// Define the WholePageLoader component
const WholePageLoader = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 grid h-svh w-svw place-items-center bg-white">
      <HashLoader color="#facc15" size={80} loading={true} />
    </div>
  );
};
export default WholePageLoader;
