"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FAQAccordionProps = {
  items: Array<{ question: string; answer: string }>;
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-line rounded-md border border-line bg-white shadow-tight">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-pine transition ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isOpen ? <p className="px-5 pb-5 text-sm leading-6 text-muted">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
