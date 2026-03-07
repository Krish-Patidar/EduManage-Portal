import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  { id: 1, name: "Priya Sharma",   course: "Java Full Stack",    role: "Java Developer at TCS",        avatar: "PS", bg: "#E10600", feedback: "Infoviaan completely changed my career. The structured curriculum and dedicated mentors helped me land my first IT job within 2 months. The mock interviews were invaluable." },
  { id: 2, name: "Rohan Desai",    course: "MERN Stack",         role: "Frontend Dev at Infosys",      avatar: "RD", bg: "#2563eb", feedback: "Every module had a real project attached — not just theory. The placement team helped me secure my offer before the course even ended. Truly hands-on experience." },
  { id: 3, name: "Anjali Mehta",   course: "Data Analytics",     role: "Data Analyst at Wipro",        avatar: "AM", bg: "#7c3aed", feedback: "I had zero coding background when I joined. The trainers made Python and data analysis feel approachable. Within 4 months I had a strong portfolio and a job offer." },
  { id: 4, name: "Vikram Patel",   course: "UI/UX Design",       role: "Product Designer at Accenture",avatar: "VP", bg: "#d97706", feedback: "The UI/UX course gave me a proper design foundation — from wireframing to full Figma prototypes. I built 6 portfolio projects during the course itself." },
  { id: 5, name: "Sneha Kulkarni", course: "Digital Marketing",  role: "Marketing at StartupX",        avatar: "SK", bg: "#059669", feedback: "The practical approach to SEO, Google Ads, and analytics set this course apart from anything online. I doubled my freelance income within 3 months of completing the program." },
  { id: 6, name: "Arjun Nair",     course: "Python Programming", role: "Backend Dev at HCL",           avatar: "AN", bg: "#0891b2", feedback: "From core Python to building REST APIs, the progression was perfectly paced. The trainer's industry experience showed in every session. Placed at HCL within weeks." },
];

const TOTAL = TESTIMONIALS.length;
const SLIDE_INTERVAL = 4000;

const SLIDE = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 56 : -56 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -56 : 56, transition: { duration: 0.3, ease: "easeIn" } }),
};

const Stars = memo(function Stars() {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {[0,1,2,3,4].map(i => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" style={{ fill: "#E10600" }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
});

const Card = memo(function Card({ t }) {
  return (
    <div
      className="flex flex-col h-full rounded-2xl p-7 bg-white"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
    >
      <svg className="w-7 h-7 mb-4 shrink-0" style={{ color: "#fecaca" }} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <Stars />
      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6">"{t.feedback}"</p>
      <div className="h-px bg-gray-100 mb-5" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: t.bg }}>
          {t.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{t.name}</p>
          <p className="text-xs text-gray-400 truncate">{t.role}</p>
        </div>
        <span className="ml-auto shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(225,6,0,0.07)", color: "#E10600" }}>
          {t.course}
        </span>
      </div>
    </div>
  );
});

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir,     setDir]     = useState(1);
  const [paused,  setPaused]  = useState(false);

  const go   = useCallback((idx, d) => { setDir(d); setCurrent((idx + TOTAL) % TOTAL); }, []);
  const next = useCallback(() => go(current + 1,  1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const visible = [
    TESTIMONIALS[current % TOTAL],
    TESTIMONIALS[(current + 1) % TOTAL],
    TESTIMONIALS[(current + 2) % TOTAL],
  ];

  return (
    <section id="reviews" className="py-20 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
            Student Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Real outcomes from real people. Over 25,000 students trained across India.
          </p>
          <div className="inline-flex items-center gap-2.5 mt-6 bg-white border border-gray-100 shadow-sm rounded-full px-5 py-2.5">
            <Stars />
            <span className="text-sm font-bold text-gray-800">5.0</span>
            <span className="text-sm text-gray-300">·</span>
            <span className="text-sm text-gray-500">Based on 1200+ reviews</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Desktop: 3 cards */}
          <div className="hidden md:block">
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div key={current} custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit" className="grid grid-cols-3 gap-6">
                {visible.map((t, i) => <Card key={`${t.id}-${i}`} t={t} />)}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Mobile: 1 card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={current} custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit">
                <Card t={TESTIMONIALS[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button onClick={prev} aria-label="Previous" className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#E10600] hover:text-[#E10600] transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? 24 : 8, height: 8, background: i === current ? "#E10600" : "#d1d5db" }}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#E10600] hover:text-[#E10600] transition-all duration-200 hover:-translate-y-0.5 active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Progress bar */}
        {!paused && (
          <div className="mt-5 max-w-xs mx-auto h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div key={current} className="h-full bg-[#E10600] rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }} />
          </div>
        )}
      </div>
    </section>
  );
}