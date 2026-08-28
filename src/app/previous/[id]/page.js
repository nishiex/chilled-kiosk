import Link from "next/link";

export default function SavedDrinkPage({ params }) {
  const id = params?.id || 'unknown';
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--blue)] text-white p-8">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Saved Drink</h1>
        <p className="mb-4">Placeholder for saved recipe id: "{id}"</p>
        <div className="mt-6 flex gap-4">
          <Link href="/previous" className="px-4 py-2 bg-white/10 rounded">Back</Link>
          <Link href="/order" className="px-4 py-2 bg-white/10 rounded">Order Type</Link>
        </div>
      </div>
    </main>
  );
}
