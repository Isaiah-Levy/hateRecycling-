// components/ProductCard.tsx
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.handle}`;

  return (
    <div className="text-center">
      {/* bordered image box */}
      <Link href={href} className="block group">
        <div className="border border-white/80 bg-black">
          {/* no padding; image touches the border */}
          <img
            src={product.image || "/products/placeholder.jpg"}
            alt={product.title}
            className="block w-full h-auto"
            draggable={false}
          />
        </div>
      </Link>

      {/* text BELOW the border */}
      <div className="mt-2">
        <Link href={href} className="text-sm underline hover:no-underline">
          {product.title}
        </Link>
        <div className="text-xs text-white/70">
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}
