// app/book/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

const DEPOSIT_URL =
  process.env.NEXT_PUBLIC_DEPOSIT_URL || "https://example.com/pay/deposit-50";

export default function BookPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    if (!date || !time) {
      setErr("Select a date and time to continue.");
      return;
    }

    // pass selection along to the payment page (good for later reconciliation)
    const qp = new URLSearchParams({
      date,
      time,
      notes: notes.slice(0, 200)
    }).toString();

    window.location.href = `${DEPOSIT_URL}?${qp}`;
  }

  return (
    <main>
      {/* neon header (matches site) */}
      <div className="site-hero">
        <h1>www.HateRecycling420.com</h1>
      </div>

      {/* centered navbar under hero */}
      <Navbar />

      <div className="max-w-[800px] mx-auto px-6 py-12">
        <h2 className="text-center text-sm tracking-[0.3em] text-white/80 mb-8 uppercase">
          Book Tattoo — $50 Deposit
        </h2>

        <form
          onSubmit={submit}
          className="bg-white text-black border border-gray-300"
        >
          {/* form body */}
          <div className="p-4 sm:p-6 space-y-5">
            <div>
              <label className="block text-[12px] font-semibold mb-1 uppercase tracking-wide">
                Choose Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-gray-300 text-black px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold mb-1 uppercase tracking-wide">
                Choose Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white border border-gray-300 text-black px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold mb-1 uppercase tracking-wide">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Placement, size, reference vibe, etc."
                className="w-full bg-white border border-gray-300 text-black px-3 py-2 text-sm h-28 resize-vertical"
              />
            </div>

            {err ? (
              <div className="text-red-600 text-xs">{err}</div>
            ) : null}
          </div>

          {/* footer */}
          <div className="border-t border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Non-refundable deposit to hold the slot. Remaining balance due in person.
            </div>
            <button
              type="submit"
              className="uppercase text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition"
            >
              Pay $50 &amp; Reserve
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
