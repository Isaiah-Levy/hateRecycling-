import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/layout/Navbar";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts(12);

  return (
    <div className="page-wallpaper">
      {/* Overlay band */}
      {/* overlay band at the very top */}
<div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "320px",                 // make it obvious
    zIndex: 0,                       // under content
    pointerEvents: "none",

    // IMPORTANT: cache-bust in case the old PNG is still served
    backgroundImage: "url(/overlay.png?v=2)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    backgroundSize: "clamp(800px, 90vw, 1600px)",


  }}
/>


      <main className="relative z-[1]">
        <div className="site-hero">
          <h1>www.HateRecycling420.com</h1>
        </div>

        <Navbar />

        <div className="max-w-[1200px] mx-auto px-8 py-12 space-y-8">
          <ProductGrid products={products} />
        </div>
      </main>
    </div>
  );
}
