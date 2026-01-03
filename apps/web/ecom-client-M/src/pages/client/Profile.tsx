import PagesContainer from "../../components/client/PagesContainer";
import { useAppSelector } from "@/config/reduxTypes";



const Profile = () => {
  const { user } = useAppSelector((state) => state.Auth);

  const items = [

    {
      name: "birthday",
      value: user?.dob || "Not set",
      icon: <i className="fa-regular fa-cake-candles"></i>,
    },
    {
      name: "email",
      value: user?.email || "Not set",
      icon: <i className="fa-regular fa-envelope"></i>,
    },
    {
      name: "phone",
      value: user?.phone || "Not set",
      icon: <i className="fa-regular fa-phone"></i>,
    },
  ];
  return (
    <PagesContainer title="Profile" backLink="/">
      <div className="flex flex-1 flex-col gap-8 p-3">
        <div className="profile flex items-center gap-[3vw]">
          <div className="img">
            <span className="flex size-[15vw] items-center justify-center rounded-full bg-primary text-2xl font-bold text-tertiary">
              {`${user?.firstName[0]} ${user?.lastName[0]}`.toUpperCase()}
            </span>
          </div>
          <div className="info text-[min(1rem,3.76vw)]">
            <h1 className="font-bold capitalize">
              {user?.firstName} {user?.lastName}
            </h1>
            <span className="text-tertiary">
              {user?.email || user?.phone || "No contact info"}
            </span>
          </div>
        </div>

        <div className="grid gap-5 text-base">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="flex items-center gap-3">
                <span className="text-2xl text-secondary">{item.icon}</span>
                <span className="capitalize">{item.name}</span>
              </span>
              <span className="flex items-center gap-3 font-medium text-slate-500">
                <span className="capitalize">{item.value}</span>
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </PagesContainer>
  );
};

export default Profile;
