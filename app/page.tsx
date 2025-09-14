import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/layout/Navbar";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts(12); // now from Shopify
  return (
    <main>
      <div className="site-hero"><h1>www.HateRecycling420.com</h1></div>
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-8 py-12 space-y-8">
        <div className="section-label"></div>
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
