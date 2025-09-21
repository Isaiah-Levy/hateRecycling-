"use client";
import { useState } from "react";

type Img = { url: string; altText?: string | null };

export default function Gallery({ images }: { images: Img[] }) {
  const imgs = images?.length ? images : [{ url: "/products/placeholder.jpg", altText: "Product" }];
  const [idx, setIdx] = useState(0);

  return (
    <div>
      {/* main image */}
      <div className="bg-black">
        <img
          src={imgs[idx].url}
          alt={imgs[idx].altText ?? ""}
          className="product-main-img"   // <-- from globals.css
          draggable={false}
        />
      </div>

      {/* thumbnails */}
      <div className="product-thumbs mt-3">  {/* <-- from globals.css */}
        {imgs.map((im, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`product-thumb ${i === idx ? "is-active" : ""}`}  // <-- from globals.css
            aria-label={`Image ${i + 1}`}
          >
            <img src={im.url} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
