"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo/vision.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    let mm = gsap.matchMedia();

    mm.add("(max-width:768px)", () => {
      gsap.to(".menu", {
        xPercent: isNavOpen ? 100 : -100,
        duration: 0.5,
      });
    });
  };

  useGSAP(() => {
    let mm = gsap.matchMedia();

    if (isNavOpen) {
      gsap.set(".body", { overflow: "hidden" });
    } else {
      gsap.set(".body", { overflow: "unset" });
    }

    mm.add("(min-width:768px)", () => {
      const showAnim = gsap
        .from(".navigation", {
          yPercent: -100,
          paused: true,
          duration: 0.2,
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });
    });
  }, [isNavOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsNavOpen(false);
        gsap.set(".menu", { clearProps: "all" });
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <nav className="py-2 navigation">
      <div className="container nav-container">
        <Link href="/">
          <Image width={100} height={50} src={logo} alt="Company Logo" />
        </Link>

        <ul className={`menu menu-${isNavOpen ? "open" : "closed"}`}>
          <li className="menu-item">
            <Link className="navigation-link" href="/propiedades">
              PROPIEDADES
            </Link>
          </li>

          <li className="menu-item">
            <Link className="navigation-link" href="/contact">
              CONTACTAR
            </Link>
          </li>
        </ul>
        <button onClick={toggleNav} className="toggler">
          <RxHamburgerMenu className="toggler-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
