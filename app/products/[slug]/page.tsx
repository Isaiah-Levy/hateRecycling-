import Navbar from "@/components/layout/Navbar";
import { getAllProducts, getProductDetail } from "@/lib/products";
import BuyBox from "@/components/product/BuyBox";
import Gallery from "@/components/product/Gallery";

export async function generateStaticParams() {
  const products = await getAllProducts(24);
  return products.map(p => ({ slug: p.handle }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await getProductDetail(params.slug);
  if (!p) {
    return (
      <main className="max-w-[1200px] mx-auto px-6 py-16">
        <p>Not found.</p>
      </main>
    );
  }

  return (
    <main>
      <div className="site-hero"><h1>www.HateRecycling420.com</h1></div>
      <Navbar />

      <div className="page-wallpaper">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-10 md:py-12">
          {/* HARD two-column layout */}
          <div className="product-layout">
            {/* LEFT: Gallery */}
            <section>
              <Gallery images={p.images} />
            </section>

            {/* RIGHT: Buy box + description */}
            <aside className="product-buybox">
              <div className="space-y-6">
                <BuyBox title={p.title} basePrice={p.price} variants={p.variants} />
                {p.description ? (
                  <div className="bg-white text-black p-4 sm:p-6 leading-relaxed text-sm">
                    <div className="font-semibold mb-2">Details</div>
                    <div dangerouslySetInnerHTML={{ __html: p.description }} />
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
