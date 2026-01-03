import { Input } from "@/components/ui/input";
import { Label } from "./label";
import React, { useEffect } from "react";
import { FieldErrors, FieldValues, ControllerRenderProps } from "react-hook-form";
import { InputErrorhandler } from "@ui/lib";
import { cn } from "@/lib/utils";

type SufixProps = {
  sufix: string;
  isnumber: true;
  value: number | undefined;
  onChange: (value: number) => void;
} | {
  sufix?: undefined;
  isnumber?: false;
  value: string | undefined;
  onChange: (value: string) => void;
}
interface Props<T extends FieldValues> extends ControllerRenderProps {
  className?: string;
  label?: string;
  errors?: FieldErrors<T>;
  required?: boolean;
  options?: string[];
  others?: boolean;
}

type DropdownProps<T extends FieldValues> = Props<T> & SufixProps;

const Dropdown = <T extends FieldValues,>({
  value,
  onChange,
  label,
  name,
  disabled,
  options,
  others,
  className,
  required,
  sufix,
  isnumber,
  errors,
  ref
}: DropdownProps<T>) => {
  const [localOptions, setLocalOptions] = React.useState<string[]>([]);
  useEffect(() => {
    if (options)
      setLocalOptions(options);
  }, [options]);
  const isOthers = !isnumber && value === "others" || isnumber && value === -1;

  const inputHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    if (!newValue) return onChange("");

    setLocalOptions(prev => prev.includes(newValue) ? prev : [...prev, newValue]);

    if (isnumber) {
      onChange(Number(newValue));
    } else {
      onChange(newValue);
    }

    e.target.value = "";
  };
  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    if (isnumber && val !== "") {
      onChange(Number(val));
    } else {
      onChange(val);
    }
  };

  return (
    <div className={cn("grid gap-2 p-1 box-border", className)}>
      <Label htmlFor={name} className="capitalize">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Input
        hidden={!isOthers}
        id={name + "_input"}
        type="text"
        defaultValue={""}
        onBlur={inputHandler}
        className="w-full"
        placeholder="Enter value"
      />
      <select
        hidden={isOthers}
        ref={ref}
        name={name}
        title={label}
        value={value == null ? "" : String(value)}
        disabled={disabled}
        onChange={selectValue}
        id={name}
        className="peer rounded-md bg-white p-0.5 text-base capitalize text-black disabled:opacity-50 h-8  w-full box-border "
      >
        <option value="">Select</option>
        {localOptions
          .map(option => (
            <option key={option} value={option}>
              {option} {sufix ? sufix : ""}
            </option>
          ))}
        {others && !localOptions.includes("others") && (
          <option value={isnumber ? -1 : "others"}>
            others
          </option>
        )}
      </select>
      <InputErrorhandler errors={errors} name={name} />
    </div>
  );
};


export default Dropdown;
