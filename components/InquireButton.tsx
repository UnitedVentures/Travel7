"use client";

import { usePathname, useRouter } from "next/navigation";
import { WHATSAPP, type TopicValue } from "@/lib/config";

export const TOPIC_EVENT = "t7:topic";

// Desktop → scroll to the contact form with the topic preselected.
// Mobile (touch device or narrow screen) → WhatsApp chat with the relevant agent.
export default function InquireButton({
  topic,
  className = "btn",
  children = "Inquire now",
}: {
  topic: TopicValue;
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const wa = WHATSAPP[topic];

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 820px)").matches;

    if (isMobile) {
      window.open(
        `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.text)}`,
        "_blank",
        "noopener",
      );
      return;
    }
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent(TOPIC_EVENT, { detail: topic }));
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `/?topic=${topic}#contact`);
    } else {
      router.push(`/?topic=${topic}#contact`);
    }
  };

  return (
    <a href={`/?topic=${topic}#contact`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
