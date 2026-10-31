import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Download, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import axios from "axios";
import { portfolioData } from "../../data/portfolio";
import { GithubIcon, LinkedinIcon } from "../visual/SocialIcons";

const EMAIL = portfolioData.header.email;
const emptyForm = { name: "", email: "", message: "" };

function contactError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 422)
      return "Please check your name, email address, and message, then try again.";
    if (error.code === "ECONNABORTED")
      return "Delivery wasn’t confirmed in time. Please try again later or email me directly.";
  }
  return "Your message couldn’t be sent. Please try again, or email me directly.";
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const request = useRef<AbortController | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const confirmation = useRef<HTMLHeadingElement>(null);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (status === "sent") confirmation.current?.focus();
  }, [status]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current || !event.currentTarget.reportValidity()) return;
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      setError(
        "Please complete every field. Your name and message cannot contain only spaces.",
      );
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    setError(null);
    const controller = new AbortController();
    request.current = controller;
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || "")
        .trim()
        .replace(/\/+$/, "");
      const response = await axios.post<{ message: string }>(
        `${baseUrl}/contact`,
        payload,
        { timeout: 60000, signal: controller.signal },
      );
      if (controller.signal.aborted) return;
      if (
        typeof response.data?.message !== "string" ||
        !response.data.message.trim()
      )
        throw new Error("Missing submission confirmation");
      setStatus("sent");
      setForm(emptyForm);
    } catch (failure: unknown) {
      if (controller.signal.aborted) return;
      setStatus("idle");
      setError(contactError(failure));
    } finally {
      inFlight.current = false;
      request.current = null;
    }
  };

  const writeAnother = () => {
    setStatus("idle");
    setError(null);
    setForm(emptyForm);
    requestAnimationFrame(() => nameInput.current?.focus());
  };

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("copied");
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopyStatus("idle"), 2000);
    } catch { setCopyStatus("error"); }
  };

  return (
    <section id="connect" className="contact-section section-shell">
      <div className="section-heading"><h2>Let’s connect.</h2><span>Good software starts with a conversation.</span></div>
      <p className="section-description">Interested in collaborating or have a question? Feel free to reach out.</p>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Have something<br /> in mind?</h3>
          <a className="footer-email-button contact-email-button" href={`mailto:${EMAIL}`}>
            <Mail size={23} strokeWidth={1.5} aria-hidden="true" />
            <span>{EMAIL}</span>
            <ArrowUpRight size={23} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <div className="contact-copy-row">
            <button type="button" aria-label="Copy email address" onClick={copyEmail}>{copyStatus === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}Copy email</button>
            <span className="copy-status" aria-live="polite">{copyStatus === "copied" ? "COPIED ✓" : copyStatus === "error" ? "Couldn’t copy automatically. Select the address above, or use the form." : ""}</span>
          </div>
          <nav className="contact-socials" aria-label="Contact social profiles">
            <a className="footer-social-link" href={portfolioData.header.links.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={28} /><span>LinkedIn</span></a>
            <a className="footer-social-link" href={portfolioData.header.links.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={28} /><span>GitHub</span></a>
          </nav>
          <a className="contact-detail contact-detail-action" href={`tel:+91${portfolioData.header.phone}`}>
            <span className="contact-detail-icon"><Phone size={19} strokeWidth={1.5} aria-hidden="true" /></span>
            <div><span className="small-label">PHONE</span><span>+91 {portfolioData.header.phone}</span></div>
            <span className="contact-detail-badge">CALL<ArrowUpRight size={13} aria-hidden="true" /></span>
          </a>
          <div className="contact-detail">
            <span className="contact-detail-icon"><MapPin size={19} strokeWidth={1.5} aria-hidden="true" /></span>
            <div><span className="small-label">LOCATION</span><span>{portfolioData.header.location}</span></div>
          </div>
          <a href="/ayush-ai_cv.pdf" download="ayush-ai_cv.pdf" target="_blank" rel="noopener noreferrer" className="pill-button contact-resume">
            <span className="contact-resume-icon"><Download size={18} aria-hidden="true" /></span>
            <span>Download resume</span><span className="contact-pdf-badge">PDF</span><ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="contact-form-card">
          {status === "sent" ? <div className="form-confirmation" role="status"><span className="confirmation-check"><Check size={28} /></span><h3 ref={confirmation} tabIndex={-1}>Message sent</h3><p>Thanks for reaching out. Your message has been sent to Ayush.</p><button type="button" className="pill-button" onClick={writeAnother}>WRITE ANOTHER</button></div> :
          <form aria-label="Send a message" aria-busy={status === "sending"} onSubmit={submit}>
            <div className="form-heading"><span>Send a message</span><Send size={18} strokeWidth={1.3} aria-hidden="true" /></div>
            <label><span>NAME</span><input ref={nameInput} name="name" type="text" autoComplete="name" required maxLength={200} disabled={status === "sending"} placeholder="Your name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></label>
            <label><span>EMAIL</span><input name="email" type="email" autoComplete="email" required maxLength={254} disabled={status === "sending"} placeholder="your@email.com" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></label>
            <label><span>MESSAGE</span><textarea name="message" rows={4} required maxLength={5000} disabled={status === "sending"} aria-describedby="contact-message-count" placeholder="What would you like to build?" value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} /></label>
            <p id="contact-message-count" className="contact-message-count">{form.message.length.toLocaleString()} / 5,000 characters</p>
            {error && <p className="form-error" role="alert">{error} <a href={`mailto:${EMAIL}`}>Email {EMAIL}</a></p>}
            <button className="pill-button submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? <>SENDING MESSAGE<LoaderCircle size={17} className="animate-spin" /></> : <>SEND MESSAGE<ArrowUpRight size={17} /></>}</button>
          </form>}
        </div>
      </div>
    </section>
  );
}
