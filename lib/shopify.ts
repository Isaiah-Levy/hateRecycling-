// lib/shopify.ts
const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-07";
const TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN; // optional

type Vars = Record<string, unknown>;

export async function sf<T = any>(query: string, variables?: Vars): Promise<T> {
  const res = await fetch(`https://${DOMAIN}/api/${VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(TOKEN ? { "X-Shopify-Storefront-Access-Token": TOKEN } : {})
    },
    body: JSON.stringify({ query, variables }),
    // cache a bit so home loads fast; adjust as you like
    next: { revalidate: 60 }
  });

  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error(`Shopify error: ${JSON.stringify(json.errors || json)}`);
  }
  return json.data;
}
