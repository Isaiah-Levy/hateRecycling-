import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/layout/Navbar";
import { getProductsByTag } from "@/lib/products";

export default async function MerchPage() {
  const products = await getProductsByTag("Merch", 12);

  return (
    <div className="page-wallpaper">
      <main className="relative z-[1]">
        <div className="site-hero">
          <h1>www.HateRecycling420.com</h1>
        </div>

        <Navbar />

        <div className="h-12" />

        <div className="max-w-[1200px] mx-auto px-8 pb-12">
          <ProductGrid products={products} />
        </div>
      </main>
    </div>
  );
}
