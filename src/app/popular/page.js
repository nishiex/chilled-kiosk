import ProductCard from "../components/ProductCard";

const items = [
  {
    id: "kaapi-concentrate",
    title: "Kaapi Concentrate",
    subtitle: "South Indian filter-inspired depth · 250ml",
    imageSrc: "/testproduct.png",
    unitPrice: 29,
  },
  {
    id: "bold-concentrate",
    title: "Bold Concentrate",
    subtitle: "Balanced Arabica & Robusta · 250ml",
    imageSrc: "/testproduct.png",
    unitPrice: 34,
  },
  {
    id: "classic-concentrate",
    title: "Classic Concentrate",
    subtitle: "100% Arabica from Coorg · 250ml",
    imageSrc: "/testproduct.png",
    unitPrice: 26,
  },
  {
    id: "rajpresso",
    title: "RajPresso",
    subtitle: "Silky-smooth Espresso Martini · Cold Coffee · Sweet",
    imageSrc: "/testproduct.png",
    unitPrice: 32,
  },
  {
    id: "vandy-mood-mocha",
    title: "Vandy Mood Mocha",
    subtitle: "Nitro Espresso Martini · Matcha · Bitter",
    imageSrc: "/testproduct.png",
    unitPrice: 30,
  },
  {
    id: "kishorappe",
    title: "Kishorappe",
    subtitle: "Nitro Espresso Martini · Chilled · Lemon",
    imageSrc: "/testproduct.png",
    unitPrice: 28,
  }

];

export default function Page() {
  return (
    <main className="min-h-screen py-12 bg-[#f4f2ea]">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-extrabold mb-8 text-[#1F2A44]">Popular</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageSrc={item.imageSrc}
              unitPrice={item.unitPrice}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
