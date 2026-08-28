"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import SlideToContinue from "./SlideToContinue";
import { useCartStore } from "../../lib/cartStore";
import { useRouter } from "next/navigation";

const defaultSections = [
  {
    id: 'sweetness',
    title: 'Sweetness',
    type: 'single',
    options: ['No Sugar', 'Less Sweet', 'Regular', 'Extra Sweet'],
    default: 'Regular'
  },
  {
    id: 'milk',
    title: 'Milk & Creamers',
    type: 'single',
    options: ['Whole Milk', 'Low Fat', 'Oat Milk', 'Almond Milk', 'Coconut Milk'],
    default: 'Whole Milk'
  },
  {
    id: 'flavors',
    title: 'Flavor Boosts',
    type: 'multi',
    options: ['Vanilla', 'Caramel', 'Hazelnut', 'Mocha', 'Brown Sugar']
  },
  {
    id: 'ice',
    title: 'Ice Level',
    type: 'single',
    options: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice'],
    default: 'Regular Ice'
  },
  {
    id: 'size',
    title: 'Size',
    type: 'single',
    options: ['Small', 'Medium', 'Large'],
    default: 'Medium'
  }
];

function Pill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`select-none focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-150 ease-in-out px-5 py-3 rounded-full min-w-[120px] text-center ${active ? 'bg-[#E6CDB3] text-[#27160f] shadow-md scale-[1.02]' : 'bg-white border border-gray-200 text-[#27160f]'}`}
    >
      {label}
    </button>
  );
}

export default function KioskCustomization({ drink = {}, options: propOptions, onBack, onContinue }) {
  const sections = propOptions || defaultSections;
  const router = useRouter();
  const add = useCartStore(state => state.addItem);

  const initialSelections = useMemo(() => {
    const out = {};
    sections.forEach((s) => {
      if (s.type === 'single') out[s.id] = s.default ?? s.options[0];
      else out[s.id] = [];
    });
    return out;
  }, [sections]);

  const [selections, setSelections] = useState(initialSelections);

  const toggleOption = (sectionId, option) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    setSelections((prev) => {
      if (section.type === 'single') {
        return { ...prev, [sectionId]: option };
      }

      const cur = prev[sectionId] || [];
      if (cur.includes(option)) return { ...prev, [sectionId]: cur.filter((x) => x !== option) };
      return { ...prev, [sectionId]: [...cur, option] };
    });
  };

  const handleBack = () => {
    if (onBack) return onBack();
    if (typeof window !== 'undefined') window.history.back();
  };

  const handleContinue = () => {
    // build item payload and add to cart
    const price = parseFloat(drink.price) || 0;
    const qty = 1;
    const item = {
      name: drink.name || 'Chilled Coffee',
      price,
      qty,
      meta: {
        id: drink.id,
        selections
      }
    };

    try {
      add && add(item);
    } catch (err) {
      // if add fails silently, ignore -- store should exist
      console.error('Failed to add item to cart', err);
    }

    // navigate to cart/next step in kiosk flow
    router.push('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FBF7F0]">
      {/* TOP PRODUCT AREA */}
      <div className="relative h-[40vh] flex-none flex items-center justify-center px-4">
        <button
          aria-label="Back"
          onClick={handleBack}
          className="absolute left-4 top-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 shadow-sm"
        >
          <ChevronLeft size={18} className="text-[#2b160b]" />
        </button>

        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
          <div className="bg-white rounded-3xl p-4 shadow-2xl">
            <img
              src={drink.img ?? '/fonts/images/social/Thumbnail.png'}
              alt={drink.name ?? 'Chilled Coffee'}
              className="w-[260px] h-[260px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-[#1b120f]">{drink.name ?? 'Chilled Coffee'}</h2>
            <p className="text-sm text-[#4b4038] mt-1 max-w-md">{drink.desc ?? 'A premium chilled coffee crafted for clarity and balance.'}</p>
          </div>
        </div>
      </div>

      {/* CUSTOMIZATION PANEL */}
      <div className="bg-white rounded-t-3xl shadow-2xl -mt-10 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <h3 className="text-lg font-semibold text-[#1b120f]">Customize</h3>

          {sections.map((section) => (
            <div key={section.id} className="mt-6">
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-medium text-[#33241d]">{section.title}</h4>
                <div className="text-xs text-[#746659]">
                  {section.type === 'single'
                    ? selections[section.id]
                    : (selections[section.id] && selections[section.id].length > 0 ? selections[section.id].join(', ') : 'None')}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {section.options.map((opt) => {
                  const active = section.type === 'single' ? selections[section.id] === opt : (selections[section.id] || []).includes(opt);
                  return (
                    <Pill key={opt} label={opt} active={active} onClick={() => toggleOption(section.id, opt)} />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="h-28" />
        </div>

        {/* STICKY BOTTOM ACTION */}
        <div className="p-6 bg-white flex-none border-t">
          <div className="max-w-4xl mx-auto">
            <SlideToContinue label="Slide to Continue" onSuccess={handleContinue} />
          </div>
        </div>
      </div>
    </div>
  );
}
