"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LINKS, NAV } from "@/lib/config";
import { ArrowRight, Facebook, Instagram } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Close the mobile menu after navigating.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section in the middle of the screen.
  useEffect(() => {
    if (!onHome) return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cls = (id: string) => (onHome && active === id ? "active" : "");

  return (
    <header className={`site-header ${scrolled || open ? "is-solid" : ""} ${open ? "menu-open" : ""}`}>
      <div className="header-bar">
        <Link href="/#home" className="brand" aria-label="Travel 7 home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Travel 7 - your journey starts here" width={120} height={48} />
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              className={cls(n.id)}
              aria-current={onHome && active === n.id ? "true" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="btn btn-ink header-cta">
          Get in touch <ArrowRight />
        </Link>

        <button
          className={`burger ${open ? "open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`nav-mobile ${open ? "open" : ""}`}>
        <nav aria-label="Mobile">
          {NAV.map((n, i) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              className={cls(n.id)}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
            >
              <span className="num">0{i + 1}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <Link href="/#contact" className="btn btn-ink" onClick={() => setOpen(false)}>
            Get in touch <ArrowRight />
          </Link>
          <div className="socials">
            <a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram">
              <Instagram />
            </a>
            <a href={LINKS.facebook} target="_blank" rel="noopener" aria-label="Facebook">
              <Facebook />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
