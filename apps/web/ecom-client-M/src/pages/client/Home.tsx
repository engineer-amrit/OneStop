import { Link } from "react-router-dom";
import cement from "../../assets/images/categories/cement.webp";
import buildingMaterial from "../../assets/images/categories/construction-and-tools.webp";
import electricalItems from "../../assets/images/categories/electrical.webp";
import paints from "../../assets/images/categories/paint-bucket.webp";
import roofingSheets from "../../assets/images/categories/sheet.webp";
import sanitaryItems from "../../assets/images/categories/wash-basin.webp";
import tmtBars from "../../assets/images/categories/roads.webp";


import Banner from "@/components/client/Banner";

const categories = [
  {
    img: cement,
    title: "Cement",
    link: "/cement",
  },
  {
    img: buildingMaterial,
    title: "Building Material",
    link: "/building-material",
  },
  {
    img: roofingSheets,
    title: "Roofing Sheets",
    link: "/roofing-sheets",
  },
  {
    img: tmtBars,
    title: "TmT Bars",
    link: "/tmt-bars",
  },
  {
    img: electricalItems,
    title: "Electrical items",
    link: "/electrical-items",
  },
  {
    img: sanitaryItems,
    title: "Sanitary Items",
    link: "/sanitary-items",
  },
  {
    img: paints,
    title: "Paints",
    link: "/paints",
  },
];

const discountsale_products = [
  {
    img: "",
    title: "Ultratech tilefixo NT tile adhesive  ...",
    price: 550,
    originalPrice: 785,
  },
  {
    img: "",
    title: "Ultratech tilefixo NT tile adhesive  ...",
    price: 550,
    originalPrice: 785,
  },
];

const Home = () => {


  return (
    <div className="home grid gap-4 py-3">
      <div className="categories grid grid-cols-[repeat(4,1fr)] grid-rows-2 gap-y-2">
        {categories.map((category, index) => (
          <Link
            to={`/categorized-products${category.link}`}
            key={index}
            className="category flex h-full w-full flex-col items-center gap-2 overflow-hidden"
          >
            <div
              className={`img custom-shadow size-[16vw] rounded-full bg-white ${index == 3 ? "py-3 pl-1" : "p-3"}`}
            >
              <img
                loading="lazy"
                src={category.img}
                alt={category.title}
                className={`h-full w-full object-cover ${index == 3 && "rounded-r-3xl"}`}
              />
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs font-semibold text-tertiary">
              {category.title}
            </span>
          </Link>
        ))}

        <Link
          to="/view-all"
          className="my-auto h-fit text-center text-[min(1rem,4vw)] italic"
        >
          View All..
        </Link>
      </div>

      <Banner />



      <div className="discountsale grid gap-3 px-[3.5vw]">
        <div className="flex w-full items-center justify-between px-1">
          <div className="timer flex items-center gap-[3vw]">
            <h1 className="text-xl font-bold uppercase">Discount sale</h1>
            <div className="timer w-fit rounded-2xl bg-primary p-1 px-[3vw] text-lg">
              01:59:10
            </div>
          </div>
          <Link to="" className="my-auto text-base italic">
            View All...
          </Link>
        </div>
        <div className="sale-products grid w-full grid-cols-[repeat(2,42.5vw)] grid-rows-1 justify-between px-[1vw] text-tertiary">
          {discountsale_products.map((product, index) => (
            <div className="product-card grid gap-3" key={index}>
              <div className="img custom-shadow-2 h-[42vw] rounded-lg bg-slate-200"></div>
              <div className="text-content grid gap-1 px-3 text-base">
                <span className="line-clamp-2 font-medium leading-tight">
                  {product.title}
                </span>
                <span className="price">
                  <i id="p1" className="font-bold not-italic">
                    Rs. {product.price}
                  </i>
                  <del id="p2" className="ml-3 not-italic">
                    Rs. {product.originalPrice}
                  </del>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="discountsale grid gap-3 px-[3.5vw]">
        <div className="flex w-full items-center justify-between px-1">
          <div className="timer flex items-center gap-[3vw]">
            <h1 className="text-xl font-bold uppercase">New Arrivals</h1>
          </div>
          <Link to="" className="my-auto text-base italic">
            View All...
          </Link>
        </div>
        <div className="sale-products grid w-full grid-cols-[repeat(2,42.5vw)] grid-rows-1 justify-between px-[1vw] text-tertiary">
          {discountsale_products.map((product, index) => (
            <div className="product-card grid gap-3" key={index}>
              <div className="img custom-shadow-2 h-[42vw] rounded-lg bg-slate-200"></div>
              <div className="text-content grid gap-1 px-3 text-base">
                <span className="line-clamp-2 font-medium leading-tight">
                  {product.title}
                </span>
                <span className="price">
                  <i id="p1" className="font-bold not-italic">
                    Rs. {product.price}
                  </i>
                  <del id="p2" className="ml-3 not-italic">
                    Rs. {product.originalPrice}
                  </del>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="discountsale grid gap-3 px-[3.5vw]">
        <div className="flex w-full items-center justify-between px-1">
          <div className="timer flex items-center gap-[3vw]">
            <h1 className="text-xl font-bold uppercase">Upcoming products</h1>
          </div>
          <Link to="" className="my-auto text-base italic">
            View All...
          </Link>
        </div>
        <div className="sale-products grid w-full grid-cols-[repeat(2,42.5vw)] grid-rows-1 justify-between px-[1vw] text-tertiary">
          {discountsale_products.map((product, index) => (
            <div className="product-card grid gap-3" key={index}>
              <div className="img custom-shadow-2 h-[42vw] rounded-lg bg-slate-200"></div>
              <div className="text-content grid gap-1 px-3 text-base">
                <span className="line-clamp-2 font-medium leading-tight">
                  {product.title}
                </span>
                <span className="price">
                  <i id="p1" className="font-bold not-italic">
                    Rs. {product.price}
                  </i>
                  <del id="p2" className="ml-3 not-italic">
                    Rs. {product.originalPrice}
                  </del>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Home;
