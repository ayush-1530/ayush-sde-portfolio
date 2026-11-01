import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";
import { projects, experiences, layers } from "../../data/content";
import { portfolioData } from "../../data/portfolio";

type Answer = { text: string; href?: string; label?: string };
function findAnswer(question: string): Answer {
  const query = question.toLowerCase();
  if (/contact|email|reach|hire|collaborat|phone/.test(query)) return { text: `You can reach Ayush at ${portfolioData.header.email}, or +91 ${portfolioData.header.phone}. He's based in ${portfolioData.header.location}.`, href: "#connect", label: "Send a message" };
  if (/experience|work|job|drdo|nic|zindagi|journey/.test(query)) return { text: `Ayush has 2+ years of experience. ${experiences.map(item => `${item.role} at ${item.company} (${item.period}).`).join(" ")}`, href: "#journey", label: "Explore the journey" };
  if (/project|rag|agent|build|code|clock|vision/.test(query)) return { text: `Ayush’s projects include ${projects.map(item => item.title).join(", ")}. ${projects[0].description}`, href: "#built", label: "See the projects" };
  if (/skill|stack|python|java|fastapi|tech|language/.test(query)) return { text: layers.map(layer => `${layer.layer}: ${layer.techs.slice(0, 5).join(", ")}.`).join(" "), href: "#systems", label: "Explore the stack" };
  if (/educat|degree|college|university|resume|cv/.test(query)) return { text: "B.Tech Computer Science Engineering, Inderprastha Engineering College · AKTU, 2021–2025, First Division. You can download his resume for the full details.", href: "/ayush-ai_cv.pdf", label: "View resume" };
  return { text: "Ayush is a software engineer building secure, scalable backend systems at Zindagi Technologies. Outside work, he explores AI, multi-agent systems, RAG, and computer vision. Ask about his projects, experience, stack, or contact details.", href: "#thinking", label: "Get to know Ayush" };
}

export default function PortfolioGuide() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    const outside = (event: PointerEvent) => { if (!panel.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener("keydown", keydown);
    window.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("keydown", keydown); window.removeEventListener("pointerdown", outside); };
  }, [open]);
  const ask = (value: string) => { setQuestion(value); setAnswer(findAnswer(value)); };
  const submit = (event: FormEvent) => { event.preventDefault(); if (question.trim()) ask(question.trim()); };
  return (
    <>
      {open && <div ref={panel} className="portfolio-guide glass" role="dialog" aria-label="Ask about Ayush" aria-modal="false"><div className="guide-header"><span><i className="availability-dot" />Ask about Ayush</span><button type="button" aria-label="Close portfolio guide" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={18} /></button></div><div className="guide-body"><p>Hi there. What would you like to know?</p><div className="guide-prompts">{["Projects", "Experience", "Stack", "Contact"].map(prompt => <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}<ArrowUpRight size={13} /></button>)}</div>{answer && <div className="guide-answer" aria-live="polite"><p>{answer.text}</p>{answer.href && <a href={answer.href} onClick={() => setOpen(false)}>{answer.label}<ArrowUpRight size={14} /></a>}</div>}</div><form onSubmit={submit}><input ref={input} aria-label="Question about Ayush" placeholder="Ask about Ayush…" maxLength={500} value={question} onChange={event => setQuestion(event.target.value)} /><button type="submit" aria-label="Ask question"><Send size={17} /></button></form><span className="guide-note">Answers from this portfolio.</span></div>}
      <button ref={trigger} type="button" className="guide-trigger glass" aria-label={open ? "Close portfolio guide" : "Ask about Ayush"} aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X size={20} /> : <MessageCircle size={20} strokeWidth={1.4} />}</button>
    </>
  );
}
