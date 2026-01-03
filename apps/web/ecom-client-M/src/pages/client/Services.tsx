const services = [
  {
    img: "https://via.placeholder.com/150",
    title: "Mason",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Electrician",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Plumber",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Painter",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Carpenter",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Welder",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Gardener",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Mechanic",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Cleaner",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Housekeeping",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Security Guard",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Tutor",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Driver",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Cook",
  },
];

const Services = () => {
  return (
    <div className="grid auto-rows-[50vw] grid-cols-[repeat(2,43vw)] justify-center gap-5 py-1">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-slate-white flex flex-col items-center justify-center gap-3 rounded-lg p-5 text-sm font-bold capitalize shadow-lg outline outline-1 outline-slate-200"
        >
          <h1 className="text-center">{service.title}</h1>
          <div className="img w-[75%] flex-1">
            <img
              src={service.img}
              alt={service.title}
              className="h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
