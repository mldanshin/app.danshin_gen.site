import themes from '@/config/themes.json';
import ThemeContext from '@/contexts/ThemeContext';
import { useState } from "react";

export default function ThemeProvider({ children }) {
    const [theme, setThemePrivate] = useState(themes.dark);

    function setTheme() {
        theme.name === "dark"
            ? setLightTheme()
            : setDarkTheme();
    }

    function setDarkTheme() {
        setThemePrivate(themes.dark);
        document.body.classList.remove(themes.light.className);
        document.body.classList.add(themes.dark.className);
    }

    function setLightTheme() {
        setThemePrivate(themes.light);
        document.body.classList.remove(themes.dark.className);
        document.body.classList.add(themes.light.className);
    }

    return (
      <ThemeContext.Provider value={{ theme, setTheme, themes }}>
        {children}
      </ThemeContext.Provider>
    );
}
