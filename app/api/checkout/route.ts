// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next";
import { sf } from "@/lib/shopify";

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

export async function POST(req: NextRequest) {
  const body = await req.formData(); // from <form method="post">
  const variantId = String(body.get("variantId") || "");
  if (!variantId) {
    return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
  }
  const data = await sf(CART_CREATE, {
    lines: [{ merchandiseId: variantId, quantity: 1 }]
  });
  const url = data.cartCreate?.cart?.checkoutUrl;
  if (!url) return NextResponse.json({ error: "No checkoutUrl" }, { status: 500 });
  return NextResponse.redirect(url, { status: 302 });
}
