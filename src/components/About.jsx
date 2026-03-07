import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import founderImage from "../assets/vidyut.jpeg";

// ─── Variants (unchanged from original) ───────────────────────────
const FADE_UP = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};
const STAGGER_CARDS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const CARD_V = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
};

// ─── New section variants ──────────────────────────────────────────
const FADE_LEFT = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};
const FADE_RIGHT = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Static data (unchanged from original) ────────────────────────
const WHY_US = [
  {
    title: "Industry Expert Trainers",
    desc:  "Learn from working professionals with 8–15 years of real-world IT experience across top MNCs and startups.",
    path:  "M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 10-8 0 4 4 0 008 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Live Projects & Portfolio",
    desc:  "Build a strong portfolio with hands-on projects that mirror real industry requirements — not just theory.",
    path:  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    title: "100% Placement Support",
    desc:  "Resume building, mock interviews, LinkedIn optimization, and direct referrals to our 50+ hiring partners.",
    path:  "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Flexible Batches",
    desc:  "Weekday, weekend, or fast-track. Both online and offline modes available to fit your schedule.",
    path:  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

// ─── New static data ───────────────────────────────────────────────
const MILESTONES = [
  { value: "13+",     label: "Years of Excellence", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "25,000+", label: "Students Trained",    icon: "M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 10-8 0 4 4 0 008 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" },
  { value: "50+",    label: "Companies Hiring",    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { value: "95%",     label: "Placement Rate",      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const CERTS = [
  {
    title: "ISO 9001:2015",
    desc:  "Certified Quality Management System for Training Excellence",
    badge: "Quality Certified",
    icon:  "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "IAF Certified",
    desc:  "International Accreditation Forum Recognition",
    badge: "International",
    icon:  "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "DAkkS Certified",
    desc:  "German Accreditation Body Recognition",
    badge: "German Accredited",
    icon:  "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
];

export default function About() {

  // ── Existing refs (unchanged) ──────────────────────────────────
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  // ── New section refs ───────────────────────────────────────────
  const storyRef      = useRef(null);
  const storyInView   = useInView(storyRef, { once: true, amount: 0.08 });

  const founderRef    = useRef(null);
  const founderInView = useInView(founderRef, { once: true, amount: 0.1 });

  const certRef    = useRef(null);
  const certInView = useInView(certRef, { once: true, amount: 0.08 });

  return (
    <>

      {/* ════════════════════════════════════════════════════════════
          EXISTING SECTION — Why Infoviaan (COMPLETELY UNCHANGED)
      ════════════════════════════════════════════════════════════ */}
      <section id="about">
         <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">

          <motion.div
            ref={ref}
            className="text-center mb-14"
            variants={FADE_UP}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
              Why Infoviaan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Built for Real Career Outcomes
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              We don't just teach — we prepare. Every element of our program is designed to get you hired fast.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={STAGGER_CARDS}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {WHY_US.map((item) => (
              <motion.div
                key={item.title}
                variants={CARD_V}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-red-50 text-[#E10600] rounded-xl mb-5 group-hover:bg-[#E10600] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          NEW SECTION 1 — Building Tech Leaders Since 2013
      ════════════════════════════════════════════════════════════ */}
      <div className="py-20 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            ref={storyRef}
            className="text-center mb-16"
            variants={FADE_UP}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
          >
            <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Building Tech Leaders Since 2013
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left — text content */}
            <motion.div
              variants={FADE_LEFT}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
            >
              {/* Decorative left border */}
              <div className="pl-6 border-l-4 border-[#E10600] space-y-5 mb-8">
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Infoviaan Technologies was founded with a simple yet powerful vision: to make quality IT education accessible to everyone. Located in Indore, the IT hub of Central India, we've grown from a small training center to one of the most trusted institutes in the region.
                </p>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  Over the years, we've trained more than 25,000 students and professionals, helping them secure positions in leading IT companies across India and abroad.
                </p>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  We believe that learning should be engaging, practical, and aligned with real-world requirements. That's why our courses are designed in collaboration with industry experts and are continuously updated to reflect the latest technological trends.
                </p>
              </div>

              {/* Location badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm">
                <svg className="w-4 h-4 text-[#E10600]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Indore, Madhya Pradesh</span>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-500">Est. 2013</span>
              </div>
            </motion.div>

            {/* Right — milestone stat cards */}
            <motion.div
              variants={FADE_RIGHT}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Subtle top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #E10600, transparent)" }} />
                  {/* Icon */}
                  <div className="w-9 h-9 flex items-center justify-center bg-red-50 text-[#E10600] rounded-xl mb-4">
                    <svg className="w-4.5 h-4.5 w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                    </svg>
                  </div>
                  <p className="text-2xl font-extrabold text-[#E10600] tabular-nums leading-none">{m.value}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-2 leading-snug">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
      </section>
     

      {/* ════════════════════════════════════════════════════════════
          NEW SECTION 2 — Founder & Director Message
      ════════════════════════════════════════════════════════════ */}
      <section id="leadership" className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            ref={founderRef}
            className="text-center mb-14"
            variants={FADE_UP}
            initial="hidden"
            animate={founderInView ? "visible" : "hidden"}
          >
            <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              A Word From Our Founder
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              The vision and values that have shaped Infoviaan Technologies into what it is today.
            </p>
          </motion.div>

          {/* Founder card */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            animate={founderInView ? "visible" : "hidden"}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #fff5f5 0%, #ffffff 50%, #fff8f8 100%)",
              border: "1px solid rgba(225,6,0,0.09)",
              boxShadow: "0 8px 48px rgba(225,6,0,0.08), 0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            {/* Top gradient bar */}
            <div className="h-1" style={{ background: "linear-gradient(90deg, #E10600 0%, #ff5544 50%, #E10600 100%)" }} />

            {/* Decorative background circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.03]" style={{ background: "#E10600" }} />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-[0.03]" style={{ background: "#E10600" }} />

            <div className="relative z-10 flex flex-col items-center px-8 sm:px-16 py-14">

              {/* Circular photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={founderInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-8"
              >
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-30"
                  style={{ background: "radial-gradient(circle, #E10600, transparent)", transform: "scale(1.3)" }}
                />
                {/* Photo container */}
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    border: "4px solid #ffffff",
                    boxShadow: "0 0 0 3px #E10600, 0 16px 48px rgba(225,6,0,0.2)",
                    background: "linear-gradient(135deg, #ffeeed 0%, #fff5f5 100%)",
                  }}
                >
                  
                    <img src={founderImage} alt="Dr. Vidyut Singhai" className="w-full h-full object-cover" />
                 
                  <svg className="w-20 h-20 sm:w-24 sm:h-24 text-[#E10600] opacity-20" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </motion.div>

              {/* Large decorative quote mark */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={founderInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mb-5"
              >
                <svg className="w-12 h-12 mx-auto" style={{ color: "rgba(225,6,0,0.12)" }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </motion.div>

              {/* Message text */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={founderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.52 }}
                className="text-center max-w-2xl space-y-4 mb-10"
              >
                <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base">
                  "When we started Infoviaan Technologies in 2013, our goal was never just to run a training institute. It was to change lives. We wanted to create a place where a student from any background could walk in, learn the skills that the industry demands, and walk out with the confidence and capability to build a meaningful career in technology."
                </p>
                <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base">
                  "Today, seeing over 25,000 of our students thriving in companies across India and the world is the greatest reward. We remain committed to our founding principle — that quality education, delivered with integrity and purpose, can transform not just careers, but entire families and communities."
                </p>
              </motion.div>

              {/* Divider */}
              <div className="w-20 h-0.5 rounded-full mb-7" style={{ background: "linear-gradient(90deg, transparent, #E10600, transparent)" }} />

              {/* Name block */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={founderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.42, duration: 0.45 }}
                className="text-center"
              >
                <p className="text-xl font-extrabold text-gray-900 tracking-tight">Dr. Vidyut Singhai</p>
                <p className="text-sm font-semibold text-[#E10600] mt-1">Founder & Director</p>
                <p className="text-xs text-gray-400 mt-1 tracking-wide uppercase">Infoviaan Technologies · Indore</p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          NEW SECTION 3 — Certifications
      ════════════════════════════════════════════════════════════ */}
      <section id="accreditations" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            ref={certRef}
            className="text-center mb-14"
            variants={FADE_UP}
            initial="hidden"
            animate={certInView ? "visible" : "hidden"}
          >
            <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
              Accreditations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Recognised & Certified
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Our commitment to quality is validated by internationally recognised accreditation bodies.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={STAGGER_CARDS}
            initial="hidden"
            animate={certInView ? "visible" : "hidden"}
          >
            {CERTS.map((cert) => (
              <motion.div
                key={cert.title}
                variants={CARD_V}
                whileHover={{ y: -8, transition: { duration: 0.22, ease: "easeOut" } }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image / icon placeholder area */}
                <div
                  className="relative w-full h-48 flex flex-col items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #fff5f5 0%, #fef2f2 60%, #fff8f8 100%)" }}
                >
                  {/* Decorative concentric rings */}
                  <div className="absolute w-56 h-56 rounded-full border border-[#E10600]/[0.06]" />
                  <div className="absolute w-40 h-40 rounded-full border border-[#E10600]/[0.08]" />
                  <div className="absolute w-24 h-24 rounded-full border border-[#E10600]/[0.10]" />

                  {/*
                    Replace with actual cert image:
                    <img src="/cert-iso.png" alt={cert.title} className="h-24 w-auto object-contain relative z-10" />
                  */}

                  {/* Icon placeholder */}
                  <motion.div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                    style={{ background: "linear-gradient(135deg, #E10600, #b80500)", boxShadow: "0 8px 28px rgba(225,6,0,0.32)" }}
                    whileHover={{ scale: 1.1, rotate: 3, transition: { duration: 0.2 } }}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={cert.icon} />
                    </svg>
                  </motion.div>

                  {/* Badge pill */}
                  <span className="relative z-10 text-[10px] font-bold text-[#E10600] tracking-widest uppercase bg-white px-3 py-1 rounded-full border border-[#E10600]/20 shadow-sm">
                    {cert.badge}
                  </span>
                </div>

                {/* Text content */}
                <div className="p-7 text-center">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
                </div>

                {/* Animated bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-4/5 rounded-full transition-all duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, #E10600, transparent)" }}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

</>

  );
}