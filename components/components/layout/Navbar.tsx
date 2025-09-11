import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-white/20 bg-black">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link href="/" className="text-lg font-bold uppercase tracking-widest hover:text-pink-500">
        haterecycling420
      </Link>
      <div className="flex items-center gap-6 text-sm uppercase">
        <Link href="/" className="hover:underline">Shop</Link>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
        <a href="mailto:hello@example.com" className="px-3 py-1.5 border border-white/40 rounded-sm hover:bg-white hover:text-black transition">
          Booking
        </a>
      </div>
    </nav>
  </header>
  );
}
