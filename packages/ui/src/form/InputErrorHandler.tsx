import { FieldErrors, FieldValues } from "react-hook-form";
import { cn } from "../utils.js";

export const getValuebyPath = (obj: any, path: string) => {
    return path.split(".").reduce((acc, el) => {
        if (acc && el in acc) {
            return acc[el];
        }
        return undefined; // Return undefined if the path is invalid
    }, obj);
};

interface InputErrorhandlerProps<T extends FieldValues = FieldValues> {
    errors?: FieldErrors<T>;
    name: string | undefined;
    className?: string;
}

export const InputErrorhandler = <T extends FieldValues,>({ errors, name, className }: InputErrorhandlerProps<T>) => {
    const value = getValuebyPath(errors, name!);
    return (
        <>
            {value && (
                <div className={cn(className, "text-sm text-red-500 mt-1")}>
                    {value.message}
                </div>
            )}
        </>
    );
};

