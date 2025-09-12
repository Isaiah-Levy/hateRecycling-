// components/layout/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-white/20">
      <div className="max-w-[1200px] mx-auto px-6">
        <ul
          // FORCE layout + spacing regardless of globals
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",           // <— spacing between items
            listStyle: "none",
            padding: "10px 0",
            margin: 0
          }}
        >
          <li>
            <a
              href="mailto:hello@example.com"
              className="uppercase"
              style={{ display: "inline-block", padding: "4px 2px" }}
            >
              Book Tattoo
            </a>
          </li>
          <li>
            <Link
              href="/"
              className="uppercase"
              style={{ display: "inline-block", padding: "4px 2px" }}
            >
              Merch
            </Link>
          </li>
          <li>
            <Link
              href="/art"
              className="uppercase"
              style={{ display: "inline-block", padding: "4px 2px" }}
            >
              Art
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="uppercase"
              style={{ display: "inline-block", padding: "4px 2px" }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
