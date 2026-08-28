import Link from "next/link";

export default function OrderConfirmation() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--blue)] text-white p-8">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        <p className="mb-4">Placeholder: review and confirm your order here.</p>
        <div className="mt-6 flex gap-4">
          <Link href="/cart" className="px-4 py-2 bg-white/10 rounded">Back to Cart</Link>
          <Link href="/order/success" className="px-4 py-2 bg-white/10 rounded">Simulate Success</Link>
        </div>
      </div>
    </main>
  );
}
