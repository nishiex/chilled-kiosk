"use client";

import React from "react";

export default function TumblerPreview({ layers = [], size = "md" }) {
  // layers: [{ name, color, amount }]
  const total = layers.reduce((s, l) => s + (l.amount || 1), 0) || 1;

  const widthClass = size === 'sm' ? 'w-28 h-44' : size === 'lg' ? 'w-64 h-72' : 'w-44 h-56';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${widthClass} bg-transparent`}>
        <div className="absolute inset-0 flex flex-col-reverse overflow-hidden rounded-t-2xl border border-white/10 bg-white/3">
          {layers.map((layer, i) => {
            const h = ((layer.amount || 1) / total) * 100;
            return (
              <div
                key={i}
                className="transition-all duration-500 ease-linear"
                style={{ height: `${h}%`, background: layer.color || '#cfcfcf' }}
              />
            );
          })}
        </div>

        {/* cup rim */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full bg-white/10" />

        {/* topping indicator */}
        {layers.length > 0 && layers[layers.length - 1]?.name && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-white/90 bg-black/20 px-2 rounded-md">
            {layers[layers.length - 1].name}
          </div>
        )}
      </div>

      <div className="text-sm text-white/80 max-w-xs text-center px-2">{layers.map(l => l.name).filter(Boolean).join(' • ')}</div>
    </div>
  );
}
