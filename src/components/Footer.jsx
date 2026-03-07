import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FADE_UP = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 } }),
};

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
}

const QUICK_LINKS = [
  { label: "Home",               id: "home"    },
  { label: "About Us",           id: "about" },
  { label: "Placement & Career", id: "placement"   },
  { label: "Feedback",           id: "reviews" },
  { label: "Contact",            id: "contact" },
];

const COURSES = [
  "MERN Stack Development",
  "Java Full Stack",
  "Python Programming",
  "Data Analytics & Python",
  "Data Science with ML",
  "UI/UX Design",
  "Digital Marketing",
];

const CONTACT = [
  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "118, 1st Floor, Shagun Arcade, Near Medanta Hospital, Vijay Nagar, Indore (M.P.) 452010" },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "+91 7049290123" },
  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "hr@infoviaan.com" },
];

const SOCIALS = [
  { label: "Instagram", url: "https://www.instagram.com/infoviaantechno/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/infoviaan-technologies-564aaa179/",  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "X", url:"https://x.com/infoviaan", path: "M18.244 2H21.5l-7.19 8.21L22 22h-6.828l-5.348-7.006L3.5 22H.244l7.7-8.793L0 2h6.996l4.84 6.42L18.244 2zM16.8 20h1.89L7.08 4H5.09L16.8 20z" },
  { label: "WhatsApp", url: "https://whatsapp.com/channel/0029VaDtSU7F6sn47CVawA1z", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
];

export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <footer className="bg-gray-900 text-white">

      {/* ── CTA Banner ── */}
      <div className="relative overflow-hidden py-14 px-4" style={{ background: "linear-gradient(135deg, #E10600 0%, #b80500 100%)" }}>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Your IT Career Starts Here. Today.</h2>
          <p className="text-red-100 mb-7 max-w-xl mx-auto text-sm leading-relaxed">
            Join thousands of students who transformed their careers with Infoviaan Technologies. Seats are limited — don't miss your batch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#E10600] font-bold rounded-xl shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 text-sm"
            >
              Start Your Journey Today
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("courses")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white text-white font-semibold rounded-xl hover:bg-red-700 active:scale-95 transition-all duration-200 text-sm"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <motion.div custom={0} variants={FADE_UP} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #E10600, #b80500)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-white tracking-tight leading-none">Infoviaan <span className="text-[#E10600]">Technologies</span></p>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-0.5">IT Training Institute</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              India's leading IT training institute helping students land their dream jobs through industry-focused programs and dedicated placement support.
            </p>
          <div className="flex items-center gap-2.5">
  {SOCIALS.map((s) => (
    <a
      key={s.label}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.label}
      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#E10600] border border-gray-700 hover:border-[#E10600] transition-all duration-200"
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d={s.path} />
      </svg>
    </a>
  ))}
</div>
          </motion.div>

          {/* Col 2 — Quick links */}
          <motion.div custom={1} variants={FADE_UP} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, id }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                >
                  <button
                    onClick={() => scrollTo(id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Courses */}
          <motion.div custom={2} variants={FADE_UP} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-5">Our Courses</h4>
            <ul className="space-y-2.5">
              {COURSES.map((course, i) => (
                <motion.li
                  key={course}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
                >
                  <button
                    onClick={() => scrollTo("courses")}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 group text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                    {course}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div custom={3} variants={FADE_UP} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-5">Contact Us</h4>
            <ul className="space-y-4">
              {CONTACT.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-800 text-[#E10600] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{item.text}</p>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-7">
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-gray-800 text-white placeholder-gray-500 rounded-xl border border-gray-700 focus:outline-none focus:border-[#E10600] transition-colors duration-200"
                />
                <button
                  className="px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 hover:brightness-110 shrink-0"
                  style={{ background: "linear-gradient(135deg,#E10600,#b80500)" }}
                >
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Infoviaan Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Develoepd by Krish Patidar"].map((l) => (
              <a key={l} href="https://www.linkedin.com/in/krish-patidar01/" target="_blank" className="text-xs text-gray-500 hover:text-white transition-colors duration-200">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}