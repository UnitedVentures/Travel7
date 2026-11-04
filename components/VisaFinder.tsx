"use client";

import { useMemo, useState } from "react";
import { VISA_DATA } from "@/lib/visa-data";
import InquireButton from "./InquireButton";
import { ArrowUpRight, ChevronLeft } from "./Icons";

const VFS = /VFS|VAC|service charge/i;

export default function VisaFinder() {
  const [q, setQ] = useState("");
  const [cur, setCur] = useState<string | null>(null);
  const [type, setType] = useState<"tourist" | "business">("tourist");

  const countries = useMemo(
    () => Object.keys(VISA_DATA).filter((k) => k.toLowerCase().includes(q.trim().toLowerCase())),
    [q],
  );

  const pick = (k: string) => {
    setCur(k);
    setType("tourist");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (cur) {
    const c = VISA_DATA[cur];
    const d = c[type];
    const vfs = d.extras.find((r) => VFS.test(r[0]));
    const others = d.extras.filter((r) => r !== vfs);

    return (
      <div className="vf-detail" key={cur + type}>
        <button className="vf-back" onClick={() => setCur(null)}>
          <ChevronLeft width={18} height={18} /> All countries
        </button>
        <h2 className="vf-title display">
          <span className="vf-flag">{c.flag}</span> {cur}
        </h2>

        <div className="tabs" role="tablist">
          {(["tourist", "business"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={type === t}
              className={type === t ? "on" : ""}
              onClick={() => setType(t)}
            >
              {t === "tourist" ? "Tourist" : "Business"} visa
            </button>
          ))}
        </div>

        <div className="vf-grid">
          <section className="glass vf-key">
            <div>
              <small>Processing time (after submission)</small>
              <b>{d.time}</b>
            </div>
            <div>
              <small>Visa fee</small>
              <b>{d.fee}</b>
            </div>
            <div>
              <small>VFS service fee</small>
              <b>{vfs ? vfs[1] : "To be confirmed"}</b>
            </div>
          </section>

          <section className="glass">
            <h3 className="eyebrow">Other additional costs</h3>
            <table className="vf-table">
              <tbody>
                {(others.length ? others : [["None", "—"] as [string, string]]).map((r) => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="glass">
            <h3 className="eyebrow">Travel7 processing time</h3>
            <p>
              <b>2 to 4 working days</b> for our handling, depending on workload and urgency.
            </p>
          </section>

          <section className="glass vf-list">
            <h3 className="eyebrow">Visa checklist</h3>
            <ul className="checklist">
              {d.docs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            {d.pdf ? (
              <a className="btn btn-ink" href={d.pdf} target="_blank" rel="noopener">
                Download checklist PDF <ArrowUpRight width={16} height={16} />
              </a>
            ) : (
              <p className="muted small">Checklist PDF coming soon.</p>
            )}
          </section>
        </div>

        <div className="vf-cta">
          <InquireButton topic="visa" className="btn btn-ink btn-lg">
            Inquire about this visa
          </InquireButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <input
        className="vf-search"
        type="search"
        placeholder="Search country (e.g. United Kingdom, Schengen, Canada)…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoComplete="off"
        aria-label="Search country"
      />
      <div className="vf-countries">
        {countries.map((k, n) => (
          <button
            key={k}
            className="vf-country"
            onClick={() => pick(k)}
            style={{ animationDelay: `${n * 50}ms` }}
          >
            <span className="vf-flag">{VISA_DATA[k].flag}</span>
            {k}
          </button>
        ))}
      </div>
      {!countries.length && (
        <p className="muted">
          No country found. More destinations are coming soon —{" "}
          <InquireButton topic="visa" className="link">
            ask us about your destination
          </InquireButton>
          .
        </p>
      )}
      <p className="muted small vf-note">
        Indicative figures for reference only — always confirm current fees, checklists and
        processing times with the embassy / VFS.
      </p>
    </div>
  );
}
