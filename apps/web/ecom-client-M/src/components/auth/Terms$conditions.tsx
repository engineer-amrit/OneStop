import { Link } from "react-router-dom";

const Terms$conditions = () => {
  return (
    <div className="text-center font-sans text-[3.8vw] sm:text-sm">
      <h4 className="font-medium">By continuing you agree to our</h4>
      <Link
        to="/terms&conditions"
        className="border-b border-tertiary text-[3.2vw] font-semibold sm:text-xs"
      >
        Terms of use & Privacy policy
      </Link>
    </div>
  );
};

export default Terms$conditions;
