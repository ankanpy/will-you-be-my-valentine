"use client";
import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  tx: number;
  ty: number;
}

const BACKGROUND_HEARTS = [
  { id: 1, left: "8%", size: "1.3rem", duration: "9s", delay: "0s", emoji: "💖" },
  { id: 2, left: "18%", size: "0.9rem", duration: "12s", delay: "2s", emoji: "💕" },
  { id: 3, left: "28%", size: "1.5rem", duration: "10s", delay: "4s", emoji: "🌸" },
  { id: 4, left: "42%", size: "1.1rem", duration: "14s", delay: "1s", emoji: "❤️" },
  { id: 5, left: "55%", size: "1.4rem", duration: "11s", delay: "3s", emoji: "✨" },
  { id: 6, left: "68%", size: "1rem", duration: "13s", delay: "5s", emoji: "💘" },
  { id: 7, left: "78%", size: "1.6rem", duration: "9.5s", delay: "2.5s", emoji: "💖" },
  { id: 8, left: "88%", size: "1.2rem", duration: "12s", delay: "0.5s", emoji: "💕" },
  { id: 9, left: "94%", size: "0.8rem", duration: "15s", delay: "3.5s", emoji: "🌸" },
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  const yesButtonSize = Math.min(noCount * 18 + 18, 120);

  const phrases = [
    "No",
    "Are you sure?",
    "What if I asked really nicely?",
    "Pretty please",
    "With a chocolate rice cake on top",
    "What about a matcha frostie",
    "PLEASE DUDUUU",
    "But :*(",
    "I am going to die",
    "Yep im dead",
    "ok ur talking to nathan's ghost",
    "please babe",
    ":((((",
    "PRETTY PLEASE",
    "Estoy muerto",
    "No :(",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const fireHeartConfetti = useCallback(() => {
    // Fire burst 1
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#f43f5e", "#ec4899", "#fb7185", "#fda4af", "#ffffff"],
    });

    // Fire side bursts
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f43f5e", "#fb7185", "#fda4af"],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f43f5e", "#fb7185", "#fda4af"],
      });
    }, 250);
  }, []);

  const handleYesClick = () => {
    setYesPressed(true);
    fireHeartConfetti();
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 380);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn hearts if clicking on the background, not buttons
    if ((e.target as HTMLElement).tagName.toLowerCase() === "button") return;

    const emojis = ["💖", "💕", "💘", "✨", "🌸", "🌹"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const tx = (Math.random() - 0.5) * 80;
    const ty = -60 - Math.random() * 50;
    const newHeart: ClickHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      emoji: randomEmoji,
      tx,
      ty,
    };

    setClickHearts((prev) => [...prev.slice(-15), newHeart]);
  };

  useEffect(() => {
    if (clickHearts.length > 0) {
      const timer = setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => Date.now() - h.id < 900));
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [clickHearts]);

  return (
    <div
      onClick={handleBackgroundClick}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 flex flex-col items-center justify-center p-4 selection:bg-rose-200 selection:text-rose-900"
    >
      {/* Ambient glowing radial orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-300/40 blur-3xl animate-pulseGlow" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-300/40 blur-3xl animate-pulseGlow" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-rose-200/30 blur-3xl" />

      {/* Floating background ambient hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {BACKGROUND_HEARTS.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart select-none"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Interactive click heart bursts */}
      {clickHearts.map((h) => (
        <span
          key={h.id}
          className="click-heart select-none text-2xl"
          style={
            {
              left: `${h.x}px`,
              top: `${h.y}px`,
              "--tx": `${h.tx}px`,
              "--ty": `${h.ty}px`,
            } as React.CSSProperties
          }
        >
          {h.emoji}
        </span>
      ))}

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto backdrop-blur-xl bg-white/80 border border-white/70 rounded-3xl p-6 sm:p-10 card-glow transition-all duration-500 text-center">
        {yesPressed ? (
          <div className="flex flex-col items-center animate-fade-in">
            {/* Bear Celebration Animation */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-300" />
              <img
                alt="Bear kiss celebrate"
                className="relative rounded-2xl shadow-md h-52 sm:h-64 object-contain animate-float"
                src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              />
            </div>

            <div className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-500 animate-heartbeat text-glow">
              WOOOOOO!!! 🎉
            </div>
            
            <p className="mt-2 text-2xl sm:text-3xl font-romantic text-rose-600 font-bold">
              I love you duduuu!! 💕
            </p>

            <div className="mt-6 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-500 text-sm font-medium flex items-center gap-2 shadow-sm">
              <span>🌹</span> Best Valentine Ever <span>✨</span>
            </div>

            <button
              onClick={() => {
                setYesPressed(false);
                setNoCount(0);
              }}
              className="mt-8 text-xs font-semibold text-rose-400 hover:text-rose-600 underline underline-offset-4 transition"
            >
              Play again ↺
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Cute Header Pill Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-rose-100/80 px-3.5 py-1 text-xs font-semibold tracking-wide text-rose-600 border border-rose-200/60 shadow-sm">
              <span>💌</span> A question for my special one
            </div>

            {/* Bear gif with subtle floating effect */}
            <div className="relative my-2">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-rose-300 to-pink-300 rounded-2xl blur-sm opacity-50" />
              <img
                alt="Cute bear with roses"
                className="relative h-[180px] sm:h-[210px] rounded-2xl object-contain drop-shadow-md animate-float"
                src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
              />
            </div>

            {/* Romantic Heading */}
            <h1 className="mt-4 mb-1 text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 tracking-tight">
              Will you be my Valentine?
            </h1>
            <p className="font-romantic text-xl sm:text-2xl text-rose-400 mb-6 font-semibold">
              Say yes and make my day 💕
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <button
                className="rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:brightness-105 active:scale-95 transition-all duration-300 animate-heartbeat flex items-center justify-center gap-2"
                style={{
                  fontSize: `${yesButtonSize}px`,
                  padding: `${Math.max(12, yesButtonSize * 0.42)}px ${Math.max(24, yesButtonSize * 0.85)}px`,
                }}
                onClick={handleYesClick}
              >
                <span>💖</span> Yes
              </button>

              <button
                onClick={handleNoClick}
                className={`rounded-2xl px-5 py-3 text-base font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all duration-200 ${
                  isWiggling ? "animate-wiggle" : ""
                }`}
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>

            {/* Playful hint text if clicked No */}
            {noCount > 0 && (
              <p className="mt-4 text-xs font-medium text-rose-400/80 animate-pulse">
                Hint: The green button is getting harder to resist... 🌸
              </p>
            )}
          </div>
        )}
      </div>

      {/* Subdued romantic footer */}
      <footer className="mt-6 text-center text-xs text-rose-400/70 font-medium">
        Made with ❤️ for Valentine's Day
      </footer>
    </div>
  );
}
