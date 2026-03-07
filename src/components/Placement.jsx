import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const PLACEMENT_STATS = [
  { value: "95%",       label: "Placement Rate",     sub: "Among all eligible students" },
  { value: "50+",       label: "Hiring Partners",    sub: "Across IT sectors"           },
  { value: "60 Days",   label: "Avg. Time to Offer", sub: "After course completion"     },
  { value: "₹4–8 LPA", label: "Average Package",   sub: "For placed students"         },
];

const CHECKLIST = [
  "Resume & LinkedIn profile building",
  "1-on-1 mock interview sessions",
  "Aptitude & coding test preparation",
  "Direct referrals to 50+ hiring partners",
  "Soft skills & communication training",
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
}

export default function Placement() {
  const ref2    = useRef(null);
  const inView2 = useInView(ref2, { once: true, amount: 0.08 });

  return (
    <section id="placement" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left text */}
          <motion.div
            ref={ref2}
            variants={FADE_UP}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
          >
            <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
              Placement & Career
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-5 leading-snug">
              We Don't Stop at Teaching —{" "}
              <span className="text-[#E10600]">We Get You Hired</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our dedicated placement cell works alongside your training from day one. We align your profile with market demands and connect you directly with our hiring partners across India.
            </p>
            <ul className="space-y-3.5 mb-8">
              {CHECKLIST.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.42, ease: "easeOut" }}
                  className="flex items-center gap-3 text-gray-700 text-sm"
                >
                  <span className="w-5 h-5 flex items-center justify-center bg-red-100 text-[#E10600] rounded-full shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={() => scrollTo("contact")}
              initial={{ opacity: 0, y: 10 }}
              animate={inView2 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-7 py-3 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 hover:brightness-110"
              style={{ background: "linear-gradient(135deg,#E10600,#b80500)", boxShadow: "0 6px 20px rgba(225,6,0,0.3)" }}
            >
              Book Free Counseling
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Right stat cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={STAGGER_CARDS}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
          >
            {PLACEMENT_STATS.map((card) => (
              <motion.div
                key={card.label}
                variants={CARD_V}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-3xl font-extrabold text-[#E10600]">{card.value}</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{card.label}</p>
                <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}