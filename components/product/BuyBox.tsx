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
    () => variants.find((v) => v.id === variantId) ?? variants[0],
    [variants, variantId]
  );
  const priceToShow = activeVariant?.price ?? basePrice;

  const goToShopify = () => {
    if (!variantId || !domain) return;
    const url = `https://${domain}/cart/${encodeURIComponent(variantId)}:${qty}`;
    window.location.href = url;
  };

  return (
    <div className="buy-card">
      <h1 className="buy-title">{title}</h1>
      <div className="buy-price">{formatPrice(priceToShow)}</div>

      {/* VARIANT */}
      {variants.length > 0 && (
        <div className="buy-field">
          <label className="buy-label">Size / Variant</label>
          <select
            className="buy-input"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                {v.title} {v.availableForSale ? "" : "(Sold out)"}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* QTY */}
      <div className="buy-field">
        <label className="buy-label">Quantity</label>
        <div className="buy-qty">
          <button
            type="button"
            className="buy-qtyBtn"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            –
          </button>
          <input
            type="number"
            min={1}
            className="buy-qtyInput"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          />
          <button
            type="button"
            className="buy-qtyBtn"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* BUTTONS */}
      <button
        onClick={goToShopify}
        className="btn-primary w-full"
        disabled={!activeVariant?.availableForSale}
      >
        {activeVariant?.availableForSale ? "Add to cart" : "Sold out"}
      </button>

      <button onClick={goToShopify} className="btn-ghost w-full mt-3">
        Pay with PayPal
      </button>
    </div>
  );
}
