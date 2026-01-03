import { Link } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div className="products grid auto-rows-[74vw] grid-cols-[repeat(2,44vw)] justify-evenly gap-y-[4.5vw] py-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export const Card = () => {
  return (
    <Link
      to="/product-details/13243124"
      className="card flex flex-col justify-between p-1 text-base"
    >
      <div className="img relative h-[51%] rounded-lg outline outline-1 outline-slate-400">
        <i className="fas fa-heart absolute bottom-2 right-2 text-2xl text-red-500"></i>
      </div>
      <span className="line-clamp-2 text-sm text-tertiary/70">
        {" "}
        <i className="text-base font-bold not-italic text-tertiary">
          Ultratech OPC Cement
        </i>{" "}
        ( 50Kg Bag By Ultratech dsfasddf)
      </span>
      <span className="review space-x-[0.3vw] text-secondary">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fa-duotone fa-solid fa-star-half"></i>
      </span>
      <span className="flex items-center gap-3 text-lg leading-tight">
        <del className="text-tertiary/80">&#8377; 450</del>
        <span className="text-xl font-bold text-d-green">&#8377; 400</span>
      </span>
      <button className="custom-shadow-2 rounded-bl-[3.76vw] rounded-br-[0.47vw] rounded-tl-[0.47vw] rounded-tr-[3.76vw] bg-secondary py-1 text-lg font-medium">
        Add to cart
      </button>
    </Link>
  );
};

export default Products;
