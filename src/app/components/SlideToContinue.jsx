"use client";

import React, { useEffect, useRef, useState } from "react";
import { Lock, Unlock } from "lucide-react";

export default function SlideToContinue({
  label = "Slide to Continue",
  onSuccess,
  disabled = false,
}) {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const posRef = useRef(0);

  const [max, setMax] = useState(0);
  const [pos, setPosState] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [hintActive, setHintActive] = useState(true);

  /*
   * Keep state + ref synchronized
   */
  const setPos = (value) => {
    posRef.current = value;
    setPosState(value);
  };

  /*
   * ---------------------------------------------------------
   * Measure slider
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const thumb = thumbRef.current;

      if (!track || !thumb) return;

      const trackWidth = track.getBoundingClientRect().width;
      const thumbWidth = thumb.getBoundingClientRect().width;

      const inset = 4;

      const available =
        trackWidth -
        thumbWidth -
        inset * 2;

      setMax(Math.max(0, available));
    };

    measure();

    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * Hint animation
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      !hintActive ||
      dragging ||
      unlocked ||
      max <= 0
    ) {
      return;
    }

    let startTime = null;

    const hintDistance = Math.min(
      18,
      Math.max(6, Math.round(max * 0.06))
    );

    const duration = 900;

    const easeOutCubic = (t) =>
      1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed =
        timestamp - startTime;

      const cycle =
        elapsed % duration;

      const half = duration / 2;

      let value = 0;

      if (cycle < half) {
        const progress = cycle / half;

        value =
          easeOutCubic(progress) *
          hintDistance;
      } else {
        const progress =
          (cycle - half) / half;

        value =
          (1 - easeOutCubic(progress)) *
          hintDistance;
      }

      /*
       * Only animate the hint if the user
       * hasn't started dragging.
       */
      if (
        !dragging &&
        !unlocked &&
        posRef.current <= 1
      ) {
        setPos(value);
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [hintActive, dragging, unlocked, max]);

  /*
   * ---------------------------------------------------------
   * Pointer down
   * ---------------------------------------------------------
   */

  const handlePointerDown = (event) => {
    if (disabled || unlocked) return;

    event.preventDefault();

    setDragging(true);
    setHintActive(false);

    if (animationRef.current) {
      cancelAnimationFrame(
        animationRef.current
      );
      animationRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    startXRef.current = event.clientX;
    startPosRef.current = posRef.current;

    /*
     * Capture the pointer so dragging keeps working
     * even when the pointer leaves the thumb.
     */
    try {
      thumbRef.current?.setPointerCapture(
        event.pointerId
      );
    } catch {}
  };

  /*
   * ---------------------------------------------------------
   * Pointer move
   * ---------------------------------------------------------
   */

  const handlePointerMove = (event) => {
    if (
      !dragging ||
      disabled ||
      unlocked
    ) {
      return;
    }

    event.preventDefault();

    const delta =
      event.clientX -
      startXRef.current;

    const nextPosition = Math.min(
      Math.max(
        0,
        startPosRef.current + delta
      ),
      max
    );

    setPos(nextPosition);
  };

  /*
   * ---------------------------------------------------------
   * Pointer up
   * ---------------------------------------------------------
   */

  const handlePointerUp = (event) => {
    if (!dragging) return;

    setDragging(false);

    try {
      thumbRef.current?.releasePointerCapture(
        event.pointerId
      );
    } catch {}

    const currentPosition =
      posRef.current;

    /*
     * Complete slider
     */
    if (
      max > 0 &&
      currentPosition >= max * 0.85
    ) {
      setPos(max);
      setUnlocked(true);

      return;
    }

    /*
     * Snap back to beginning
     */
    animateBack(currentPosition);
  };

  /*
   * ---------------------------------------------------------
   * Animate back
   * ---------------------------------------------------------
   */

  const animateBack = (from) => {
    if (animationRef.current) {
      cancelAnimationFrame(
        animationRef.current
      );
    }

    const startTime = performance.now();
    const duration = 220;

    const animate = (timestamp) => {
      const elapsed =
        timestamp - startTime;

      const progress = Math.min(
        1,
        elapsed / duration
      );

      const eased =
        1 -
        Math.pow(1 - progress, 3);

      const value =
        from * (1 - eased);

      setPos(value);

      if (progress < 1) {
        animationRef.current =
          requestAnimationFrame(
            animate
          );
      } else {
        setPos(0);
      }
    };

    animationRef.current =
      requestAnimationFrame(animate);
  };

  /*
   * ---------------------------------------------------------
   * Keyboard
   * ---------------------------------------------------------
   */

  const handleKeyDown = (event) => {
    if (disabled || unlocked) return;

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      setHintActive(false);
      setPos(max);
      setUnlocked(true);

      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      setHintActive(false);

      setPos(
        Math.min(
          max,
          posRef.current + 20
        )
      );

      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setHintActive(false);

      setPos(
        Math.max(
          0,
          posRef.current - 20
        )
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * Success / reset
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!unlocked) return;

    onSuccess?.();

    timeoutRef.current = setTimeout(() => {
      setUnlocked(false);
      setPos(0);
      setHintActive(true);
    }, 1200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [unlocked, onSuccess]);

  /*
   * ---------------------------------------------------------
   * Cleanup
   * ---------------------------------------------------------
   */

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      if (timeoutRef.current) {
        clearTimeout(
          timeoutRef.current
        );
      }
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className={`
          relative
          w-full
          h-14
          rounded-full
          overflow-hidden
          bg-gradient-to-b
          from-[#0b0b0b]
          via-[#111111]
          to-[#0b0b0b]
          shadow-inner
          select-none
          ${
            disabled
              ? "opacity-50"
              : ""
          }
        `}
        style={{
          touchAction: "none",
        }}
      >
        {/* ---------------------------------------------
            Progress fill
        ---------------------------------------------- */}

        <div
          className="
            absolute
            left-0
            top-0
            bottom-0
            rounded-full
            bg-white/[0.08]
            pointer-events-none
          "
          style={{
            width:
              max > 0
                ? `${Math.min(
                    100,
                    ((pos + 24) /
                      (max + 48)) *
                      100
                  )}%`
                : "0%",
          }}
        />

        {/* ---------------------------------------------
            Center text
        ---------------------------------------------- */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            pointer-events-none
            select-none
            z-10
          "
        >
          <span
            className="
              text-white
              text-base
              md:text-lg
              font-semibold
              tracking-tight
            "
          >
            {unlocked
              ? "Unlocked"
              : label}
          </span>
        </div>

        {/* ---------------------------------------------
            Draggable thumb
        ---------------------------------------------- */}

        <div
          ref={thumbRef}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={Math.round(pos)}
          aria-disabled={disabled}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          className={`
            absolute
            left-1
            top-1
            w-12
            h-12
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            shadow-lg
            z-20
            will-change-transform
            ${
              dragging
                ? "scale-105 cursor-grabbing"
                : "scale-100 cursor-grab"
            }
            ${
              disabled
                ? "cursor-not-allowed"
                : ""
            }
          `}
          style={{
            transform: `translateX(${pos}px)`,
            touchAction: "none",
            transition: dragging
              ? "none"
              : "transform 150ms ease",
          }}
        >
          {unlocked ? (
            <Unlock
              size={20}
              strokeWidth={2}
              className="text-[#111111]"
            />
          ) : (
            <Lock
              size={20}
              strokeWidth={2}
              className="text-[#111111]"
            />
          )}
        </div>
      </div>
    </div>
  );
}