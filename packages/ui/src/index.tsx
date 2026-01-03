export * from "./form/index.js"
export * from "./utils/infinite.js"

type Fn = (name: string | null, e: React.KeyboardEvent<HTMLFormElement>) => void;

export const FormKeyHandler = (e: React.KeyboardEvent<HTMLFormElement>, fn: Fn) => {
    const activeElement = document.activeElement as HTMLElement;
    const name = activeElement.getAttribute("name");
    if (e.key === "Enter") {
        e.preventDefault();
        fn(name, e);
    }
};