import { UserFormData } from "@/components/auth/zodSchema";
import { Path } from "react-hook-form";

interface BaseFeild {
  name?: Path<UserFormData>;
  label?: string;
  type: string;
  placeholder?: string;
}

export type UserFormField = BaseFeild & { field?: BaseFeild[] };

export const userFormFields: UserFormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    type: "dob",
    field: [
      {
        name: "dob.day",
        type: "number",
        placeholder: "DD",
      },
      {
        name: "dob.month",
        type: "number",
        placeholder: "MM",
      },
      {
        name: "dob.year",
        type: "number",
        placeholder: "YYYY",
      },
    ],
  },

  {
    name: "address.streetAddress1",
    label: "Street Address 1",
    type: "text",
  },
  {
    name: "address.streetAddress2",
    label: "Street Address 2",
    type: "text",
  },
  {
    name: "address.landmark",
    label: "Landmark",
    type: "text",
  },
  {
    name: "address.city",
    label: "City/Village",
    type: "text",
  },
  {
    name: "address.state",
    label: "State",
    type: "text",
  },
  {
    name: "address.pincode",
    label: "Pincode",
    type: "text",
  },
  {
    name: "address.useAsDeliveryAddress",
    label: "Use as delivery address",
    type: "checkbox",
  },
];
