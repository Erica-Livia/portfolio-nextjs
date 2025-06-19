import { createContext, useContext, useState } from "react";

type ViewMode = "admin" | "user";

const ViewModeContext = createContext<{
    mode: ViewMode;
    toggleMode: () => void;
}>({
    mode: "admin",
    toggleMode: () => {},
});

export const ViewModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ViewMode>("admin");

    const toggleMode = () => {
        setMode((prev) => (prev === "admin" ? "user" : "admin"));
    };

    return (
        <ViewModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export const useViewMode = () => useContext(ViewModeContext);
