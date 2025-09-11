// app/page.tsx
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";

export default function HomePage() {
  const products = getAllProducts();
  return (
    <main>
      <div className="site-hero">
        <h1>www.HateRecycling.com</h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="section-label">FEATURED</div>
        <ProductGrid products={products} />
      </div>
    </main>
  );
}

