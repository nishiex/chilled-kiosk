"use client";

import React, { useState } from "react";

export default function DrinkCard({ drink, onAdd, onOpen }) {
  const [qty, setQty] = useState(1);

  const handleAdd = (e) => {
    e?.stopPropagation?.();
    onAdd?.({ ...drink, qty });
  };

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onOpen?.(drink);
    }
  };

  return (
    <div role="button" tabIndex={0} onClick={() => onOpen?.(drink)} onKeyDown={handleKey} className="w-full bg-card rounded-xl p-4 flex flex-col h-full hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-ring">
      <div className="flex items-center gap-4">
        <img src={drink.img} alt={drink.name} className="w-28 h-28 object-cover rounded-md flex-none" />
        <div className="flex-1">
          <div className="text-foreground font-semibold text-lg">{drink.name}</div>
          <div className="text-foreground/70 text-sm mt-1">{drink.desc}</div>
          <div className="text-foreground/60 text-xs mt-2">{drink.calories} kcal</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center bg-popover rounded-md px-3 py-1">
          <button aria-label="Decrease quantity" className="px-3" onClick={(e) => { e.stopPropagation(); setQty(q => Math.max(1, q-1)); }}>-</button>
          <div className="px-4 text-foreground">{qty}</div>
          <button aria-label="Increase quantity" className="px-3" onClick={(e) => { e.stopPropagation(); setQty(q => q+1); }}>+</button>
        </div>

        <button onClick={(e) => { e.stopPropagation(); handleAdd(e); }} className="ml-auto bg-primary hover:brightness-110 text-primary-foreground px-4 py-2 rounded-md">
          Add
        </button>
      </div>
    </div>
  );
}
