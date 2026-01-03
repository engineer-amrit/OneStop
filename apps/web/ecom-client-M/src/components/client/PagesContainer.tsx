import { Link } from "react-router-dom";

type PagesContainerProps = {
  children: React.ReactNode;
  title: string;
  backLink: string;
};

const PagesContainer = ({ children, title, backLink }: PagesContainerProps) => {
  return (
    <div className="flex min-h-svh flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b-2 border-slate-200 bg-white p-[min(1rem,3.76vw)] text-tertiary">
        <Link to={backLink} className="mr-2 grid place-items-center p-2">
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </Link>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PagesContainer;
