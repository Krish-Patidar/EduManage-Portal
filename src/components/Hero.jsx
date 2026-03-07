import { memo } from "react";
import { motion } from "framer-motion";
import Counter from "./Counter";

const CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};
const FADE_UP = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const STATS_ROW = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.75 } },
};
const STAT_ITEM = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const CARD = {
  hidden:  { opacity: 0, scale: 0.96, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { value: 25000, suffix: "+", label: "Students Trained"    },
  { value: 95,   suffix: "%", label: "Placement Rate"      },
  { value: 100,  suffix: "+", label: "Courses Offered"     },
  { value: 13,    suffix: "+", label: "Years of Excellence" },
];

const TRUST = ["No prior experience needed", "Online & offline batches", "EMI options available"];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
}

const CurvedUnderline = memo(function CurvedUnderline() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute left-0 w-full overflow-visible"
      style={{ bottom: "-10px", height: "12px" }}
      viewBox="0 0 300 12"
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 9 C60 3, 140 3, 298 9"
        stroke="#E10600"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.svg>
  );
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "#08080d" }}
    >
      <style>{`
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-22px) scale(1.04)} 66%{transform:translate(-14px,32px) scale(0.97)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-22px,26px) scale(0.96)} 66%{transform:translate(18px,-18px) scale(1.05)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0)} 25%{transform:translate(18px,-14px)} 50%{transform:translate(-26px,22px)} 75%{transform:translate(8px,-8px)} }
        @keyframes scrollDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute rounded-full" style={{ width: 700, height: 700, background: "radial-gradient(circle,rgba(225,6,0,0.2) 0%,transparent 70%)", top: "-20%", right: "-12%", animation: "blob1 20s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: 550, height: 550, background: "radial-gradient(circle,rgba(200,5,0,0.13) 0%,transparent 70%)", bottom: "-10%", left: "-8%", animation: "blob2 24s ease-in-out infinite", animationDelay: "3s" }} />
        <div className="absolute rounded-full" style={{ width: 380, height: 380, background: "radial-gradient(circle,rgba(255,70,40,0.07) 0%,transparent 70%)", top: "38%", left: "32%", animation: "blob3 30s ease-in-out infinite", animationDelay: "7s" }} />
        <div className="absolute inset-0" style={{ opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "150px" }} />
      </div>

      {/* Glassmorphism card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12">
        <motion.div
          variants={CARD} initial="hidden" animate="visible"
          className="relative rounded-3xl text-center overflow-hidden"
          style={{ padding: "clamp(2rem,6vw,5rem)", background: "rgba(255,255,255,0.035)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)" }} />

          <motion.div variants={CONTAINER} initial="hidden" animate="visible">

            {/* Badge */}
            <motion.div variants={FADE_UP} className="mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ background: "rgba(225,6,0,0.13)", border: "1px solid rgba(225,6,0,0.28)", color: "#ff5544" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse shrink-0" />
                #1 IT Training Institute in Indore
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={FADE_UP} className="font-extrabold leading-[1.1] tracking-tight mb-6 text-white" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
              Upgrade Your IT Career With{" "}
              <span className="relative inline-block pb-3">
                <span style={{ color: "#E10600" }}>Industry-Focused</span>
                <CurvedUnderline />
              </span>{" "}
              Training
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={FADE_UP} className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.95rem,2vw,1.1rem)" }}>
              Join Infoviaan Technologies for job-ready IT training built around real projects, expert mentors, and guaranteed placement support. Start learning today — online or offline.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={() => scrollTo("courses")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-95 hover:brightness-110"
                style={{ background: "linear-gradient(135deg,#E10600 0%,#b80500 100%)", boxShadow: "0 8px 28px rgba(225,6,0,0.38),0 2px 8px rgba(225,6,0,0.2)" }}
              >
                Explore Courses
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 hover:brightness-125"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.8)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Free Demo
              </button>
            </motion.div>

            {/* Trust */}
            <motion.div variants={FADE_UP} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12">
              {TRUST.map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "#E10600" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {text}
                </span>
              ))}
            </motion.div>

            {/* Divider */}
            <div className="w-full h-px mb-10" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }} />

            {/* Stats */}
            <motion.div variants={STATS_ROW} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <motion.div key={s.label} variants={STAT_ITEM} className="text-center">
                  <p className="font-extrabold tabular-nums text-white" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)" }}>
                    <Counter target={s.value} suffix={s.suffix} duration={1800} />
                  </p>
                  <p className="text-xs mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.38)" }}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* Bottom shimmer */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/5 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)" }} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="flex flex-col items-center mt-10 gap-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.7 }}>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Scroll to explore</span>
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.3)", animation: "scrollDot 1.5s ease-in-out infinite" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}