import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import axios from "axios";
import TiltPanel from "../visual/TiltPanel";
import { portfolioData } from "../../data/portfolio";

const EMAIL = portfolioData.header.email;
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const emptyForm = { name: "", email: "", message: "" };
const inputClass =
  "w-full bg-[#07070F] border border-[#2A2840] text-[#EFECE3] text-[16px] px-4 py-3.5 outline-none placeholder:text-[#6D6880] transition-all focus:border-[#E8873A] focus:shadow-[0_10px_30px_-10px_rgba(232,135,58,0.6)] focus:-translate-y-0.5 disabled:opacity-60";

type InfoCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  action?: "COPY" | "CALL";
  delay: number;
  visible: boolean;
};

function InfoCard({
  icon,
  label,
  value,
  href,
  action,
  delay,
  visible,
}: InfoCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  const content = (
    <TiltPanel
      max={10}
      className="group border border-[#2A2840] hover:border-[#E8873A] bg-[#0D0D1C] p-6 flex flex-col items-start gap-5 transition-colors h-full"
    >
      <div
        className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#F09844] to-[#B45A16] text-[#07070F] shrink-0"
        style={{
          transform: "translateZ(40px)",
          boxShadow:
            "0 14px 24px -8px rgba(232,135,58,0.6), inset 0 2px 0 rgba(255,235,210,0.5)",
        }}
      >
        {icon}
      </div>
      <div className="w-full min-w-0" style={{ transform: "translateZ(24px)" }}>
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[12px] tracking-widest text-[#F09844] mb-1"
        >
          {label}
        </div>
        <div
          title={value}
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-[17px] text-[#EFECE3] truncate"
        >
          {value}
        </div>
      </div>
      {action && (
        <span
          aria-live="polite"
          style={{
            fontFamily: "var(--font-mono)",
            transform: "translateZ(30px)",
          }}
          className="absolute top-6 right-6 text-[12px] tracking-widest font-semibold text-[#07070F] bg-[#E8873A] group-hover:bg-[#F09844] px-3 py-2 transition-colors"
        >
          {copied ? "COPIED ✓" : action}
        </span>
      )}
      {copyError && (
        <span role="status" className="text-sm text-[#F09844]">
          Couldn’t copy automatically. Select the address above, or use the form
          below.
        </span>
      )}
    </TiltPanel>
  );

  const animation = {
    initial: { opacity: 0, x: -30 },
    animate: visible ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.7, delay, ease },
  };
  if (action === "COPY")
    return (
      <motion.button
        {...animation}
        type="button"
        aria-label="Copy email address"
        className="block w-full min-w-0 text-left"
        onClick={copy}
      >
        {content}
      </motion.button>
    );
  if (href)
    return (
      <motion.a
        {...animation}
        href={href}
        className="block min-w-0 no-underline"
      >
        {content}
      </motion.a>
    );
  return (
    <motion.div {...animation} className="min-w-0">
      {content}
    </motion.div>
  );
}

function Field({
  label,
  children,
  depth,
}: {
  label: string;
  children: ReactNode;
  depth: number;
}) {
  return (
    <label
      className="block group/field"
      style={{ transform: `translateZ(${depth}px)` }}
    >
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className="block text-[12px] tracking-widest text-[#C2BDB2] group-focus-within/field:text-[#F09844] mb-2 transition-colors"
      >
        {label}
      </span>
      {children}
    </label>
  );
}

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

  return (
    <section
      id="connect"
      className="relative bg-[#07070F] py-28 px-8 md:px-14 min-h-screen flex flex-col justify-between overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#E8873A 1px, transparent 1px), linear-gradient(90deg, #E8873A 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 70% 40%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 40%, black, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1100px] w-full min-w-0 mx-auto flex-1 flex flex-col">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.35em] text-[#E8873A]"
            >
              08
            </span>
            <div className="w-6 h-px bg-[#E8873A]" />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] tracking-[0.2em] text-[#C2BDB2]"
            >
              CONNECT
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-[clamp(44px,7vw,96px)] text-[#EFECE3] leading-[0.95] mb-5"
          >
            Let's <span className="text-[#E8873A]">Connect</span>
          </h2>
          <p
            style={{ fontFamily: "var(--font-sans)" }}
            className="text-[17px] text-[#C2BDB2] max-w-lg mb-14 leading-relaxed"
          >
            Interested in collaborating or have a question? Feel free to reach
            out.
          </p>
        </motion.div>
        <div style={{ perspective: 1400 }}>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <InfoCard
              icon={<Mail size={26} strokeWidth={1.7} aria-hidden="true" />}
              label="EMAIL"
              value={EMAIL}
              action="COPY"
              delay={0.1}
              visible={isInView}
            />
            <InfoCard
              icon={<Phone size={26} strokeWidth={1.7} aria-hidden="true" />}
              label="PHONE"
              value={`+91 ${portfolioData.header.phone}`}
              href={`tel:+91${portfolioData.header.phone}`}
              action="CALL"
              delay={0.2}
              visible={isInView}
            />
            <InfoCard
              icon={<MapPin size={26} strokeWidth={1.7} aria-hidden="true" />}
              label="LOCATION"
              value={portfolioData.header.location}
              delay={0.3}
              visible={isInView}
            />
          </div>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-center">
            <motion.div
              className="max-w-[420px] w-full mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 border border-[#E8873A]/60"
                  style={{ transform: "translate(14px, 14px)" }}
                />
                <div className="relative overflow-hidden border border-[#E8873A] bg-[#0D0D1C]">
                  <img
                    src="/images/ayush-casual.jpeg"
                    alt="Ayush Negi"
                    loading="lazy"
                    width={600}
                    height={750}
                    className="w-full h-[520px] object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07070F] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-4xl text-[#EFECE3] leading-none"
                    >
                      Ayush Negi
                    </div>
                    <div
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-[12px] tracking-widest text-[#F09844] mt-3"
                    >
                      SOFTWARE DEVELOPER ENGINEER
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              <TiltPanel
                max={5}
                className="border border-[#E8873A]/50 bg-[#0D0D1C] p-7 md:p-9 shadow-[0_40px_80px_-30px_rgba(232,135,58,0.35)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -z-10 inset-0 translate-x-3 translate-y-3 border border-[#E8873A]/30"
                  style={{
                    transform: "translateZ(-30px) translate(12px, 12px)",
                  }}
                />
                {status === "sent" ? (
                  <div
                    role="status"
                    className="py-16 text-center"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <div
                      aria-hidden="true"
                      className="mx-auto w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#F09844] to-[#B45A16] text-[#07070F] text-4xl mb-6"
                      style={{
                        boxShadow: "0 18px 30px -8px rgba(232,135,58,0.7)",
                      }}
                    >
                      ✓
                    </div>
                    <h3
                      ref={confirmation}
                      tabIndex={-1}
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-3xl text-[#EFECE3] mb-2 focus:outline-none"
                    >
                      Message sent
                    </h3>
                    <p
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[15px] text-[#C2BDB2] mb-6"
                    >
                      Thanks for reaching out. Your message has been sent to
                      Ayush.
                    </p>
                    <button
                      type="button"
                      onClick={writeAnother}
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-[12px] tracking-widest font-semibold border-2 border-[#E8873A] text-[#F09844] hover:bg-[#E8873A] hover:text-[#07070F] px-6 py-3 transition-colors"
                    >
                      WRITE ANOTHER
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={submit}
                    aria-label="Send a message"
                    aria-busy={status === "sending"}
                    className="space-y-6"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Field label="NAME" depth={20}>
                      <input
                        ref={nameInput}
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        maxLength={200}
                        disabled={status === "sending"}
                        className={inputClass}
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(event) =>
                          setForm({ ...form, name: event.target.value })
                        }
                      />
                    </Field>
                    <Field label="EMAIL" depth={30}>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        disabled={status === "sending"}
                        className={inputClass}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(event) =>
                          setForm({ ...form, email: event.target.value })
                        }
                      />
                    </Field>
                    <Field label="MESSAGE" depth={40}>
                      <textarea
                        name="message"
                        required
                        maxLength={5000}
                        rows={5}
                        disabled={status === "sending"}
                        className={`${inputClass} resize-y`}
                        placeholder="Your message..."
                        value={form.message}
                        onChange={(event) =>
                          setForm({ ...form, message: event.target.value })
                        }
                      />
                    </Field>
                    {error && (
                      <p
                        role="alert"
                        className="text-sm leading-relaxed text-[#F09844]"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        {error}{" "}
                        <a
                          href={`mailto:${EMAIL}`}
                          className="underline underline-offset-4"
                        >
                          Email {EMAIL}
                        </a>
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      style={{
                        fontFamily: "var(--font-mono)",
                        transform: "translateZ(60px)",
                        boxShadow:
                          "0 8px 0 #8A430F, 0 22px 30px -10px rgba(232,135,58,0.6)",
                      }}
                      className="w-full flex items-center justify-center gap-3 bg-[#E8873A] hover:bg-[#F09844] text-[#07070F] font-bold text-[14px] tracking-widest py-5 transition-all active:translate-y-2 active:!shadow-[0_0_0_#8A430F] disabled:opacity-60 disabled:cursor-wait"
                    >
                      {status === "sending" ? (
                        <>
                          SENDING MESSAGE{" "}
                          <LoaderCircle
                            size={26}
                            className="animate-spin"
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        <>
                          SEND MESSAGE{" "}
                          <Mail
                            size={26}
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </TiltPanel>
            </motion.div>
          </div>
        </div>
      </div>
      <footer className="relative max-w-[1100px] w-full mx-auto border-t border-[#2A2840] pt-8 mt-20 flex flex-col md:flex-row justify-between gap-3">
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[12px] tracking-widest text-[#9A94A8]"
        >
          AYUSH NEGI — SOFTWARE DEVELOPER ENGINEER
        </span>
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[12px] tracking-widest text-[#9A94A8]"
        >
          NEW DELHI, INDIA · {new Date().getFullYear()}
        </span>
      </footer>
    </section>
  );
}
