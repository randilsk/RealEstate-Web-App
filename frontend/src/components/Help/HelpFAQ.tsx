"use client";

import React from "react";

type FAQ = {
  q: string;
  a: React.ReactNode;
};

const faqs: FAQ[] = [
  {
    q: "How do I get my listing approved faster?",
    a: (
      <ul className="list-disc pl-5">
        <li>Complete all required fields and verify your email.</li>
        <li>Add 5+ clear photos and an accurate map pin.</li>
        <li>
          Use a descriptive title and avoid promotional text or phone numbers.
        </li>
      </ul>
    ),
  },
  {
    q: "Why was my listing rejected?",
    a: (
      <p>
        Common reasons include incomplete details, misleading information, or
        poor image quality. Review the rejection note and edit your listing to
        resubmit.
      </p>
    ),
  },
  {
    q: "How do I change my listing’s location pin?",
    a: (
      <p>
        Open your listing editor and use the map to drag the pin to the correct
        spot. Confirm in the <strong>Location</strong> step and save.
      </p>
    ),
  },
  {
    q: "How do I delete my account?",
    a: (
      <p>
        Go to <strong>Profile</strong> → <strong>Settings</strong> and choose{" "}
        <strong>Delete Account</strong>. This permanently removes your data per
        our Privacy Policy.
      </p>
    ),
  },
];

export default function HelpFAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 pt-4 pb-10">
      <h2 className="text-2xl font-semibold text-slate-900">
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {faqs.map((item, idx) => (
          <details
            key={idx}
            className="group p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4">
              <h3 className="text-base font-medium text-slate-900">{item.q}</h3>
              <span className="rounded-full bg-[#eef1ff] px-2 py-0.5 text-[#3b50df] transition group-open:rotate-180">
                ⌄
              </span>
            </summary>
            <div className="mt-3 text-sm text-slate-600">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
