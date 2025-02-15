import visibility from '@/components/people/visibility.json';
import VisibilityContext from '@/components/people/visibility-context';
import { useState } from "react";

export default function VisibilityProvider({ children }) {
    const [peopleVisibility, setPeopleVisibility] = useState(visibility.visible);

    function changeVisibility() {
      peopleVisibility.name === "visible"
        ? setHidden()
        : setVisable();
    }

    function setVisable() {
      setPeopleVisibility(visibility.visible);
      const main = document.getElementById("main");
      main.style.width = "";
    }

    function setHidden() {
      setPeopleVisibility(visibility.hidden);
      const main = document.getElementById("main");
      main.style.width = "100%";
    }

    return (
      <VisibilityContext.Provider value={{ peopleVisibility, changeVisibility }}>
        {children}
      </VisibilityContext.Provider>
    );
}
