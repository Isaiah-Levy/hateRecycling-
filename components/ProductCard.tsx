// components/ProductCard.tsx
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white text-black border border-gray-300 rounded-sm overflow-hidden shadow-sm">
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          <img
            src={product.image || "/products/placeholder.jpg"}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-3 bg-white"
            draggable={false}
          />
        </div>
      </Link>
      <div className="px-3 pb-3 pt-2 text-center">
        <Link
          href={`/products/${product.slug}`}
          className="block text-[13px] font-medium hover:underline"
        >
          {product.title}
        </Link>
        <div className="text-[12px] text-gray-600">
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}
