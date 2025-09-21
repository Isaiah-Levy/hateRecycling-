// components/product/BuyBox.tsx
"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/products";

type Money = { amount: string; currencyCode: string };
type Variant = { id: string; title: string; availableForSale: boolean; price: Money };

export default function BuyBox({
  title,
  basePrice,
  variants,
}: {
  title: string;
  basePrice: Money;
  variants: Variant[];
}) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);

  const activeVariant = useMemo(
    () => variants.find(v => v.id === variantId) ?? variants[0],
    [variants, variantId]
  );
  const priceToShow = activeVariant?.price ?? basePrice;

  const goToShopify = () => {
    if (!variantId || !domain) return;
    const url = `https://${domain}/cart/${encodeURIComponent(variantId)}:${qty}`;
    window.location.href = url;
  };

  return (
    <div className="bg-white text-black p-4 sm:p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="text-sm text-gray-700 mb-4">{formatPrice(priceToShow)}</div>

      {variants.length > 0 && (
        <div className="mb-4">
          <label className="block text-[12px] font-semibold mb-1 uppercase tracking-wide">
            Size / Variant
          </label>
          <select
            className="w-full border border-gray-300 px-3 py-2 text-sm bg-white"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
          >
            {variants.map(v => (
              <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                {v.title} {v.availableForSale ? "" : "(Sold out)"}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-[12px] font-semibold mb-1 uppercase tracking-wide">
          Quantity
        </label>
        <div className="flex items-center gap-2">
          <button type="button" className="border px-3 py-1" onClick={() => setQty(q => Math.max(1, q - 1))}>–</button>
          <input
            type="number"
            min={1}
            className="w-16 border text-center py-1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          />
          <button type="button" className="border px-3 py-1" onClick={() => setQty(q => q + 1)}>+</button>
        </div>
      </div>

      <button
        onClick={goToShopify}
        className="w-full uppercase text-sm py-3 border border-black hover:bg-black hover:text-white transition"
        disabled={!activeVariant?.availableForSale}
      >
        {activeVariant?.availableForSale ? "Add to cart" : "Sold out"}
      </button>

      <button
        onClick={goToShopify}
        className="w-full mt-3 py-3 border border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition text-sm"
      >
        Pay with PayPal
      </button>
    </div>
  );
}
