import type { UserFormField } from "@/mock/mock-user-form";
import InputErrorhandler, { getValuebyPath } from "../common/InputErrorhandler";
import { ChangeEvent } from "react";
import { UserFormData } from "./zodSchema";
import {
  UseFormRegister,
  UseFormClearErrors,
  FieldErrors,
} from "react-hook-form";

interface FormFeildsProps {
  field: UserFormField;
  register: UseFormRegister<UserFormData>;
  errors: FieldErrors<UserFormData>;
  clearErrors: UseFormClearErrors<UserFormData>;
}

const getclass = (name: string) => {
  const half = ["address.state", "address.pincode"];
  if (half.includes(name)) return "w-1/4 flex-grow";
  else return "w-full";
};

const FormFeilds = (props: FormFeildsProps) => {
  const { field, register, errors, clearErrors } = props;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTimeout(() => {
        clearErrors(field.name);
      }, 0);
    }
  };

  const getname = () => {
    const dob = ["day", "month", "year"];
    for (const element of dob) {
      if (errors.dob?.[element as keyof typeof errors.dob])
        return `dob.${element}`;
    }
    return "dob";
  };

  const styleError = (name: keyof UserFormData) => {
    const v = getValuebyPath(errors, name);

    return {
      borderColor: v && "red",
      outlineColor: v && "red",
    };
  };


  switch (field.type) {
    case "dob":
      return (
        <div className="grid w-full gap-2 h-fit font-bold">
          <span className="text-[4vw] sm:text-base">Date of Birth<i className="text-red-600">*</i></span>
          <p className="text-[3.5vw] text-slate-500 sm:text-sm">
            Please use format DD/MM/YYYY
          </p>

          <div className="input-container_2 grid w-full grid-cols-3 gap-[8vw] sm:gap-5">
            {field.field?.map((el, index) => {
              if (el.name)
                return (
                  <input
                    key={index}
                    style={styleError(el.name as keyof UserFormData)}
                    type={el.type}
                    className="text-center"
                    placeholder={el.placeholder}
                    {...register(el.name, {
                      valueAsNumber: true,
                    })}
                  />
                );
            })}
          </div>
          <InputErrorhandler errors={errors} name={getname()} />
        </div>
      );
    case "checkbox":
      return (
        <label className="flex w-full items-center gap-2">
          <input
            type="checkbox"
            className="scale-125"
            {...register(field.name as keyof UserFormData)}
          />
          <span className="text-[4vw] sm:text-sm">
            Also use this default for delivery address{" "}
          </span>
        </label>
      );
  }

  return (
    <>
      <div className={`input-container_2 grid gap-1 ${getclass(field.name as keyof UserFormData)}`}>
        <label htmlFor={field.name}>
          {field.label}
          {!["address.streetAddress2", "email"].includes(String(field.name)) && (
            <span className="text-red-500">*</span>
          )}
          <InputErrorhandler errors={errors} name={field.name} />
        </label>
        {["text", "email"].includes(field.type) && (
          <input
            style={styleError(field.name as keyof UserFormData)}
            autoComplete="on"
            id={field.name}
            type={field.type}
            onInput={handleInput}
            {...register(field.name as keyof UserFormData)}
          />
        )}
      </div>
    </>
  );
};

export default FormFeilds;
