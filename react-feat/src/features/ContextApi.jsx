import React, { useContext, useState } from "react";

const ThemeContext = React.createContext(null);

const Student = () => {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <h1>Student: {theme}</h1>
    </div>
  );
};

const Class = () => {
  return (
    <div>
      <h1>Class</h1>
      <Student />
    </div>
  );
};

const College = () => {
  return (
    <div>
      <h1>College</h1>
      <Class />
    </div>
  );
};

export default function ContextApi() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h1>ContextApi: {theme}</h1>
        <select
          name="theme"
          id="theme"
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <College />
      </div>
    </ThemeContext.Provider>
  );
}
