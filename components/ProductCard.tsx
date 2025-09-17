import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.handle}`;

  return (
    <div className="text-center" style={{ maxWidth: "250px", margin: "0 auto" }}>
      <Link href={href} className="block group">
        <div className="border border-white/80 bg-black">
          <img
            src={product.image || "/products/placeholder.jpg"}
            alt={product.title}
            className="block w-full h-auto"
            draggable={false}
          />
        </div>
      </Link>

      <div className="mt-2">
        <Link href={href} className="product-title">
          {product.title}
        </Link>

        {/* neon price */}
        <div className="product-price">{formatPrice(product.price)}</div>
      </div>
    </div>
  );
}
