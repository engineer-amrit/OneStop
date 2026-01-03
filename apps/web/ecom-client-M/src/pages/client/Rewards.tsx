const Rewards = () => {
  return (
    <>
      <div className="mx-3 mt-3 flex flex-col gap-2 rounded-lg bg-[#4CAF50] px-5 pt-3 text-secondary">
        <h1 className="mb-4 text-2xl font-bold">Balance</h1>
        <div className="flex justify-between">
          <i className="fa-regular fa-trophy-star text-7xl"></i>
          <span className="grid">
            <span className="text-2xl">500Pts</span>
            <span className="text-lg">500 Points till your next reward</span>
          </span>
        </div>
        <div className="mt-1 flex justify-between border-t-2 border-dashed border-secondary py-2 text-lg">
          <span className="font-bold">Amrit Singh</span>
          <span>XXXXXX567</span>
        </div>
      </div>
    </>
  );
};

export default Rewards;
