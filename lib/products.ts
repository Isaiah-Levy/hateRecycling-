// lib/products.ts
import { sf } from "./shopify";
export type Money = { amount: string; currencyCode: string };


export type Product = {
  id: string;
  handle: string;
  title: string;
  image?: string | null;
  price: { amount: string; currencyCode: string };
  description?: string | null;
  firstVariantId?: string | null;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
};

export type ProductDetail = {
  id: string;
  handle: string;
  title: string;
  description: string | null;
  images: { url: string; altText?: string | null; width?: number; height?: number }[];
  price: Money;             // min price
  variants: ProductVariant[];
  firstVariantId?: string | null;
};


const PRODUCT_DETAIL = /* GraphQL */ `
  query ProductDetail($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      images(first: 12) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      priceRange {
        minVariantPrice { amount currencyCode }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
          }
        }
      }
    }
  }
`;


export async function getProductDetail(handle: string): Promise<ProductDetail | null> {
  const data = await sf(PRODUCT_DETAIL, { handle });
  const p = data.product;
  if (!p) return null;

  const variants = (p.variants?.edges ?? []).map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    availableForSale: e.node.availableForSale,
    price: e.node.price,
  }));

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description ?? null,
    images: (p.images?.edges ?? []).map((e: any) => e.node),
    price: p.priceRange?.minVariantPrice,
    variants,
    firstVariantId: variants[0]?.id ?? null,
  };
}



const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int = 12, $query: String) {
    products(first: $first, sortKey: CREATED_AT, reverse: true, query: $query) {
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

// generic mapper
function mapProducts(data: any): Product[] {
  return (data.products.edges as any[]).map(({ node }: any) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    image: node.featuredImage?.url || null,
    price: node.priceRange?.minVariantPrice,
    description: node.description || null,
    firstVariantId: node.variants?.edges?.[0]?.node?.id || null
  }));
}

export async function getAllProducts(limit = 12): Promise<Product[]> {
  const data = await sf(PRODUCTS_QUERY, { first: limit, query: undefined });
  return mapProducts(data);
}

// NEW: fetch by tag (e.g., "Art", "Merch")
export async function getProductsByTag(tag: string, limit = 12): Promise<Product[]> {
  // Shopify search string; keep published & active products only
  const q = `tag:'${tag.replace(/'/g, "\\'")}' AND status:active`;
  const data = await sf(PRODUCTS_QUERY, { first: limit, query: q });
  return mapProducts(data);
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
    price: p.priceRange?.minVariantPrice,
    description: p.description || null,
    firstVariantId: p.variants?.edges?.[0]?.node?.id || null
  };
}


export function formatPrice(price: Money) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode || "USD",
    maximumFractionDigits: 2,
  }).format(Number(price.amount));
}
