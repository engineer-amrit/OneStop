import { useState, useCallback, useEffect } from "react";
import Terms$conditions from "../../components/auth/Terms$conditions";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import animationJson from "../../assets/Animation - 1728598304582.json";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axiosInstance from "@/utils/axiosInstance";
import { useAppSelector, useAppDispatch } from "@/config/reduxTypes";
import { fetchUserData } from "@/store/features/authanticationSlice";
import { userFormFields } from "@/mock/mock-user-form";
import UserSchema, { UserFormData } from "@/components/auth/zodSchema";
import FormFeilds from "@/components/auth/FormFeilds";
import { zodResolver } from "@hookform/resolvers/zod";

const heading: { [key: number]: string } = {
  1: "Personal Details :",
  2: "Address Details :",
};

function UserForm() {
  const dispatch = useAppDispatch();

  const { user, loading } = useAppSelector((state) => state.Auth);

  const [step, setStep] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || user?.firstName)) {
      // navigate(-1);
    }
  }, [user, loading, navigate]);

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    mode: "onChange",
    resolver: zodResolver(UserSchema),
  });

  const onsubmit = useCallback(
    async (data: UserFormData) => {
      const { dob, ...rest } = data
      await axiosInstance
        .put("/update-details", { dob: `${dob.day}/${dob.month}/${dob.year}`, ...rest })
        .then(() => {
          setStep(3);
        })
        .catch((e) => {
          setError("address.streetAddress1", {
            message: e.response.data.message,
          });
        });
    },
    [setError],
  );

  const onTrigger = useCallback(async () => {
    const result = await trigger([
      "firstName",
      "lastName",
      "email",
      "dob.day",
      "dob.month",
      "dob.year",
    ]);
    if (result) {
      setStep(2);
    }
  }, [setStep, trigger]);

  useEffect(() => {
    if (step === 3) {
      setTimeout(() => {
        dispatch(fetchUserData());
      }, 2500);
    }
  }, [step, dispatch]);

  if (!user?.firstName && !loading) {
    return (
      <div className="flex min-h-svh flex-col gap-2 bg-white p-[2.5vh] sm:min-h-[590px]">
        <form
          onSubmit={handleSubmit(onsubmit)}
          onKeyDown={formHandler}
          style={{
            justifyContent: step === 3 ? "start" : "",
          }}
          className="userForm flex w-full flex-1 flex-wrap gap-2"
        >
          {/* heading */}
          <span className="w-full text-left text-[5vw] font-extrabold capitalize sm:text-xl">
            {heading[step]}
          </span>

          {step === 1 && (
            <>
              {userFormFields.slice(0, 4).map((el, index) => (
                <FormFeilds
                  key={index}
                  field={el}
                  register={register}
                  errors={errors}
                  clearErrors={clearErrors}
                />
              ))}
              <button
                type="button"
                onClick={onTrigger}
                className="btn h-fit w-full rounded-md bg-secondary p-2 font-sans text-[5vw] font-semibold text-tertiary shadow-lg outline outline-1 sm:text-base"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {userFormFields.slice(4).map((el, index) => (
                <FormFeilds
                  key={index}
                  field={el}
                  register={register}
                  errors={errors}
                  clearErrors={clearErrors}
                />
              ))}

              {step === 2 && !isSubmitting ? (
                <div className="btns flex w-full justify-between px-4">
                  <button
                    type="button"
                    className="btn outline-3 h-fit w-fit rounded-3xl p-[2vw] px-[4vw] font-sans text-[5vw] font-semibold text-tertiary shadow-lg outline outline-secondary sm:p-2 sm:px-6 sm:text-base"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn h-fit w-fit rounded-3xl bg-secondary p-[2vw] px-[4vw] font-sans text-[5vw] font-semibold text-tertiary shadow-lg outline outline-1 sm:p-2 sm:px-6 sm:text-base"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                step === 2 && (
                  <span className="mx-auto">
                    <BeatLoader color="#facc15" size={30} />
                  </span>
                )
              )}
            </>
          )}

          {step === 3 && (
            <div className="fixed bottom-0 left-0 right-0 top-0 flex flex-col items-center pt-[20vh] sm:bg-slate-100">
              <div className="bg-white sm:rounded-2xl sm:border-2 sm:p-10 sm:px-16 sm:shadow-md">
                <div className="mx-auto grid place-items-center">
                  <DotLottieReact
                    data={animationJson}
                    speed={1.4}
                    loop
                    autoplay
                  />
                </div>
                <h1 className="text-center font-sans text-[8vw] font-semibold sm:text-3xl">
                  Done!
                </h1>
                <p className="text-center font-sans text-[4.5vw] sm:text-xl">
                  You're all set to go
                </p>
              </div>
            </div>
          )}
        </form>
        {step != 3 && <Terms$conditions />}
      </div>
    );
  }
}

export default UserForm;

const formHandler = (e: React.KeyboardEvent<HTMLFormElement>) =>
  e.key === "Enter" && e.preventDefault();
