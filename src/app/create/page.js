"use client";

import React, { useState, useMemo } from "react";
import TumblerPreview from "../components/TumblerPreview";
import { useCartStore } from "../../lib/cartStore";
import { useRouter } from "next/navigation";

const baseOptions = [
  { id: 'coffee', name: 'Coffee', color: '#6B4F4F' },
  { id: 'tea', name: 'Tea', color: '#B07A2D' },
  { id: 'milk', name: 'Milk', color: '#F1E0C5' },
  { id: 'coldbrew', name: 'Cold Brew', color: '#3B2F2F' }
];
const bodyOptions = [
  { id: 'smooth', name: 'Smooth', modifier: 1, colorShade: 'rgba(255,255,255,0.04)' },
  { id: 'frothy', name: 'Frothy', modifier: 0.9, colorShade: 'rgba(255,255,255,0.02)' },
  { id: 'thick', name: 'Thick', modifier: 1.1, colorShade: 'rgba(0,0,0,0.06)' }
];
const flavorOptions = [
  { id: 'vanilla', name: 'Vanilla', color: 'linear-gradient(90deg,#f8e3b4,#f7dca2)' },
  { id: 'caramel', name: 'Caramel', color: 'linear-gradient(90deg,#d9a066,#d39149)' },
  { id: 'none', name: 'No Sweetener', color: 'transparent' }
];
const toppingOptions = [
  { id: 'cream', name: 'Cream' },
  { id: 'cocoa', name: 'Cocoa' },
  { id: 'boba', name: 'Boba' },
  { id: 'none', name: 'None' }
];

export default function CreatePage() {
  const [step, setStep] = useState(0);
  const [build, setBuild] = useState({ base: null, body: null, flavor: null, topping: null });
  const addItem = useCartStore(state => state.addItem);
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const select = (key, option) => setBuild(b => ({ ...b, [key]: option }));

  const layers = useMemo(() => {
    const arr = [];
    if (build.base) arr.push({ name: build.base.name, color: build.base.color, amount: 6 });
    if (build.body) arr.push({ name: build.body.name, color: '#ffffff10', amount: 2 });
    if (build.flavor && build.flavor.id !== 'none') arr.push({ name: build.flavor.name, color: '#ffd6a5', amount: 2 });
    if (build.topping && build.topping.id !== 'none') arr.push({ name: build.topping.name, color: '#ffffffaa', amount: 1 });
    return arr;
  }, [build]);

  const onAddToCart = () => {
    const name = `Custom — ${build.base ? build.base.name : 'Drink'}`;
    addItem({ name, price: 4.5, qty: 1, meta: { ...build } });
    setToast('Custom drink added to cart');
    setTimeout(() => setToast(null), 1500);
    router.push('/cart');
  };

  return (
    <main className="min-h-screen p-6 bg-[var(--blue)] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Create Your Drink</h2>

          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              {['Beverage Base','Body','Sweetener','Signature','Confirm'].map((label, i) => (
                <div key={i} className={`px-3 py-2 rounded ${i === step ? 'bg-white/10' : 'bg-white/5 text-white/80'}`}>{label}</div>
              ))}
            </div>

            <div className="rounded-lg bg-white/5 p-6">
              {step === 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {baseOptions.map(o => (
                    <button key={o.id} onClick={() => select('base', o)} className={`p-4 rounded-lg text-left ${build.base?.id === o.id ? 'ring-2 ring-white/40' : ''}`}>
                      <div className="font-semibold">{o.name}</div>
                      <div className="text-sm text-white/70 mt-1">Base ingredient</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {bodyOptions.map(o => (
                    <button key={o.id} onClick={() => select('body', o)} className={`p-4 rounded-lg text-left ${build.body?.id === o.id ? 'ring-2 ring-white/40' : ''}`}>
                      <div className="font-semibold">{o.name}</div>
                      <div className="text-sm text-white/70 mt-1">Texture</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  {flavorOptions.map(o => (
                    <button key={o.id} onClick={() => select('flavor', o)} className={`p-4 rounded-lg text-left ${build.flavor?.id === o.id ? 'ring-2 ring-white/40' : ''}`}>
                      <div className="font-semibold">{o.name}</div>
                      <div className="text-sm text-white/70 mt-1">Flavor</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-2 gap-4">
                  {toppingOptions.map(o => (
                    <button key={o.id} onClick={() => select('topping', o)} className={`p-4 rounded-lg text-left ${build.topping?.id === o.id ? 'ring-2 ring-white/40' : ''}`}>
                      <div className="font-semibold">{o.name}</div>
                      <div className="text-sm text-white/70 mt-1">Topping</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-lg font-semibold">Review</h3>
                  <ul className="mt-2 text-white/80">
                    <li>Base: {build.base?.name || '-'}</li>
                    <li>Body: {build.body?.name || '-'}</li>
                    <li>Flavor: {build.flavor?.name || '-'}</li>
                    <li>Signature: {build.topping?.name || '-'}</li>
                  </ul>

                  <div className="mt-4">
                    <button onClick={onAddToCart} className="bg-white/10 px-4 py-2 rounded mr-2">Add to cart</button>
                    <button onClick={() => setStep(0)} className="bg-white/6 px-4 py-2 rounded">Edit</button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={() => setStep(s => Math.max(0, s-1))} className="px-4 py-2 bg-white/6 rounded">Back</button>
              <button onClick={() => setStep(s => Math.min(4, s+1))} className="px-4 py-2 bg-white/10 rounded ml-auto">Next</button>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <TumblerPreview layers={layers} />
            <div className="mt-4 text-white/80">Preview updates as you select ingredients.</div>
          </div>
        </aside>
      </div>

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded">{toast}</div>}
    </main>
  );
}
