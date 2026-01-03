import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import axiosInstance from '@/utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { clearUserData } from '@/store/features/authanticationSlice';

type PopupState = "close" | "open";

type Props = {
    showPopup: PopupState;
    setShowPopup: (value: PopupState) => void;
};

const LogoutPopup = ({ showPopup, setShowPopup }: Props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (showPopup == "open") {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {

            document.body.style.overflow = '';
        };
    }, [showPopup]);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axiosInstance.get("/logout");
            dispatch(clearUserData());
            setShowPopup("close");
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        createPortal(
            <>
                {/* Backdrop */}
                <div
                    data-state={showPopup}
                    className="fixed inset-0 z-40 data-[state=open]:scale-100 delay-75  scale-0 transition-[zoom]
                      bg-black/50 backdrop-blur-[2px]"
                    onClick={() => setShowPopup("close")}
                />

                {/* Modal Content */}
                <div
                    data-state={showPopup}
                    className=" fixed left-2/4 transition-all  top-2/4 z-50 -translate-x-2/4 -translate-y-2/4 flex-col items-center gap-[1.7vh] text-nowrap rounded-3xl bg-white p-5 text-tertiary shadow-2xl outline outline-1 outline-tertiary
                        data-[state=open]:scale-100  scale-0"
                >
                    <div className="text-center mb-4">
                        <p className="text-lg font-semibold">Are you sure you want to logout?</p>
                        <p className="text-sm text-gray-500">You’ll be missed 😢</p>
                    </div>

                    <svg
                        className="mx-auto my-4 size-[20vw] max-w-[100px]"
                        viewBox="0 0 55 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M27.4748 0.703735C12.6992 0.703735 0.734253 12.6955 0.734253 27.471C0.734253 42.2465 12.6992 54.2383 27.4748 54.2383C42.2771 54.2383 54.2688 42.2465 54.2688 27.471C54.2688 12.6955 42.2771 0.703735 27.4748 0.703735ZM18.1325 16.764C15.9151 16.764 14.1174 18.5617 14.1174 20.7791C14.1174 22.9966 15.9151 24.7942 18.1325 24.7942C20.35 24.7942 22.1476 22.9966 22.1476 20.7791C22.1476 18.5617 20.35 16.764 18.1325 16.764ZM36.8705 16.764C34.653 16.764 32.8554 18.5617 32.8554 20.7791C32.8554 22.9966 34.653 24.7942 36.8705 24.7942C39.088 24.7942 40.8856 22.9966 40.8856 20.7791C40.8856 18.5617 39.088 16.764 36.8705 16.764ZM13.796 42.1929C15.9373 36.7056 21.264 32.8244 27.5008 32.8244C33.7376 32.8244 39.0643 36.7056 41.2056 42.1929H36.7355C34.8618 39.0076 31.4624 36.8395 27.5008 36.8395C23.5392 36.8395 20.113 39.0076 18.2661 42.1929H13.796ZM6.08796 27.471C6.08796 39.3021 15.6706 48.8848 27.5018 48.8848C39.3329 48.8848 48.9156 39.3021 48.9156 27.471C48.9156 15.6399 39.3329 6.05717 27.5018 6.05717C15.6706 6.05717 6.08796 15.6399 6.08796 27.471Z"
                            fill="#facc15"
                        />
                    </svg>

                    <div className="grid gap-2 mt-4 text-base w-1/2 mx-auto">
                        <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="rounded-xl border-2 border-tertiary px-3 py-1 font-bold"
                        >
                            {loading ? <BeatLoader color="#facc15" size={10} /> : "Logout"}
                        </button>
                        <button
                            onClick={() => setShowPopup("close")}
                            className="rounded-xl bg-tertiary px-3 py-1 text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </>,
            document.body
        )

    );
};

export default LogoutPopup;
