import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Links from "../Links/Links";

const DropdownItem = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timeoutRef = useRef(null);

  // Escucha resize para detectar mobile o desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(timeoutRef.current);
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setShowDropdown(false);
      }, 400);
    }
  };

  if (isMobile) {
    return (
      <div className="linksNavOpen">
        <Links />
      </div>
    );
  }

  return (
    <li
      className="nav-item dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-link dropbtn">
        Mis Redes <i className="fa fa-caret-down"></i>
      </div>
      {showDropdown && (
        <div className="dropdown-content">
          <Links />
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollingActive, setScrollingActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollingActive(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scrollingActive ? "scrolling-active" : ""}>
      <div className="container">
        <nav className={menuOpen ? "nav open" : "nav"}>
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
          <a href="/" className="nav-brand">
            GONORTE
          </a>
          <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
            <li
              className="nav-item"
              onClick={() => (menuOpen ? setMenuOpen(!menuOpen) : {})}
            >
              <a href="#hero" className="nav-link">
                Inicio
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => (menuOpen ? setMenuOpen(!menuOpen) : {})}
            >
              <a href="#objetivos" className="nav-link">
                Objetivos
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => (menuOpen ? setMenuOpen(!menuOpen) : {})}
            >
              <a href="#services" className="nav-link">
                Servicios
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => (menuOpen ? setMenuOpen(!menuOpen) : {})}
            >
              <a href="#about" className="nav-link">
                Sobre mí
              </a>
            </li>

            {/* Dropdown personalizado con lógica de aparición/desaparición */}
            <DropdownItem />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
