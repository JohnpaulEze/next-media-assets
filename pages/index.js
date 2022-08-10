import { Cloudinary } from "@cloudinary/url-gen";
import { simulateColorBlind } from "@cloudinary/url-gen/actions/effect";

import { useEffect, useState } from "react";
//import axios from "axios";

const HomePage = () => {
  const [darkTheme, setDarkTheme] = useState(undefined);
  const [colorBlindEffect, setColorBlindEffect] = useState("");
  const [altText, setAltText] = useState("");
  const [altTextToggle, setAltTextToggle] = useState(false);

  const handleToggle = (event) => {
    setDarkTheme(event.target.checked);
  };

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        // Set value of  darkmode to dark
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        // Set value of  darkmode to light
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    // Set initial darkmode to light
    setDarkTheme(initialColorValue === "dark");
  }, []);

  const handleClick = () => {
    setColorBlindEffect("");
    const cld = new Cloudinary({
      cloud: {
        cloudName: "johnpaul"
      }
    });

    const myImage = cld.image("color-effect/afro");
    console.log(myImage);
    myImage.effect(simulateColorBlind().condition("deuteranopia"));
    const imageUrl = myImage.toURL();

    setColorBlindEffect(imageUrl);

    console.log(colorBlindEffect);
  };
  const reset = () => {
    setColorBlindEffect("");
  };
  const toggleAlt = async () => {
    const altT = await fetch("/api/update");
    const alt = await altT.json();
    console.log(alt);

    setAltText(alt);
    setAltTextToggle(!altTextToggle);
  };
  return (
    <>
      <div className="container">
        <nav>
          <div className="mybrand">My Personal Site</div>
          <div>
            {darkTheme !== undefined && (
              <form action="#">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkTheme}
                    onChange={handleToggle}
                  />
                  <span className="slider"></span>
                </label>
              </form>
            )}
          </div>
        </nav>
        <section>
          <div className="heroSection">
            <h1>
              <span role="img" aria-label="wave">
                👋
              </span>{" "}
              Hey I’m John Doe
            </h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </h3>
          </div>
        </section>
        <section id="image">
          <div className="image-wrapper">
            <img
              src={
                colorBlindEffect
                  ? colorBlindEffect
                  : "https://res.cloudinary.com/johnpaul/image/upload/v1659338247/color-effect/afro.jpg"
              }
              className="afro"
              alt={altText}
            />
            {altTextToggle ? <i>{altText}</i> : ""}
          </div>
          <button className="btn" onClick={toggleAlt}>
            view alt text
          </button>
          <div>
            <button onClick={handleClick} className="btn">
              ColorBlind Switch
            </button>
            <button className="btn" onClick={reset}>
              Restore Image
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
