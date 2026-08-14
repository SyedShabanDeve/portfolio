import { useState } from "react";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { NAV } from "./data/site";
import { useActiveSection } from "./hooks/useActiveSection";
import { useScrollState } from "./hooks/useScrollState";
import { useTheme } from "./hooks/useTheme";

/* Module scope keeps the reference stable across renders. */
const SECTION_IDS = ["home", ...NAV.map((item) => item.id)];

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, stuck, past } = useScrollState();
  const active = useActiveSection(SECTION_IDS);

  return (
    <div className="grain">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <span className="progress" style={{ "--progress": progress }} aria-hidden="true" />

      <Navbar
        active={active}
        stuck={stuck}
        theme={theme}
        onToggleTheme={toggleTheme}
        open={menuOpen}
        onOpenChange={setMenuOpen}
      />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <BackToTop shown={past} />
    </div>
  );
}
