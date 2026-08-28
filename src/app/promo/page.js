import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--blue)] text-white p-8">
      <div className="max-w-3xl">
        <header className="flex items-center gap-4 mb-6">
          <img src="/fonts/images/social/Chilld_Cold_Brew_Core_Logo.svg" alt="logo" className="w-12 h-auto" />
          <h1 className="text-2xl font-bold">App Promotion</h1>
        </header>

        <p className="mb-4">Promote the mobile app and loyalty options.</p>

        <div className="mt-6 flex gap-4">
          <Link href="/order" className="px-4 py-2 bg-white/10 rounded">Back</Link>
          <Link href="/" className="px-4 py-2 bg-white/10 rounded">Home</Link>
        </div>
      </div>
    </main>
  );
}
