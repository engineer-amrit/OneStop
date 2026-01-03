import { UseFormSetValue } from "react-hook-form";
export const TelFormHandler = (
  telwatch: string,
  setValue: UseFormSetValue<{
    phone: string;
  }>,
  areaCode: string,
) => {
  if (telwatch) {
    const inputElement = document.querySelector(
      'input[name="phone"]',
    ) as HTMLInputElement;

    const cursorPosition = inputElement?.selectionStart || 0;

    //     // Step 1: Normalize input by removing non-digit characters
    let cleaned = telwatch.replace(/\D+/g, "");
    const code = areaCode.replace(/\D+/g, "");

    //     // Step 2: adding 91 if not present
    if (!cleaned.startsWith(code)) {
      cleaned = code + cleaned;
    }

    //     // Step 3: Format number (optional) - add hyphen after 5th digit for readability
    if (cleaned.length > 7 && code === "91") {
      cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7);
    } else if (cleaned.length > 6 && code === "1") {
      cleaned = cleaned.slice(0, 6) + "-" + cleaned.slice(6);
    }

    //     // Step 4: Prepend "+" and space if not present
    switch (code) {
      case "91":
        cleaned = "+" + cleaned.slice(0, 2) + " " + cleaned.slice(2);
        //     // Step 6: limit to 15 characters
        cleaned = cleaned.slice(0, 15);
        break;
      case "1":
        cleaned = "+" + cleaned.slice(0, 1) + " " + cleaned.slice(1);
        //     // Step 6: limit to 14 characters
        cleaned = cleaned.slice(0, 14);
        break;
    }
    //     // Step 7: Update the state
    if (telwatch !== cleaned) {
      setValue("phone", cleaned);

      // Restore the cursor position
      setTimeout(() => {
        if (inputElement) {
          const offset = cleaned.length - telwatch.length;
          inputElement.setSelectionRange(
            cursorPosition + offset,
            cursorPosition + offset,
          );
        }
      }, 0);
    }
  }
};
