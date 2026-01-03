import { FilterFields } from "@/mock/mock-filter-form";
import type { FilterField } from "@/mock/mock-filter-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type { FilterData } from "./zodSchema";
import { FilterSchema } from "./zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const getClass = ({ type, name }: FilterField) => {
  if (type === "range" || name === "rating") {
    return "col-span-2";
  }
};
const FilterForm = ({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosInstance
      .get("/get-categories")
      .then((res) => {
        const data = {
          category: res.data.categories as string[],
          subCategory: res.data.subCategories as string[],
          unit: res.data.units as string[],
        };

        // Ensure keys are in the expected order before looping
        for (const key in data) {
          const F_options = FilterFields.find(
            (field) => field.name === key,
          )?.options;
          data[key as keyof typeof data]?.forEach((o: string) => {
            const option = o.toLowerCase();
            if (!F_options?.includes(option)) {
              F_options?.push(option);
            }
          });
        }
      }).finally(() => {
        setLoading(false)
      }
      )
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { price_max, price_min, ...rest } = Object.fromEntries(searchParams.entries());
  const values = { ...rest, price: { max: parseFloat(price_max), min: parseFloat(price_min) } }

  const navigate = useNavigate();
  const { register, handleSubmit, } = useForm<FilterData>({
    resolver: zodResolver(FilterSchema),
    defaultValues: values
  });



  const onsubmit = (data: FilterData) => {
    // Step 1: Filter out undefined values from main object
    const filteredData: Record<string, string> = {};

    // Loop over data to check for undefined values and add only defined values to filteredData
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FilterData];

      if (!value) return;  // Skip undefined values

      // Handle price object separately
      if (key === 'price' && typeof value === 'object' && value !== null) {
        const { min, max } = value as { min?: number; max?: number };
        if (min !== undefined) filteredData['price_min'] = min.toString();
        if (max !== undefined) filteredData['price_max'] = max.toString();
      } else {
        // Handle all other fields
        if (value instanceof Date) {
          filteredData[key] = value.toISOString();
        } else if (typeof value === 'object' && value !== null) {
          // Skip if it's an object (like the price object)
        } else {
          filteredData[key] = value;
        }
      }
    });


    // Step 3: Convert filteredData to query string
    const entries = Object.entries(filteredData);
    const queryString = new URLSearchParams(entries).toString();


    // Step 4: Navigate with the filtered query string
    if (queryString) navigate(`?${queryString}`);

    // Optionally, trigger the button click
    buttonRef.current?.click();
  };
  if (!loading) return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onsubmit)}
      className="my-4 grid grid-cols-2 gap-[min(1.25rem,3.764705882352941vw)] text-sm"
    >
      {FilterFields.map((field) => {
        const validname = field.name as keyof FilterData;
        return <div
          key={field.name}
          className={`flex flex-col gap-2 ${getClass(field)}`}
        >
          {field.type !== "button" && (
            <label htmlFor={field.name} className="font-medium">
              {field.label}
            </label>
          )}
          {field.type === "dropdown" && (
            <select
              {...register(validname)}
              id={field.name}
              className="w-full h-8 rounded-md border p-2 text-tertiary"
            >
              <option value="">Select</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {field.type === "range" && (
            <div className="flex items-center gap-2">
              <Input
                {...register(
                  (validname + ".min") as keyof FilterData,
                  {
                    setValueAs: (value) =>
                      value === "" || isNaN(value) ? undefined : parseFloat(value), // Convert empty to undefined
                  }
                )}
                type="number"
                id="price"
                className="rounded-md border p-2 placeholder:text-sm"
                placeholder='Min "Price"'
                min={field.min}
                max={field.max}
              />
              <i className="text-center">To</i>
              <Input
                {...register(
                  (validname + ".max") as keyof FilterData, {
                  setValueAs: (value) =>
                    value === "" || isNaN(value) ? undefined : parseFloat(value), // Convert empty to undefined
                }
                )}
                type="number"
                id="max"
                className="rounded-md border p-2 placeholder:text-sm"
                placeholder='Max "Price"'
                min={field.min}
                max={field.max}
              />
            </div>
          )}

          {field.type === "button" && (
            <Button
              onClick={
                field.name === "reset"
                  ? () => {
                    buttonRef.current?.click();
                    navigate(location.pathname, { replace: true }); // Navigates to the clean URL

                  }
                  : undefined
              }
              type={field.name === "reset" ? "reset" : "submit"}
              variant={field.variant}
              className={
                "w-[80%]" + (field.name === "filter" ? " ml-auto" : "")
              }
            >
              {field.label}
            </Button>
          )}
        </div>
      })}
    </form>
  );
};

export default FilterForm;
