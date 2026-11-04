"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { API_BASE, LINKS, SEED_REVIEWS } from "@/lib/config";
import { Check, ChevronLeft, ChevronRight, QuoteOpen } from "./Icons";

type Review = { id: number; name: string; text: string };
type Status = "idle" | "sending" | "sent" | "error";

function GoogleButton() {
  return (
    <a className="btn btn-outline btn-google" href={LINKS.googleReview} target="_blank" rel="noopener">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/google.png" alt="Google" width={58} height={19} /> Review
    </a>
  );
}

function ReviewForm({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/review-submit.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <span className="done-badge">
          <Check />
        </span>
        <h3>Thank you!</h3>
        <p>Your review has been received and will appear on this page once it’s approved.</p>
        <button className="btn btn-ink" onClick={onDone}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        <span>Your name</span>
        <input name="name" required maxLength={80} autoComplete="name" />
      </label>
      <label>
        <span>Your review</span>
        <textarea name="text" rows={5} required minLength={10} maxLength={2000} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button className="btn btn-ink" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Publish review"}
        </button>
      </div>
    </form>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const [open, setOpen] = useState(false);
  const long = r.text.length > 300;
  const initials = r.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <figure className="review">
      <QuoteOpen className="quote" />
      <blockquote className={long && !open ? "clamped" : ""}>
        {r.text.split(/\n\s*\n/).map((p, k) => (
          <p key={k}>{p}</p>
        ))}
      </blockquote>
      {long && (
        <button className="read-more" onClick={() => setOpen((v) => !v)}>
          {open ? "Show less" : "Read more"}
        </button>
      )}
      <figcaption>
        <span className="avatar">{initials}</span>
        <span>
          <b>{r.name}</b>
          <small>Travel7 customer</small>
        </span>
      </figcaption>
    </figure>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [dialog, setDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target only exists in the browser
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    fetch(`${API_BASE}/reviews.php`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => Array.isArray(j.reviews) && j.reviews.length && setReviews(j.reviews))
      .catch(() => {}); // keep seed reviews if the API isn't reachable
  }, []);

  useEffect(() => {
    if (!dialog) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDialog(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [dialog]);

  const scroll = (d: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: d * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <>
      <div className="reviews-head">
        <div className="reviews-actions">
          <button className="btn btn-ink" onClick={() => setDialog(true)}>
            Write a review
          </button>
          <GoogleButton />
        </div>
        <div className="reviews-nav">
          <button onClick={() => scroll(-1)} aria-label="Previous reviews">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next reviews">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="review-track" ref={track} tabIndex={0} aria-label="Customer reviews">
        {reviews.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>

      {mounted &&
        createPortal(
          <>
            <div className={`sheet-backdrop ${dialog ? "open" : ""}`} onClick={() => setDialog(false)} />
            <div
              className={`sheet ${dialog ? "open" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label="Leave a review"
              aria-hidden={!dialog}
            >
              <div className="sheet-grip" />
              <div className="sheet-head">
                <h3>Leave a review</h3>
                <button className="sheet-close" onClick={() => setDialog(false)} aria-label="Close">
                  ×
                </button>
              </div>
              <p className="sheet-intro">
                Your opinion is important to us, and we’d love to know how we did. Write a few words
                here, or review us on Google.
              </p>
              {dialog && <ReviewForm onDone={() => setDialog(false)} />}
              <div className="sheet-alt">
                <GoogleButton />
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
