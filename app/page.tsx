import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/layout/Navbar";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts(12);

  return (
    <div className="page-wallpaper">
      {/* Overlay band */}


      <main className="relative z-[1]">
        <div className="site-hero">
          <h1>www.HateRecycling420.com</h1>
        </div>

        <Navbar />

        {/* guaranteed space below navbar */}
        <div className="h-12" /> {/* try h-8 / h-16 to taste */}

        <div className="max-w-[1200px] mx-auto px-8 pb-12">
          <ProductGrid products={products} />
        </div>
      </main>
    </div>
  );
}
