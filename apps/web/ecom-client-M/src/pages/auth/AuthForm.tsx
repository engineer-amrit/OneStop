import { useForm } from "react-hook-form";
import InputErrorhandler from "../../components/common/InputErrorhandler";
import { useEffect, useCallback, useState } from "react";
import { TelFormHandler } from "../../components/common/TelFormHandler";
import { BeatLoader } from "react-spinners";
// import IndiaFlag from "../../components/common/IndiaFlag";
import OtpVerification from "../../components/auth/Otp";
import axiosInstance from "@/utils/axiosInstance";
import FormContainer from "../../components/auth/Form-Container";
import { CountryDropdown } from "@/components/ui/countryFlags";

interface Data {
  phone: string;
}

const Auth = () => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(true);
  const [areaCode, setAreaCode] = useState<string>("+91");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Data>({
    shouldFocusError: false,
  });

  // initial focus on phone input and handlers
  useEffect(() => {
    const phone = document.getElementById("phone");
    const handler = (e: Event) => {
      const event = e as KeyboardEvent;
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    if (phone) {
      (phone as HTMLInputElement).focus();
      phone.addEventListener("keydown", handler);
      phone.addEventListener("keyup", handler);
    }

    return () => {
      phone?.removeEventListener("keydown", handler);
      phone?.removeEventListener("keyup", handler);
    };
  }, []);

  useEffect(() => {
    setValue("phone", "");
  }, [areaCode, setValue]);

  // watch phone input and handle it
  useEffect(() => {
    const subscription = watch(({ phone = "" }) => {
      TelFormHandler(phone, setValue, areaCode);
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, areaCode]);

  // submit handler
  const onsubmit = useCallback(
    async (data: Data) => {
      await axiosInstance
        .post("/create-otp", data)
        .then(() => {
          setIsSubmitSuccessful(true);
        })
        .catch((e) => {
          setError("phone", {
            type: "manual",
            message: e.message,
          });
        });
    },
    [setError, setIsSubmitSuccessful],
  );

  // shake animation on error
  useEffect(() => {
    if (errors.phone) {
      const input = document.querySelector(".input-container");
      input?.classList.toggle("shake");
      setTimeout(() => {
        if (!input?.classList.contains("shake")) {
          input?.classList.toggle("shake");
        }
      }, 0);
    }
  }, [errors.phone]);

  return (
    <FormContainer>
      <div className="flex w-full flex-1 flex-col justify-evenly">
        {/* Header */}
        <div className="text-center font-sans text-tertiary">
          <h2 className="mb-1 text-[5.5vw] font-semibold sm:text-xl">
            {!isSubmitSuccessful
              ? "Enter your phone number"
              : "OTP Verification"}
          </h2>
          <p className="text-[3.4vw] sm:text-xs">
            {!isSubmitSuccessful
              ? "We will send you a one time password"
              : `Enter the OTP recieved on XXXXXX${watch("phone") ? watch("phone").slice(-4) : "123"
              }`}
          </p>
        </div>

        {/* phone form */}
        {!isSubmitSuccessful && (
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="grid w-full gap-12 px-4"
          >
            <div className="w-full">
              <div
                style={{
                  borderBottom: errors.phone && "1.5px solid red",
                }}
                className="input-container"
              >
                {/* country flag/IN*/}
                {/* <IndiaFlag /> */}
                <CountryDropdown
                  defaultValue="IND"
                  slim
                  onChange={(c) => {
                    setAreaCode(c.countryCallingCodes[0]);
                  }}
                />
                <input
                  autoComplete="on"
                  type="text"
                  id="phone"
                  placeholder={areaCode || "+91"}
                  className="input"
                  {...register("phone", {
                    required: "Phone number is required",
                    validate: (value) => {
                      const p = value.replace(/[+\s-]/g, ""); //
                      switch (areaCode) {
                        case "+91": {
                          if (p.length !== 12)
                            return 'Number should be 10 digits including "+91"';
                          break;
                        }
                        case "+1": {
                          if (p.length !== 11)
                            return 'Number should be 10 digits including "+1"';
                          break;
                        }
                      }
                    },
                  })}
                />
              </div>
              <InputErrorhandler errors={errors} name={"phone"} />
            </div>{" "}
            {isSubmitting ? (
              <div className="mx-auto h-fit w-fit">
                <BeatLoader color="#facc15" size={30} />
              </div>
            ) : (
              <button className="btn h-fit w-full rounded-md bg-secondary p-2 font-sans text-[5vw] font-semibold text-tertiary shadow-lg outline outline-1 sm:text-base">
                Continue
              </button>
            )}
          </form>
        )}

        {/* otp validation */}
        {isSubmitSuccessful && <OtpVerification phone={watch("phone")} />}
      </div>
    </FormContainer>
  );
};

export default Auth;
