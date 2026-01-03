import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/config/reduxTypes"
import { Link } from "react-router-dom"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import React from "react"
import LogoutPopup from "../auth/Logout"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';



const links = [
    {
        name: "orders",
        icon: <i className="fa-regular fa-box"></i>,
        link: "/orders",
    },
    {
        name: "rewards & offers",
        icon: <i className="fa-regular fa-award"></i>,
        link: "/rewards-offers",
    },
    {
        name: "address",
        icon: <i className="fa-regular fa-location-dot"></i>,
        link: "/addresses",
    },
    {
        name: "payment methods",
        icon: <i className="fa-regular fa-wallet"></i>,
        link: "/payment-methods",
    },
    {
        name: "settings",
        icon: <i className="fa-regular fa-cog"></i>,
        link: "/settings",
    },
    {
        name: "logout",
        icon: <i className="fa-solid fa-sign-out"></i>,
    },
];

export function SheetDemo() {
    const [showPopup, setShowPopup] = React.useState<"close" | "open">("close");
    const { user } = useAppSelector((state) => state.Auth);
    const sheetRef = React.useRef<HTMLButtonElement>(null);

    const closeSheet = () => {
        const sheet = sheetRef.current;
        if (sheet) {
            sheet.click();
        }
    }

    return (
        <>
            <LogoutPopup
                showPopup={showPopup}
                setShowPopup={setShowPopup}
            />

            <Sheet
            >
                <SheetTrigger asChild >
                    <i ref={sheetRef}

                        className="fa-regular fa-bars text-3xl"
                    ></i>
                </SheetTrigger>



                <SheetContent className="p-4"
                    onOpenAutoFocus={(e) => e.preventDefault()}

                >

                    <VisuallyHidden>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </VisuallyHidden>


                    {user ? (
                        <Link
                            to="/profile"
                            className="profile grid w-full grid-cols-[auto,1fr] items-center gap-[3vw]"
                        >
                            <div className="img">
                                <span className="flex size-[12.5vw] items-center justify-center rounded-full bg-primary text-[min(1.2rem,4.5vw)] font-bold text-tertiary">
                                    {user.firstName && user.firstName
                                        ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                                        : "US"}
                                </span>
                            </div>
                            <div className="info w-full flex-1 text-base">
                                <h1 className="font-bold capitalize">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <span className="text-sm text-tertiary">
                                    {user.email || user.phone || "No contact info"}
                                </span>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex justify-center">
                            <Button
                                asChild
                                className="w-[80%] bg-primary hover:bg-primary/80 text-base font-semibold text-tertiary"
                            >
                                <Link to="/auth">Login</Link>
                            </Button>
                        </div>
                    )}

                    <div className="links mt-[min(2.2rem,9vw)] flex flex-col gap-[min(1rem,3.764vw)]">
                        {links.map((link, index) => (
                            <React.Fragment key={index}>
                                {link.name != "logout" ? (
                                    <Link
                                        to={link.link!}
                                        className="relative items-center active:scale-95 transition-transform gap-3 rounded-lg bg-slate-100 p-[2.5vw] px-[2.8vw] text-base text-tertiary flex"
                                    >
                                        <span className="text-xl">{link.icon}</span>
                                        <span className="capitalize">{link.name}</span>
                                        {link.name == "orders" && (
                                            <span className="absolute right-[6%] grid size-[7vw] place-items-center rounded-md bg-[#B1E5FC] font-medium">
                                                6
                                            </span>
                                        )}
                                        {link.name == "rewards & offers" && (
                                            <span className="absolute right-[6%] grid size-[7vw] place-items-center rounded-md bg-[#FB9B9B] font-medium">
                                                6
                                            </span>
                                        )}
                                    </Link>
                                ) : (
                                    user && (
                                        <button
                                            onClick={() => {
                                                closeSheet();
                                                setShowPopup("open");
                                            }}
                                            className="relative flex items-center gap-3 rounded-lg bg-slate-100 p-[2.5vw] px-[2.8vw] text-base text-tertiary">
                                            <span className="text-xl">{link.icon}</span>
                                            <span className="capitalize">{link.name}</span>
                                        </button>
                                    )
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
