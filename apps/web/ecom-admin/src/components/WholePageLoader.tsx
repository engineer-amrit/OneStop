import { HashLoader } from "react-spinners";

// Define the WholePageLoader component
const WholePageLoader = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 grid h-svh w-svw place-items-center bg-background">
            <HashLoader color="white" size={80} loading={true} />
        </div>
    );
};
export default WholePageLoader;

