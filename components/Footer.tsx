import Link from "next/link";
import { LINKS, MAPS_URL, NAV, SITE, GENERAL_PHONE, formatPhone } from "@/lib/config";
import { ArrowUpRight, Facebook, Instagram, Pin } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Travel 7" width={120} height={48} className="footer-logo" />
          <p>
            At Travel7, we believe that every journey begins with trust. IATA-accredited and based
            in the heart of Colombo.
          </p>
          <div className="socials">
            <a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram">
              <Instagram />
            </a>
            <a href={LINKS.facebook} target="_blank" rel="noopener" aria-label="Facebook">
              <Facebook />
            </a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <Link href={`/#${n.id}`}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/visa-checklist/">Visa checklist</Link>
            </li>
            <li>
              <a href={LINKS.goHolidays} target="_blank" rel="noopener">
                Go Holidays <ArrowUpRight width={14} height={14} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Visit &amp; call</h3>
          <address>
            <strong>{SITE.name}</strong>
            <br />
            {SITE.address}
          </address>
          <a className="footer-link" href={MAPS_URL} target="_blank" rel="noopener">
            <Pin width={16} height={16} /> Get directions
          </a>
          <a className="footer-link" href={`tel:${GENERAL_PHONE}`}>
            General: {formatPhone(GENERAL_PHONE)}
          </a>
        </div>
      </div>
      <div className="wrap copyright">
        <span>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <span>A United Ventures Group company</span>
      </div>
    </footer>
  );
}
