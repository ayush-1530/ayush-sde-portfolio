import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const greetings = [
  "Hi, I’m Ayush. Scroll down and I’ll show you around.",
  "Secure systems at work. AI experiments after hours.",
  "Have something in mind? Let’s connect below!",
];

export default function SketchMascot() {
  const [greeting, setGreeting] = useState(0);
  const reducedMotion = useReducedMotion();
  return (
    <div className="mascot-stage">
      <div className="mascot-orbit" aria-hidden="true" />
      <div className="mascot-speech" aria-live="polite">{greetings[greeting]}<span className="speech-spark" aria-hidden="true">✳</span></div>
      <motion.button type="button" className="mascot-button" aria-label="Say hello to illustrated Ayush"
        onClick={() => setGreeting(value => (value + 1) % greetings.length)}
        whileHover={reducedMotion ? undefined : { rotate: -3, y: -6 }}
        whileTap={reducedMotion ? undefined : { rotate: 5, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 220, damping: 15 }}
      ><img src="/images/ayush-sketch.png" alt="Hand-drawn cartoon of Ayush Negi waving, with swept-up hair and a blue blazer" width={1024} height={1536} draggable={false} /></motion.button>
      <span className="mascot-footnote">A LITTLE SKETCH OF ME. SAY HI! ↗</span>
    </div>
  );
}
