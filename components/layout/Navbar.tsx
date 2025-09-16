import Link from "next/link";

export default function Navbar() {
  return (
    // transparent, sits above wallpaper
    <nav className="relative z-50  ">
      <div className="max-w-[1200px] mx-auto px-6">
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            listStyle: "none",
            padding: "30px 0",
            margin: 0
          }}
        >
          <li>
            <Link href="/book" className="uppercase" style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto", textShadow: "0 0 4px rgba(0,0,0,.6)" }}>
              Book Tattoo
            </Link>
          </li>
          <li>
            <Link href="/" className="uppercase" style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto", textShadow: "0 0 4px rgba(0,0,0,.6)" }}>
              Merch
            </Link>
          </li>
          <li>
            <Link href="/art" className="uppercase" style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto", textShadow: "0 0 4px rgba(0,0,0,.6)" }}>
              Art
            </Link>
          </li>
          <li>
            <Link href="/contact" className="uppercase" style={{ display: "inline-block", padding: "4px 2px", pointerEvents: "auto", textShadow: "0 0 4px rgba(0,0,0,.6)" }}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
