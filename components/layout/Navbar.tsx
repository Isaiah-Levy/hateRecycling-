// components/layout/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-white/20 relative z-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            listStyle: "none",
            padding: "10px 0",
            margin: 0
          }}
        >
          <li>
            {/* If Link is still ignored, temporarily swap to <a href="/book"> to test */}
            <Link
              href="/book"
              className="uppercase"
              style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto" }}
            >
              Book Tattoo
            </Link>
          </li>
          <li>
            <Link href="/" className="uppercase" style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto" }}>
              Merch
            </Link>
          </li>
          <li>
            <Link href="/art" className="uppercase" style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto" }}>
              Art
            </Link>
          </li>
          <li>
            <Link href="/contact" className="uppercase" style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto" }}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
