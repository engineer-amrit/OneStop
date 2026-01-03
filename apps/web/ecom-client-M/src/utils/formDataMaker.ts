import type { FormDataAcceptable } from "@/hooks/tanStack/useUpsertData";

export const FormDataMaker = <T extends FormDataAcceptable>(
    data: T
) => {
    const formData = new FormData();

    for (const key in data) {
        const value = data[key as keyof T];

        if (Array.isArray(value)) {
            // Handle File or Blob arrays (e.g., images)
            if (["thumbnail", "sideImages", "banner"].includes(key)) {
                value.forEach((file) => {
                    formData.append(key, file);
                });
            } else {
                // Handle string arrays
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, String(item));
                });
            }
        } else if (typeof value === "object" && value !== null) {
            // Handle nested object (e.g., "validity")
            for (const k in value) {
                formData.append(
                    `${key}[${k}]`,
                    String(value[k as keyof typeof value])
                );
            }
        } else {
            // Handle primitive types
            formData.append(key, String(value));
        }
    }

    return formData;
};