// components/TextGrid.tsx
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { blackletter } from "@/app/layout";

export default function TextGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 sm:gap-y-4">
      {products.map((p) => (
        <div key={p.id} className="border-raw px-3 py-2">
          <Link href={`/products/${p.slug}`} className="uppercase">
            {p.title}
          </Link>
          <span className="float-right text-white/60">{formatPrice(p.price)}</span>
        </div>
      ))}
    </div>
  );
}
