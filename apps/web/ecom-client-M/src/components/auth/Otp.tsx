import InputErrorhandler from "../common/InputErrorhandler";
import { useEffect, useCallback, memo, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch } from "@/config/reduxTypes";
import { fetchUserData } from "@/store/features/authanticationSlice";

interface Data {
  otp: number[] | string;
  serverError: string;
  phone: string;
}

const OtpVerification = memo(({ phone }: { phone: string }) => {
  const dispatch = useAppDispatch();
  // form states
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
    setValue,
    clearErrors,
    reset,
  } = useForm<Data>({
    shouldFocusError: false,
  });

  // states
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  //  workonError function
  const workonError = useCallback(
    (e: string) => {
      // set error
      reset();
      setError("serverError", {
        type: "manual",
        message: e,
      });
    },
    [setError, reset,]
  );

  //  onsubmit function
  const onsubmit = useCallback(
    async (data: Data) => {
      data.otp = (data.otp as []).join("");
      data.phone = phone;

      await axiosInstance
        .post("/verify-otp", data)
        .then((res) => {
          const { isProfileCompleted } = res.data;
          if (!isProfileCompleted) navigate("/auth/user-form");
          dispatch(fetchUserData());
        })
        .catch((e) => {
          workonError(e.message);
        });
    },
    [workonError, dispatch, navigate, phone],
  );

  // resendOtp function
  const resendOtp = useCallback(async () => {
    setLoading(true);
    await axiosInstance
      .post("/create-otp", { phone })
      .then(() => {
        setTimer(30);
        setCanResend(false);
        clearErrors("serverError");
      })
      .catch((e) => {
        workonError(e.message);
      })
      .finally(() => setLoading(false));
  }, [phone, clearErrors, workonError]);

  // shake animation on error
  useEffect(() => {
    if (errors.serverError) {
      const input = document.querySelector(".otpboxes");
      input?.classList.toggle("shake");
      setTimeout(() => {
        if (!input?.classList.contains("shake")) {
          input?.classList.toggle("shake");
        }
      }, 10);
      (input?.firstChild as HTMLElement)?.focus();
    }
  }, [errors.serverError]);

  // focus on first input
  useEffect(() => {
    const input = document.querySelectorAll(".otpBox")[0] as HTMLInputElement;
    input.focus();
  }, []);

  // input on change handler
  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
        .replace(/\D/g, "")
        .slice(-1) as unknown as number;

      const name = e.target.name as `otp.${number}`;

      // Set the value in the form state
      setValue(name, value, {
        shouldDirty: true,
        shouldValidate: true,
      });

      // Delay the focus on the next input until the state updates
      setTimeout(() => {
        const nextInput = e.target.nextElementSibling as HTMLInputElement;
        if (!nextInput?.disabled) {
          nextInput?.focus();
        }
      }, 0); // A short delay to ensure state updates

      if (name.endsWith("5") && value) {
        handleSubmit(onsubmit)();
      }
    },
    [setValue, handleSubmit, onsubmit],
  );

  // keydown handler
  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      const prevInput = e.currentTarget
        .previousElementSibling as HTMLInputElement;
      prevInput?.focus();
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onsubmit)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        onKeyUp={(e) => e.key === "Enter" && e.preventDefault()}
        className="grid w-full gap-12 px-4"
      >
        <input type="checkbox" id="" hidden {...register("serverError")} />
        <div className="grid w-full gap-[1vh]">
          <div className="otpboxes">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                onKeyDown={keydownHandler}
                onInput={inputChangeHandler}
                disabled={
                  (index > 0 && !watch(`otp.${index - 1}`)) || isSubmitting
                }
                type="number"
                className={`otpBox ${watch(`otp.${index}`) ? "!bg-secondary" : ""}`}
                {...register(`otp.${index}`)}
              />
            ))}
          </div>
          <InputErrorhandler errors={errors} name="serverError" />
        </div>
        {isSubmitting || loading ? (
          <div className="mx-auto h-fit w-fit">
            <BeatLoader color="#facc15" size={30} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-center font-sans text-[3.8vw] text-tertiary sm:text-sm">
            <h4 className="font-semibold underline">
              Didn’t received the OTP?
            </h4>
            <span className="text-center">
              {canResend ? (
                <button
                  className="cursor-pointer text-[4.5vw] font-extrabold text-green-400 sm:text-sm"
                  onClick={resendOtp}
                >
                  Resend OTP
                </button>
              ) : (
                <p>
                  Resend in{" "}
                  <i className="font-bold not-italic text-green-400">
                    {timer} seconds{" "}
                  </i>
                </p>
              )}
            </span>
          </div>
        )}
      </form>
    </>
  );
});

export default OtpVerification;
