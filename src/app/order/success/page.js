import Link from "next/link";

export default function OrderSuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--blue)] text-white p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-4">Order Successful</h1>
        <p className="mb-4">Thank you — your order has been placed.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/" className="px-4 py-2 bg-white/10 rounded">Home</Link>
          <Link href="/orders" className="px-4 py-2 bg-white/10 rounded">View Orders</Link>
        </div>
      </div>
    </main>
  );
}
