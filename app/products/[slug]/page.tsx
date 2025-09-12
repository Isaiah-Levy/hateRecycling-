// app/products/[slug]/page.tsx
import Link from "next/link";
import { getAllProducts, getProductBySlug, formatPrice } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) {
    return (
      <main className="max-w-[1200px] mx-auto px-8 py-12">
        <p>Not found.</p>
        <Link href="/" className="underline">Back to merch</Link>
      </main>
    );
  }

  return (
    <main>
      {/* optional: keep the neon header like the home page */}
      <div className="site-hero">
        <h1>www.HateRecycling.com</h1>
      </div>

      <div className="max-w-[1000px] mx-auto px-8 py-12">
        <div className="bg-white text-black border border-gray-300">
          {/* Square image area, consistent sizing */}
          <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
            <img
              src={p.image || "/products/placeholder.jpg"}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-contain p-4 bg-white"
              draggable={false}
            />
          </div>

          <div className="p-4 sm:p-6">
            <h1 className="text-lg font-bold mb-1">{p.title}</h1>
            <div className="text-sm text-gray-700 mb-4">{formatPrice(p.price)}</div>

            <p className="text-sm text-gray-800 leading-relaxed mb-6">
              {p.description}
            </p>

            <div className="flex items-center gap-4">
              <a
                href={p.paymentUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Buy
              </a>
              <span className="opacity-40">|</span>
              <Link href="/" className="underline">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

