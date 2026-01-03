import { FieldErrors } from "react-hook-form";

export const getValuebyPath = (obj: any, path: string) => {
  return path.split(".").reduce((acc, el) => {
    if (acc && el in acc) {
      return acc[el];
    }
    return undefined; // Return undefined if the path is invalid
  }, obj);
};

interface InputErrorhandlerProps {
  errors: FieldErrors;
  name: string | undefined;
}

const InputErrorhandler = ({ errors, name }: InputErrorhandlerProps) => {
  const value = getValuebyPath(errors, name!);
  return (
    <>
      {value && (
        <div className="inline text-xs font-semibold text-red-500 first-letter:capitalize">
          {value.message}
        </div>
      )}
    </>
  );
};

export default InputErrorhandler;
