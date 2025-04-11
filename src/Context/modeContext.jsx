import { createContext, useState, useContext } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ModeContext.Provider value={{ darkMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);

