import Navbar from "@/components/layout/Navbar";
import { getAllProducts, getProductBySlug, formatPrice } from "@/lib/products";

export async function generateStaticParams() {
  const items = await getAllProducts(20);
  return items.map(p => ({ slug: p.handle }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await getProductBySlug(params.slug);
  if (!p) return <main className="max-w-[1200px] mx-auto px-8 py-12">Not found.</main>;

  return (
    <main>
      <div className="site-hero"><h1>www.HateRecycling420.com</h1></div>
      <Navbar />
      <div className="max-w-[1000px] mx-auto px-8 py-12">
        <div className="bg-white text-black border border-gray-300">
          <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
            <img
              src={p.image || "/products/placeholder.jpg"}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-contain p-4 bg-white"
            />
          </div>
          <div className="p-4 sm:p-6">
            <h1 className="text-lg font-bold mb-1">{p.title}</h1>
            <div className="text-sm text-gray-700 mb-4">{formatPrice(p.price)}</div>
            <p className="text-sm text-gray-800 leading-relaxed mb-6">{p.description}</p>
            {/* Buy button (we’ll wire checkout in Step 7) */}
            <form action="/api/checkout" method="post">
              <input type="hidden" name="variantId" value={p.firstVariantId ?? ""}/>
              <button className="uppercase text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition">
                Buy
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
