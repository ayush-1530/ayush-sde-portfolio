import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Education from "../components/sections/Education";
import Research from "../components/sections/Research";
import CustomCursor from "../components/visual/CustomCursor";
import { MotionConfig } from "framer-motion";

const LandingPage = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio min-h-screen bg-[#07070F] text-[#EFECE3] grain-overlay relative">
        <a href="#intro" className="skip-link">
          Skip to content
        </a>
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <About />
          <Education />
          <Research />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
};

export default LandingPage;
