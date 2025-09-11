import products from "@/data/products.json";

export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;        // cents
  image: string;        // /products/... in /public
  description: string;
  paymentUrl: string;   // Stripe/PayPal/Typeform/etc.
};

export function getAllProducts(): Product[] {
  return products as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return (products as Product[]).find((p) => p.slug === slug);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
    .format(cents / 100);
}
