"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);
const Hero = () => {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      gsap.set(".split", { opacity: 1 });

      let split;
      SplitText.create(".heading", {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          split = gsap.from(self.lines, {
            duration: 0.6,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
          });
          return split;
        },
      });
    });
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <h1 className="text-light fw-bolder fs-1 heading">
          Cada cliente una historia Cada propiedad, un sueño cumplido.
        </h1>
      </div>
    </section>
  );
};

export default Hero;
