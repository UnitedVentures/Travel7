"use client";

import { useState } from "react";

const ITEMS = [
  {
    key: "Vision",
    body: (
      <p>
        To be a sought-after entity that focuses on innovation, inspiration, and collaboration with
        our team and customers, to drive profitability.
      </p>
    ),
  },
  { key: "Mission", body: <p>Deliver cutting-edge service and values.</p> },
  {
    key: "Values",
    body: (
      <ul>
        <li>Team</li>
        <li>Customers</li>
        <li>Attention to Detail</li>
        <li>Loyalty and Integrity</li>
      </ul>
    ),
  },
];

// Mobile version of Vision / Mission / Values: one tab at a time instead of three stacked boxes.
export default function VmvTabs() {
  const [i, setI] = useState(0);
  return (
    <div className="vmv-tabs only-mobile">
      <div className="vmv-tablist" role="tablist">
        {ITEMS.map((t, k) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={i === k}
            className={i === k ? "on" : ""}
            onClick={() => setI(k)}
          >
            {t.key}
          </button>
        ))}
      </div>
      <div className="vmv-panel" role="tabpanel" key={i}>
        {ITEMS[i].body}
      </div>
    </div>
  );
}
