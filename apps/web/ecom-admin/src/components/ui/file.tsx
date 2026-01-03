import { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PreviewPortal } from "../common/PreviewComp";
import { ControllerRenderProps, FieldErrors, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const getArray = (v: File[] | File | undefined): File[] => {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

interface FileInputProps<T extends FieldValues> extends ControllerRenderProps {
  className?: string;
  multiple?: boolean;
  accept?: string;
  capture?: boolean | "user" | "environment";
  label?: string;
  errors?: FieldErrors<T>;
  value: File[] | File | undefined;
  required?: boolean;
  onChange: (files: File[] | File) => void;
}

const getFileIcon = (ext?: string) => {
  switch (ext) {
    case "pdf":
      return <i className="fas fa-file-pdf text-red-500 text-4xl"></i>;
    case "doc":
    case "docx":
      return <i className="fas fa-file-word text-blue-500 text-4xl"></i>;
    case "xls":
    case "xlsx":
      return <i className="fas fa-file-excel text-green-500 text-4xl"></i>;
    case "zip":
    case "rar":
      return (
        <i className="fas fa-file-archive text-yellow-500 text-4xl"></i>
      );
    case "txt":
      return <i className="fas fa-file-alt text-gray-500 text-4xl"></i>;
    default:
      return <i className="fas fa-file text-gray-400 text-4xl"></i>;
  }
};

const File =
  <T extends FieldValues>({ onChange, value, multiple, label, required, className, errors, ...rest }: FileInputProps<T>) => {
    const [expand, setExpand] = useState<File | undefined>();


    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        const newFiles = multiple ? [...filesArray, ...getArray(value)] : filesArray[0];

        onChange(newFiles);
        // Clear the Input value
        // e.target.value = "";
      },
      [onChange, multiple, value],
    );
    const removeFile = useCallback(
      (index: number) => {
        const newFiles = getArray(value);
        if (!newFiles) return;
        newFiles.splice(index, 1);
        if (onChange) {
          onChange(newFiles);
        }
      },
      [onChange, value],
    );


    return (

      <>
        {expand && (
          <PreviewPortal>
            <div style={{
              isolation: "isolate"
            }} className="fixed inset-0 flex z-9999 items-center justify-center bg-black/80 !important">
              <img
                src={URL.createObjectURL(expand)}
                alt="expand"
                className="max-h-[90%] max-w-[90%] object-contain"
              />
              <Button
                onClick={() => {
                  setExpand(undefined);
                }}
                className="absolute right-2 top-2"
                variant={"destructive"}
              >
                Close
              </Button>
            </div>
          </PreviewPortal >
        )}


        {
          (multiple || !getArray(value)[0]) && (
            <div className="size-fit space-y-2 grid text-center">
              {label && (
                <Label className="capitalize" htmlFor={rest.name}>
                  {label}
                  {required && <span className="text-red-500 ml-0.5">*</span>}
                </Label>
              )}

              <label
                data-state={errors?.[rest.name] ? "error" : "normal"}
                className={cn("box-border grid  cursor-pointer place-items-center rounded-lg border-3 border-dashed  data-[state=normal]:border-white/50 data-[state=error]:border-red-600", className)}

              >
                <Input
                  id={rest.name}
                  type="file"
                  hidden
                  multiple={multiple}
                  {...rest}
                  onChange={handleChange} // Handle the file change event
                />
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="size-8"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 312.602 312.602"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill={errors?.[rest.name] ? "red" : "white"}
                        d="M251.52,137.244c-3.966,0-7.889,0.38-11.738,1.134c-1.756-47.268-40.758-85.181-88.448-85.181 c-43.856,0-80.964,32.449-87.474,75.106C28.501,129.167,0,158.201,0,193.764c0,36.106,29.374,65.48,65.48,65.48h54.782 c4.143,0,7.5-3.357,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5H65.48c-27.835,0-50.48-22.645-50.48-50.48c0-27.835,22.646-50.48,50.48-50.48 c1.367,0,2.813,0.067,4.419,0.206l7.6,0.658l0.529-7.61c2.661-38.322,34.861-68.341,73.306-68.341 c40.533,0,73.51,32.977,73.51,73.51c0,1.863-0.089,3.855-0.272,6.088l-0.983,11.968l11.186-4.367 c5.356-2.091,10.99-3.151,16.747-3.151c25.409,0,46.081,20.672,46.081,46.081c0,25.408-20.672,46.08-46.081,46.08 c-0.668,0-20.608-0.04-40.467-0.08c-19.714-0.04-39.347-0.08-39.999-0.08c-4.668,0-7.108-2.248-7.254-6.681v-80.959l8.139,9.667 c2.667,3.17,7.399,3.576,10.567,0.907c3.169-2.667,3.575-7.398,0.907-10.567l-18.037-21.427c-2.272-2.699-5.537-4.247-8.958-4.247 c-3.421,0-6.686,1.548-8.957,4.247l-18.037,21.427c-2.668,3.169-2.262,7.9,0.907,10.567c1.407,1.185,3.121,1.763,4.826,1.763 c2.137,0,4.258-0.908,5.741-2.67l7.901-9.386v80.751c0,8.686,5.927,21.607,22.254,21.607c0.652,0,20.27,0.04,39.968,0.079 c19.874,0.041,39.829,0.081,40.498,0.081c33.681,0,61.081-27.4,61.081-61.08C312.602,164.644,285.201,137.244,251.52,137.244z"
                      ></path>
                    </g>
                  </svg>
                  <p
                    data-state={errors?.[rest.name] ? "error" : "normal"}
                    className="text-nowrap text-sm
                  data-[state=error]:text-red-600 data-[state=normal]:text-white
                  ">Upload</p>
                </div>

              </label>
            </div>
          )
        }

        {/* File Previews */}
        {getArray(value).map((file, index) => {
          const isImage = file.type.startsWith("image/");
          const ext = file.name.split(".").pop()?.toLowerCase();

          return (
            <div
              className={`space-y-2 grid text-center ${multiple ? "mt-auto" : ""}`}
              key={index}
            >
              {!multiple && <Label className="capitalize">{label}</Label>}

              <div
                className={`card group relative  ${className} rounded-lg bg-white/20 text-black`}
                title={isImage ? "click to view" : file.name}
              >
                <div
                  onClick={() => isImage && setExpand(file)}
                  className={`absolute rounded-lg inset-0 bg-black/40 md:opacity-0 md:group-hover:opacity-100 ${isImage ? "cursor-pointer" : ""
                    }`}
                ></div>

                <i
                  onClick={() => removeFile(index)}
                  title="remove"
                  className="fas fa-times absolute right-1 top-1 cursor-pointer text-white md:hidden md:group-hover:block"
                ></i>

                {isImage ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className={`size-full object-contain rounded-lg`}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center ">
                    {getFileIcon(ext)}
                    <p className="mt-2 text-xs text-white">
                      {file.name.slice(0, 9)}{file.name.length > 10 ? "..." : ""}
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </>
    );
  };

export default File;
