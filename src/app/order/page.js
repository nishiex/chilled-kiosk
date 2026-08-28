import Link from "next/link";

export default function OrderTypePage() {
  return (
    <main className="kiosk min-h-screen flex items-center justify-center bg-[var(--blue)]">
      <div className="content max-w-3xl w-full p-6 flex flex-col items-center">
        <header className="brand flex items-center gap-4 mb-8">
          <img src="/fonts/images/social/Chilld_Cold_Brew_Core_Logo.svg" alt="Chilled logo" className="w-16 h-auto" />
          <div>
            <div className="brand-mark text-white text-2xl font-extrabold">CHILLED</div>
            <div className="brand-subtitle text-white/80 text-xs">Choose Order Type</div>
          </div>
        </header>

        <h2 className="text-white text-xl font-semibold mb-4">How would you like to order?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Link href="/popular" className="block p-6 rounded-xl bg-white/6 border border-white/20 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
            <div className="flex items-center">
              <div className="text-2xl font-extrabold mr-4">01</div>
              <div>
                <div className="font-semibold text-lg">Popular Recipes</div>
                <div className="text-sm text-white/70">Choose from our favourites</div>
              </div>
              <div className="ml-auto text-2xl">↴</div>
            </div>
          </Link>

          <Link href="/create" className="block p-6 rounded-xl bg-white/6 border border-white/20 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
            <div className="flex items-center">
              <div className="text-2xl font-extrabold mr-4">02</div>
              <div>
                <div className="font-semibold text-lg">Create Your Own Signature Drink</div>
                <div className="text-sm text-white/70">Make your signature drink</div>
              </div>
              <div className="ml-auto text-2xl">↴</div>
            </div>
          </Link>

          <Link href="/previous" className="block p-6 rounded-xl bg-white/6 border border-white/20 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
            <div className="flex items-center">
              <div className="text-2xl font-extrabold mr-4">03</div>
              <div>
                <div className="font-semibold text-lg">Previous Creations</div>
                <div className="text-sm text-white/70">Order a saved favourite</div>
              </div>
              <div className="ml-auto text-2xl">↴</div>
            </div>
          </Link>

          <Link href="/concentrates" className="block p-6 rounded-xl bg-white/6 border border-white/20 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
            <div className="flex items-center">
              <div className="text-2xl font-extrabold mr-4">04</div>
              <div>
                <div className="font-semibold text-lg">Buy Bottled Concentrate</div>
                <div className="text-sm text-white/70">Take the experience home</div>
              </div>
              <div className="ml-auto text-2xl">↴</div>
            </div>
          </Link>
        </div>

        <footer className="mt-8 text-white/80">Touch an option to continue</footer>
      </div>
    </main>
  );
}
