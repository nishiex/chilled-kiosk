"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Image from "next/image";

export default function KioskHome() {
  const artworkRef = useRef(null);
  const tweenRef = useRef(null);
  const resizeRef = useRef(null);

  useEffect(() => {
    const artwork = artworkRef.current;

    if (!artwork) return;

    const createArtworkLoop = () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      gsap.set(artwork, {
        xPercent: -50,
        yPercent: -50,
        scale: 1.1,
        force3D: true,
        transformOrigin: "center center",
      });

      tweenRef.current = gsap.to(artwork, {
        xPercent: -54,
        yPercent: -54,
        scale: 1.13,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    createArtworkLoop();

    const handleResize = () => {
      clearTimeout(resizeRef.current);

      resizeRef.current = setTimeout(() => {
        createArtworkLoop();
      }, 180);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeRef.current);

      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, []);

  const handleOption = (action) => {
    console.log(`Selected: ${action}`);
  };

  const options = [
    {
      number: "01",
      title: "Popular Recipes",
      description: "Choose from our favourites",
      action: "popular",
    },
    {
      number: "02",
      title: "Create Your Own",
      description: "Make your signature drink",
      action: "create",
    },
    {
      number: "03",
      title: "Previous Creations",
      description: "Order a saved favourite",
      action: "previous",
    },
    {
      number: "04",
      title: "Bottled Concentrate",
      description: "Take the experience home",
      action: "concentrate",
    },
  ];

  return (
    <main className="relative h-screen min-h-[600px] w-screen overflow-hidden bg-[#1844ab] text-white">

      <section
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#1844ab]"
        aria-hidden="true"
      >
        <img
          ref={artworkRef}
          src="/kiosk-art.svg"
          alt=""
          draggable={false}
          className="
            absolute
            left-1/2
            top-[100%]
            block
            h-[180%]
            w-[120%]
            max-w-none
            -translate-x-1/2
            -translate-y-1/2
            select-none
            object-cover
            object-center
            will-change-transform
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(90deg,rgba(24,68,171,.94)_0%,rgba(24,68,171,.72)_35%,rgba(24,68,171,.18)_70%,rgba(24,68,171,.55)_100%)]
          "
        />
      </section>

      {/* =========================
          CONTENT
      ========================== */}

      <section className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-[clamp(22px,4vw,64px)] py-[clamp(28px,4vw,64px)]">

        {/* BRAND */}

        <div className="flex items-baseline gap-3 tracking-[0.08em]">
          <span className="text-[clamp(18px,1.5vw,26px)] font-extrabold">
            CHILLED
          </span>

          <span className="text-[10px] font-bold opacity-70">
            SELF ORDERING
          </span>
        </div>

        {/* HERO */}

        <div className="mt-[clamp(55px,10vh,130px)] max-w-[720px]">

          <p className="mb-[14px] text-xs font-bold tracking-[0.2em] opacity-70">
            WELCOME
          </p>

          <h1 className="m-0 text-[clamp(48px,6.5vw,104px)] font-extrabold leading-[0.94] tracking-[-0.055em]">
            What would you
            <br />
            <span className="opacity-70">
              like today?
            </span>
          </h1>

          <p className="mt-[26px] max-w-[500px] text-[clamp(15px,1.25vw,19px)] leading-[1.5] text-white/80">
            Build something refreshing, choose a favourite, or grab a bottle
            to take home.
          </p>

        </div>

        {/* OPTIONS */}

        <div
          className="
            mt-auto
            grid
            w-full
            max-w-[760px]
            grid-cols-1
            gap-3
            md:grid-cols-2
          "
          role="navigation"
          aria-label="Ordering options"
        >

          {options.map((option) => (
            <button
              key={option.action}
              type="button"
              onClick={() => handleOption(option.action)}
              className="
                group
                grid
                min-h-[88px]
                grid-cols-[42px_1fr_28px]
                items-center
                rounded-[20px]
                border
                border-white/20
                bg-white/10
                px-[22px]
                py-5
                text-left
                text-white
                backdrop-blur-lg
                transition-all
                duration-200
                ease-out
                hover:-translate-y-1
                hover:border-white/40
                hover:bg-white/[0.16]
                active:scale-[0.985]
                md:min-h-[116px]
              "
            >

              <span className="self-start w-10 h-10 flex items-center justify-center">
                <Image src={'/' + option.number + '.svg'} alt={option.title + ' icon'} width={32} height={32} unoptimized />
              </span>

              <span>
                <strong className="mb-1 block text-[clamp(17px,1.5vw,23px)]">
                  {option.title}
                </strong>

                <small className="text-xs text-white/65">
                  {option.description}
                </small>
              </span>

              <span className="justify-self-end text-[22px] opacity-70 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>

            </button>
          ))}

        </div>

        {/* FOOTER */}

        <footer className="flex justify-between gap-5 pt-[22px] text-[11px] tracking-[0.04em] text-white/50">
          <span>
            Touch anywhere to begin
          </span>

          <span className="hidden sm:block">
            Tap an option to continue
          </span>
        </footer>
    
      </section>
    </main>
  );
}


