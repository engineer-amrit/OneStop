import { createContext, useContext, type ReactNode } from "react";

export type Action = {
  action: 'view' | 'edit' | 'delete';
  id: string;
  slug?: string;
}

type ActionState = {
  actions: Action | undefined;
  setActions: React.Dispatch<React.SetStateAction<Action | undefined>>
  pageCount: number | undefined;
  query: {
    [key: string]: string;
  }
} | undefined;






// Create a generic context that will accept a type `T`
const ActionStateContext = createContext<ActionState>(undefined);

// Generic ProductStateProvider that accepts a generic type `T`
export const ActionProvider = ({ children, value }: { children: ReactNode, value: ActionState }) => (
  <ActionStateContext.Provider value={value}>
    {children}
  </ActionStateContext.Provider>
);

// Custom hook to consume the context with the correct type
//eslint-disable-next-line
export const useActionContext = () => {
  const context = useContext(ActionStateContext);

  if (!context) {
    throw new Error("useActionContext must be used within a ActionProvider");
  }

  return context;  // Cast to the generic type for type safety
};
