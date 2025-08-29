"use client";

import React from "react";
import Link from "next/link";

export default function HelpContact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pt-4 pb-14">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">
            Email support
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            We reply within one business day.
          </p>
          <a
            href="mailto:support@example.com"
            className="mt-4 inline-flex rounded-full bg-[#3b50df] px-4 py-2 text-sm font-medium text-white hover:bg-[#3246c6] transition"
          >
            askus@urbannest.com
          </a>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">Live chat</h3>
          <p className="mt-2 text-sm text-slate-600">Weekdays 9:00–17:00.</p>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-[#3b50df] ring-1 ring-[#3b50df] hover:bg-[#eef1ff] transition"
          >
            Start chat
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-base font-semibold text-slate-900">Policies</h3>
          <p className="mt-2 text-sm text-slate-600">
            Learn how we handle data and returns.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link
              href="/policies/terms&conditions"
              className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-[#eef1ff]"
            >
              Terms
            </Link>
            <Link
              href="/policies/privacy_policy"
              className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-[#eef1ff]"
            >
              Privacy
            </Link>
            <Link
              href="/policies/return_policy"
              className="rounded-full bg-white px-3 py-1 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-[#eef1ff]"
            >
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
