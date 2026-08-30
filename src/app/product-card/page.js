import ProductCard from "../components/ProductCard";

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "#f4f2ea" }}>
      <ProductCard />
    </div>
  );
}
