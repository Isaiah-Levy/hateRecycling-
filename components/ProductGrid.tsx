// components/ProductGrid.tsx
import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "24px",                 // <-- FORCED SPACE
        padding: "0px"               // outer margin handled by page wrapper
      }}
    >
      {products.map((p) => (
        <div key={p.id} style={{ background: "transparent" }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
