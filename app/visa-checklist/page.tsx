import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import VisaFinder from "@/components/VisaFinder";

export const metadata: Metadata = {
  title: "Visa Checklist",
  description:
    "Visa requirements, fees, processing times and document checklists for Sri Lankan passport holders.",
};

export default function VisaChecklist() {
  return (
    <section className="page-visa">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">
            Visa requirements
          </p>
          <h1 className="display h2">Visa checklist</h1>
          <p className="lead">
            Sri Lankan passport holders · Tourist &amp; Business visa requirements
          </p>
        </Reveal>
        <VisaFinder />
      </div>
    </section>
  );
}
