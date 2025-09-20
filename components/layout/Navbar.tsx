import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative z-50">
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
            margin: 0,
          }}
        >
          {[
            { href: "/book", label: "Book Tattoo" },
            { href: "/", label: "Art" },
            { href: "/merch", label: "Merch" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="uppercase nav-link"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
