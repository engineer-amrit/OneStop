import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputErrorhandler } from "@ui/lib/src/form/InputErrorHandler";
import { ControllerRenderProps, FieldErrors, FieldValues } from "react-hook-form";

interface TagInput<T extends FieldValues> extends ControllerRenderProps {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  name: string;
  placeholder?: string;
  errors: FieldErrors<T>
}

const TagsInput = <T extends FieldValues,>({ label, value, onChange, name, placeholder, errors }: TagInput<T>) => {

  // Handle the addition of tags when pressing Enter or comma
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const tags = event.currentTarget.value
        .split(",")
        .filter((tag) => tag.trim() !== "" && !value?.includes(tag))
        .map((tag) => tag.trim());

      onChange([...(value || []), ...tags]); // Update the tags array by adding the new tag
      event.currentTarget.value = ""; // Clear the input field
    }
  };

  // Handle tag removal
  const handleTagRemove = (index: number) => {
    const updatedTags = value.filter((_, tagIndex) => tagIndex !== index);
    onChange(updatedTags); // Update the tags array by removing the tag at the given index
  };

  return (
    <div className="flex h-fit w-full flex-col gap-4">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <div>
        <div className="flex flex-wrap gap-2 rounded-md p-2 outline outline-border">
          <Input
            id={name}
            title={label}
            name={name}
            type="text"
            onBlur={(e) => {
              const tags = e.currentTarget.value
                .split(",")
                .filter((tag) => tag.trim() !== "" && !value?.includes(tag))
                .map((tag) => tag.trim());
              onChange([...(value || []), ...tags]);
              e.currentTarget.value = "";
            }}
            className="w-full border outline-none"
            onKeyDown={handleKeyDown} // Trigger tag addition on key press
            placeholder={placeholder}
          />

          {value?.map((item: string, index: number) => (
            <Badge
              key={index}
              className="group flex items-center gap-1 text-xs hover:scale-110 transition-all"
            >
              {item}
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => handleTagRemove(index)} // Handle tag removal
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </Badge>
          ))}
        </div>
        <span className="text-xs text-gray-500">
          Separate tags with commas or press Enter
        </span>
      </div>
      <InputErrorhandler errors={errors} name={name} />
    </div>
  );
};

export default TagsInput;
