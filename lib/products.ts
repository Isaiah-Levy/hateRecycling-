// lib/products.ts
import { sf } from "./shopify";

export type Product = {
  id: string;
  handle: string;
  title: string;
  image?: string | null;
  price: { amount: string; currencyCode: string };
  description?: string | null;
  firstVariantId?: string | null;
};

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int = 12) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          handle
          title
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          description
          variants(first: 1) { edges { node { id availableForSale } } }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      images(first: 6) { edges { node { url altText width height } } }
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 10) { edges { node { id title availableForSale } } }
    }
  }
`;

export async function getAllProducts(limit = 12): Promise<Product[]> {
  const data = await sf(PRODUCTS_QUERY, { first: limit });
  return (data.products.edges as any[]).map(({ node }: any) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    image: node.featuredImage?.url || null,
    price: node.priceRange.minVariantPrice,
    description: node.description || null,
    firstVariantId: node.variants?.edges?.[0]?.node?.id || null
  }));
}

export async function getProductBySlug(handle: string): Promise<Product | null> {
  const data = await sf(PRODUCT_BY_HANDLE, { handle });
  const p = data.product;
  if (!p) return null;
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    image: p.images?.edges?.[0]?.node?.url || null,
    price: p.priceRange.minVariantPrice,
    description: p.description || null,
    firstVariantId: p.variants?.edges?.[0]?.node?.id || null
  };
}

export function formatPrice(price: { amount: string; currencyCode: string }) {
  const n = Number(price.amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode || "USD",
    maximumFractionDigits: 2
  }).format(n);
}
