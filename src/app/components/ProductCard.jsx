"use client";

import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { useCartStore } from "../../lib/cartStore";

export default function ProductCard({
  id = "birthday-cookie",
  title = "Birthday Cookie",
  subtitle = "Box of 6 · 4oz",
  imageSrc = "/testproduct.png",
  unitPrice = 29,
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });

  function increment() { setQty((q) => q + 1); }
  function decrement() { setQty((q) => Math.max(1, q - 1)); }

  function handleAdd() {
    addItem({ name: title, price: unitPrice, qty, meta: { id } });
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
  }

  return (
    <article className="bg-white rounded-2xl border-2 border-[#1844AB] shadow-lg overflow-hidden">
      <div className="w-full bg-gray-100" style={{ aspectRatio: '1 / 1' }}>
        <img src={imageSrc} alt={title} className="w-full h-full object-contain block" />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-extrabold text-[#1F2A44]">{title}</h3>
        <p className="text-sm text-[#1F2A44]/70 mt-1">{subtitle}</p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-lg font-semibold text-[#1F2A44]">{fmt.format(unitPrice * qty)}</div>

          <div className="flex items-center gap-3">
            <button
              onClick={decrement}
              aria-label="Decrease quantity"
              disabled={qty <= 1}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold bg-[#1844AB] disabled:opacity-50 disabled:cursor-not-allowed"
            >−</button>

            <div className="min-w-[28px] text-center font-bold">{qty}</div>

            <button
              onClick={increment}
              aria-label="Increase quantity"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F2A44] font-bold bg-[#B9E0FF]"
            >+</button>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className={`${styles.addCartBtn} mt-4 w-full py-3 font-bold hover:brightness-105 active:scale-95 transition`}
          aria-pressed={adding}
        >{adding ? 'Added ✓' : 'Add to cart'}</button>
      </div>
    </article>
  );
}
