"use client";

import { useEffect, useState } from "react";
import { API_BASE, TOPICS } from "@/lib/config";
import { Check } from "./Icons";
import { TOPIC_EVENT } from "./InquireButton";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Preselect the dropdown: from ?topic=visa (arriving from another page) or when an
  // "Inquire now" button on this page is pressed.
  useEffect(() => {
    const valid = (t: string | null) => !!t && TOPICS.some((o) => o.value === t);
    const fromUrl = new URLSearchParams(window.location.search).get("topic");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable after hydration
    if (valid(fromUrl)) setTopic(fromUrl as string);
    const onTopic = (e: Event) => {
      const t = (e as CustomEvent<string>).detail;
      if (valid(t)) setTopic(t);
    };
    window.addEventListener(TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(TOPIC_EVENT, onTopic);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      setTopic("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <span className="done-badge">
          <Check width={28} height={28} />
        </span>
        <h3>Message sent</h3>
        <p>Thank you! Our team will get back to you shortly.</p>
        <button className="btn btn-ink" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <label>
        <span>Your name</span>
        <input name="name" required maxLength={100} autoComplete="name" />
      </label>
      <div className="form-row">
        <label>
          <span>Email</span>
          <input name="email" type="email" required maxLength={150} autoComplete="email" />
        </label>
        <label>
          <span>What you need help with</span>
          <select
            name="topic"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            {TOPICS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Briefly explain your requirement</span>
        <textarea name="message" rows={5} required maxLength={3000} />
      </label>
      {/* honeypot: real visitors never see or fill this */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hp"
      />
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button className="btn btn-ink btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
