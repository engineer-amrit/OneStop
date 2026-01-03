import PagesContainer from "../../components/client/PagesContainer";

const ReferAFriend = () => {
  return (
    <PagesContainer title="Refer A Friend" backLink="/rewards-offers">
      <div className="mt-3 grid h-[45vw] w-full place-items-center bg-primary text-2xl font-bold text-tertiary">
        <span>Advertisement</span>
      </div>
      <div className="mt-3 flex h-[48vw] flex-col items-center gap-6 px-4 shadow-md">
        <span className="text-lg font-bold text-tertiary">
          Use the referral link to refer your friends to One stop building
          solution and earn rewards
        </span>
        <div className="flex w-fit">
          <div className="grid place-items-center rounded-l-sm border-2 border-dashed border-tertiary p-1 uppercase">
            <i className="px-3 text-lg font-bold not-italic">xaslk2134</i>
          </div>
          <span className="flex items-center gap-2 rounded-r-sm bg-secondary p-2 text-xl text-tertiary">
            <i className="fa-regular fa-share-nodes text-2xl"></i>
            <span>Share</span>
          </span>
        </div>
      </div>
    </PagesContainer>
  );
};

export default ReferAFriend;
