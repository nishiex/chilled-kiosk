"use client";

import React from "react";
import KioskCustomization from "../components/KioskCustomization";

export default function CustomizePage() {
  const sample = {
    id: "drink-1",
    name: "Signature Chilled Latte",
    desc: "Velvety cold-brew latte with a silky crema and subtle sweetness.",
    img: "/fonts/images/social/Thumbnail.png",
    price: 4.5
  };

  const handleContinue = ({ drink, selections }) => {
    console.log('Continue pressed', selections);
    alert('Added to order:\n' + JSON.stringify(selections, null, 2));
  };

  return (
    <main className="min-h-screen">
      <KioskCustomization drink={sample} onContinue={handleContinue} />
    </main>
  );
}
