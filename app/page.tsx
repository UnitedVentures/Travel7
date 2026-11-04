import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Img from "@/components/Img";
import InquireButton from "@/components/InquireButton";
import Reveal from "@/components/Reveal";
import ReviewsSection from "@/components/ReviewsSection";
import VmvTabs from "@/components/VmvTabs";
import {
  ArrowRight,
  ArrowUpRight,
  IconHoliday,
  IconInsurance,
  IconPassport,
  IconTickets,
  Mail,
  Phone,
  Pin,
  Tick,
  WhatsApp,
} from "@/components/Icons";
import { CONTACT_GROUPS, GENERAL_PHONE, LINKS, MAPS_URL, SITE, formatPhone } from "@/lib/config";

const GO_POINTS = [
  ["Personalized itineraries", "Tailor your travel plans to suit your unique interests and preferences."],
  ["Expert knowledge", "Leverage our extensive global expertise and insider insights."],
  ["Effortless booking", "Reserve your journey today and take advantage of exclusive offers and discounts."],
];

export default function Home() {
  return (
    <>
      {/* ───────── Home ───────── */}
      <section id="home" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Welcome to Travel7 · Colombo
            </p>
            <h1 className="display hero-title">
              Your gateway to <mark>world-class</mark> travel solutions
            </h1>
            <p className="hero-text">
              At Travel7, we are dedicated to providing seamless travel experiences that combine
              convenience, professionalism, and reliability. Based in the heart of Colombo, we cater to
              individuals, students, and corporate clients with personalized services designed to meet
              all your travel needs.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-ink btn-lg">
                Plan my trip <ArrowRight />
              </a>
              <Link href="/visa-checklist/" className="btn btn-outline btn-lg">
                Visa checklist
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-card-main">
              <Img
                src="/images/hero-woman.webp"
                alt="Traveller with a yellow suitcase"
                priority
                className="cover"
                width={2000}
                height={1333}
              />
            </div>
            <div className="hero-card hero-card-small">
              <Img src="/images/hero-man.webp" alt="Traveller holding a passport and boarding pass" className="cover" width={2000} height={1333} />
            </div>
            <span className="float-chip chip-a">
              <IconTickets width={18} height={18} /> Air tickets
            </span>
            <span className="float-chip chip-b">
              <IconPassport width={18} height={18} /> Visa support
            </span>
            <span className="badge-round">
              <b>Dare to</b>
              <b>be different</b>
            </span>
          </div>
        </div>
      </section>

      {/* ───────── Services ───────── */}
      <section id="services" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Our services</p>
            <h2 className="display h2">Everything for your journey</h2>
            <p className="section-sub">
              From flights and visas to insurance and tailor-made tours, one team handles the
              logistics while you explore the world.
            </p>
          </Reveal>

          <div className="services">
            <Reveal className="svc svc-black">
              <div className="svc-media">
                <Img src="/images/svc-tickets.webp" alt="" width={2000} height={1333} />
              </div>
              <div className="svc-body">
                <div className="svc-head">
                  <span className="svc-icon"><IconTickets /></span>
                  <h3>Air tickets</h3>
                </div>
                <p>
                  Whether you&apos;re booking a domestic flight or planning an international journey,
                  Travel7 ensures you get the best fares and routes, tailored to your schedule and
                  preferences.
                </p>
                <InquireButton topic="air-tickets" className="btn btn-amber">
                  Inquire now <ArrowRight />
                </InquireButton>
              </div>
            </Reveal>

            <Reveal className="svc svc-amber" delay={80}>
              <div className="svc-media">
                <Img src="/images/svc-visa.webp" alt="" width={2000} height={1333} />
              </div>
              <div className="svc-body">
                <div className="svc-head">
                  <span className="svc-icon"><IconPassport /></span>
                  <h3>Visa</h3>
                </div>
                <p>
                  Navigating the complexities of visa applications can be daunting. Our experienced
                  team offers expert guidance and hands-on support to help you secure your travel
                  documents with ease.
                </p>
                <div className="svc-actions">
                  <Link href="/visa-checklist/" className="btn btn-ghost-dark">
                    Visa checklist
                  </Link>
                  <InquireButton topic="visa" className="btn btn-ink btn-hover-red">
                    Inquire now <ArrowRight />
                  </InquireButton>
                </div>
              </div>
            </Reveal>

            <Reveal className="svc svc-white" delay={160}>
              <div className="svc-media">
                <Img src="/images/svc-insurance.webp" alt="" width={2000} height={1333} />
              </div>
              <div className="svc-body">
                <div className="svc-head">
                  <span className="svc-icon"><IconInsurance /></span>
                  <h3>Travel insurance</h3>
                </div>
                <p>
                  Stay protected throughout your trip with our comprehensive travel insurance
                  packages, designed to cover everything from medical emergencies to lost luggage.
                </p>
                <InquireButton topic="insurance" className="btn btn-ink">
                  Inquire now <ArrowRight />
                </InquireButton>
              </div>
            </Reveal>

            <Reveal className="svc svc-green" delay={240}>
              <div className="svc-media">
                <Img src="/images/svc-holiday.webp" alt="" width={1280} height={853} />
              </div>
              <div className="svc-body">
                <div className="svc-head">
                  <span className="svc-icon"><IconHoliday /></span>
                  <h3>Holiday packages</h3>
                </div>
                <p>
                  Explore tailored tour packages by Go Holidays, for personalized adventures, group
                  tours, or relaxing getaways, crafted for every traveler.
                </p>
                <a className="btn btn-ink btn-hover-green" href={LINKS.goHolidays} target="_blank" rel="noopener">
                  Visit Go Holidays <ArrowUpRight />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Go Holidays feature ───────── */}
      <section className="section section-tight">
        <div className="wrap">
          <Reveal className="gohol">
            <div className="gohol-head">
              <p className="eyebrow eyebrow-light">Holiday packages by Go Holidays</p>
              <h2 className="display h2">Embark on a global adventure</h2>
            </div>
            <div className="gohol-copy">
              <p className="gohol-lead">
                Are you ready to explore the wonders of the world? Customize your ideal tour package
                with Go Holidays and embark on an extraordinary journey, with unparalleled
                experiences across the globe.
              </p>
              <ul className="points">
                {GO_POINTS.map(([t, d]) => (
                  <li key={t}>
                    <span className="tick">
                      <Tick />
                    </span>
                    <span>
                      <b>{t}</b>
                      <small>{d}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <a className="btn btn-amber btn-lg" href={LINKS.goHolidays} target="_blank" rel="noopener">
                Customize your tour <ArrowUpRight />
              </a>
            </div>
            <div className="gohol-media">
              <Img src="/images/go-krakow.webp" alt="Traveller with a yellow suitcase in a European square" className="cover" width={1280} height={853} />
              <Img src="/images/go-spain.webp" alt="Couple celebrating with the Spanish flag" className="inset" width={1280} height={721} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Reviews ───────── */}
      <section id="reviews" className="section section-cream">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Customer feedback</p>
            <h2 className="display h2">Loved by our travellers</h2>
            <p className="section-sub">
              Your opinion is important to us. Read what our customers say, then tell us how we did.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ReviewsSection />
          </Reveal>
        </div>
      </section>

      {/* ───────── About ───────── */}
      <section id="about" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">About us</p>
            <h2 className="display h2">Every journey begins with trust</h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-copy">
              <p>
                <b>Travel7 (Private) Limited</b>, founded in 2005 in Sri Lanka, is a subsidiary of the
                United Ventures Group specializing in corporate and leisure travel.
              </p>
              <p>
                Originally established as Go Holidays (Private) Limited, the company was rebranded in
                December 2015, retaining &lsquo;Go Holidays&rsquo; as its leisure travel brand. Travel7
                is an IATA-accredited agency.
              </p>
              <p className="dare">
                Our goal is to deliver unique, original travel solutions that go beyond the ordinary,
                perfectly aligning with our tagline: <b>&ldquo;Dare to be Different.&rdquo;</b>
              </p>
            </Reveal>

            <div className="partners">
              <Reveal>
                <a className="partner" href={LINKS.goHolidays} target="_blank" rel="noopener">
                  <ArrowUpRight className="partner-arrow" />
                  <Img src="/images/go-holidays.png" alt="Go Holidays" width={202} height={112} />
                  <p>
                    We specialize in crafting unique and affordable travel experiences through our
                    leisure brand, Go Holidays.
                  </p>
                </a>
              </Reveal>
              <Reveal delay={120}>
                <a className="partner" href={LINKS.unitedVentures} target="_blank" rel="noopener">
                  <ArrowUpRight className="partner-arrow" />
                  <Img src="/images/united-ventures.png" alt="United Ventures" width={203} height={112} />
                  <p>
                    Established in 1995 as United Holidays with two divisions—Inbound Tours and the
                    Airline Division, United Ventures has grown into a holding company managing three
                    independent operations within the travel and tourism industry.
                  </p>
                </a>
              </Reveal>
            </div>
          </div>

          <VmvTabs />
          <div className="vmv only-desktop">
            <Reveal className="vmv-box vmv-red">
              <h3>Vision</h3>
              <p>
                To be a sought-after entity that focuses on innovation, inspiration, and collaboration
                with our team and customers, to drive profitability.
              </p>
            </Reveal>
            <Reveal className="vmv-box vmv-amber" delay={100}>
              <h3>Mission</h3>
              <p>Deliver cutting-edge service and values.</p>
            </Reveal>
            <Reveal className="vmv-box vmv-navy" delay={200}>
              <h3>Values</h3>
              <p>
                Team · Customers · Attention to Detail · Loyalty and Integrity
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Contact ───────── */}
      <section id="contact" className="contact">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Contact us</p>
            <h2 className="display h2">Let&apos;s plan your next adventure</h2>
            <p className="section-sub">
              Let us handle the logistics while you explore the world. Whether you&apos;re booking a
              flight, applying for a visa, or securing travel insurance, we&apos;ve got you covered.
            </p>
          </Reveal>
          <div className="contact-grid">
          <Reveal className="contact-info">

            <div className="contact-cards">
              {CONTACT_GROUPS.map((g) => (
                <div className="ccard" key={g.label}>
                  <h3>{g.label}</h3>
                  {g.people.map((p) => (
                    <div className="person" key={p.email}>
                      <b>{p.name}</b>
                      <a href={`https://wa.me/${p.mobile.replace(/\D/g, "")}`} target="_blank" rel="noopener">
                        <WhatsApp /> {formatPhone(p.mobile)}
                      </a>
                      {p.direct && (
                        <a href={`tel:${p.direct}`}>
                          <Phone width={16} height={16} /> {formatPhone(p.direct)}
                        </a>
                      )}
                      <a href={`mailto:${p.email}`}>
                        <Mail /> {p.email}
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="contact-meta">
              <a href={`tel:${GENERAL_PHONE}`}>
                <Phone width={18} height={18} /> General: {formatPhone(GENERAL_PHONE)}
              </a>
              <p className="address-line">
                <Pin width={18} height={18} /> {SITE.address}
              </p>
              <a className="dir-btn" href={MAPS_URL} target="_blank" rel="noopener">
                Get directions <ArrowUpRight width={16} height={16} />
              </a>
            </div>
          </Reveal>

          <Reveal className="contact-form" delay={120}>
            <h3 className="form-title">Send us a message</h3>
            <ContactForm />
          </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
