
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/layout/Navbar";
import { getAllProducts } from "@/lib/products";

export default function HomePage() {
  const products = getAllProducts();
  return (
    <main>
      <div className="site-hero">
        <h1>www.HateRecycling420.com</h1>
      </div>

      {/* Navbar lives under the hero */}
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-8 py-12 space-y-8">
        <div className="section-label"></div>
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
