import { MotionConfig } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Overview from "../components/sections/Overview";
import Projects from "../components/sections/Projects";
import Experiments from "../components/sections/Experiments";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import Research from "../components/sections/Research";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import AmbientField from "../components/visual/AmbientField";
import PortfolioGuide from "../components/visual/PortfolioGuide";

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio">
        <a href="#intro" className="skip-link">Skip to content</a>
        <AmbientField />
        <Navbar />
        <main>
          <Hero />
          <Overview />
          <Projects />
          <Experiments />
          <About />
          <Experience />
          <Education />
          <Research />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <PortfolioGuide />
      </div>
    </MotionConfig>
  );
}
