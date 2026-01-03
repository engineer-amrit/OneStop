import PagesContainer from "../../components/client/PagesContainer";
const WriteReview = () => {
  return (
    <PagesContainer title="Write Review" backLink="/product-details/1234">
      <div className="p-4 text-base text-tertiary">
        <div>
          <span className="font-semibold">
            Please write Overall level of satisfaction with your shipping /
            Delivery Service
          </span>
          <div className="btns my-1 flex items-center gap-3 text-3xl text-secondary">
            <button>
              <i className="fas fa-star"></i>
            </button>
            <button>
              <i className="fas fa-star"></i>
            </button>
            <button>
              <i className="fas fa-star"></i>
            </button>
            <button>
              <i className="fas fa-star"></i>
            </button>
            <button className="text-tertiary/20">
              <i className="fas fa-star"></i>
            </button>
            <span className="text-lg font-semibold text-tertiary">4/5</span>
          </div>
        </div>
        <div className="my-3 space-y-2">
          <span className="text-lg font-bold">Write your review</span>
          <textarea
            className="w-full rounded-md border border-tertiary/20 p-2"
            rows={8}
            placeholder="Write your review here..."
          ></textarea>
        </div>
        <div className="my-3 space-y-2">
          <span className="text-lg font-bold">
            Add Photo{" "}
            <i className="text-base font-medium not-italic text-tertiary/40">
              (Optional)
            </i>
          </span>
          <div className="flex items-center gap-2">
            <div className="grid size-[20vw] place-items-center rounded-md outline outline-1 outline-tertiary/20">
              <i className="fas fa-plus text-2xl text-tertiary/50"></i>
            </div>
          </div>
        </div>
        <button className="fixed bottom-4 left-2/4 w-[90%] -translate-x-2/4 rounded-md bg-tertiary p-3 text-lg text-white">
          Submit
        </button>
      </div>
    </PagesContainer>
  );
};

export default WriteReview;
