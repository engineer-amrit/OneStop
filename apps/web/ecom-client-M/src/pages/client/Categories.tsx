const categories = [
  {
    img: "https://via.placeholder.com/150",
    title: "Building Material",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Electrical Items",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Cement",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Iron Rods",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "TMT Bars",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Paints",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Tiles & Flooring",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Pipes & Fittings",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Bricks",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Glass & Mirrors",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Hardware",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Lighting",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Safety Equipment",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Plumbing Materials",
  },
];

const Services = () => {
  return (
    <div className="grid auto-rows-[50vw] grid-cols-[repeat(2,43vw)] justify-center gap-5 py-1">
      {categories.map((categories, index) => (
        <div
          key={index}
          className="bg-slate-white flex flex-col items-center justify-center gap-3 rounded-lg p-5 text-sm font-bold capitalize shadow-lg outline outline-1 outline-slate-200"
        >
          <h1 className="text-center">{categories.title}</h1>
          <div className="img w-[75%] flex-1">
            <img
              src={categories.img}
              alt={categories.title}
              className="h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
