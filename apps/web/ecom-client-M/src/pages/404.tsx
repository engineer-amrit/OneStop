import { Link } from "react-router-dom";

const ERROR = () => {
  return (
    <section className="fixed left-2/4 top-2/4 grid h-full w-full -translate-x-2/4 -translate-y-2/4 place-items-center bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-third-600 dark:text-third-500 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            to="/"
            className="my-4 inline-flex rounded-lg bg-third-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-third-800 focus:outline-none focus:ring-4 focus:ring-third-300 dark:focus:ring-third-900"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ERROR;
