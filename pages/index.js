import { Cloudinary } from "@cloudinary/url-gen";
import { simulateColorBlind } from "@cloudinary/url-gen/actions/effect";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [darkTheme, setDarkTheme] = useState(undefined);
  const [colorBlindEffect, setColorBlindEffect] = useState("");

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
              Hey I’m Johnpaul
            </h1>
            <h3>
              I am a frontend developer, writer, cowrywise brand ambassador and
              a product student at altschool.
            </h3>
            <p>
              You can find me on
              <span>
                <a
                  href="https://twitter.com/operascode"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </span>
              where I talk about design and development topics. I am glad you
              are hear. I would love to speak and talk to new happy faces and
              share my work process and tech talks with you.
            </p>
            <button className="primary-btn">Connect with me</button>
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
              alt="woman afro"
            />
          </div>
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
