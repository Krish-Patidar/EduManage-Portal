import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FADE_UP = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

const COURSES = [
  "MERN Stack Development", "Java Full Stack", "Python Programming",
  "Data Analytics & Python", "Data Science with ML", "UI/UX Design",
  "Digital Marketing", "SQL & Database Management", "Graphic Design Essentials",
];

const INFO_CARDS = [
  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Visit Us",      value: "118, 1st Floor, Shagun Arcade, Near Medanta Hospital, Vijay Nagar, Indore (M.P.) 452010" },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Call Us",      value: "+91 7049290123 | +91 7000980717 | 0731-4006112" },
  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email Us",     value: "hr@infoviaan.com" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Working Hours", value: "Mon - Sat: 9:00 AM - 8:00 PM" },
];

const FIELD = "w-full px-4 py-2.5 text-sm text-gray-800 border border-gray-200 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600] transition-all duration-200";

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const [form,      setForm]      = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          variants={FADE_UP}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Book a free demo class or speak with our career advisors. We'll help you choose the right program and get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Info cards */}
          <motion.div
            className="space-y-4"
            variants={FADE_UP}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
          >
            {INFO_CARDS.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-red-50 text-[#E10600] rounded-xl shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-1">{item.label}</p>
                  <p className="text-sm text-gray-700 font-medium whitespace-pre-line leading-relaxed">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { label: "Instagram", url: "https://www.instagram.com/infoviaantechno/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/infoviaan-technologies-564aaa179/", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { label: "X", url:"https://x.com/infoviaan", path: "M18.244 2H21.5l-7.19 8.21L22 22h-6.828l-5.348-7.006L3.5 22H.244l7.7-8.793L0 2h6.996l4.84 6.42L18.244 2zM16.8 20h1.89L7.08 4H5.09L16.8 20z" },
              ].map((s) => (
                <a key={s.label} href={s.url} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#E10600] hover:text-[#E10600] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            variants={FADE_UP}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.18 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-500 text-sm max-w-xs">We've received your enquiry. Our team will reach out within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", course: "", message: "" }); }}
                  className="mt-6 text-sm text-[#E10600] font-semibold hover:underline"
                >
                  Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Book a Free Demo</h3>
                  <p className="text-sm text-gray-400">Fill in the details and we'll get back to you shortly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide">Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your full name" required className={FIELD} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide">Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 9876543210" required className={FIELD} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide">Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@email.com" required className={FIELD} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide">Interested Course</label>
                  <select name="course" value={form.course} onChange={onChange} required className={FIELD}>
                    <option value="" disabled>Select a course</option>
                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide">Message (Optional)</label>
                  <textarea name="message" value={form.message} onChange={onChange} placeholder="Any specific questions or preferences..." rows={3} className={`${FIELD} resize-none`} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-70 hover:brightness-110"
                  style={{ background: "linear-gradient(135deg,#E10600,#b80500)", boxShadow: "0 6px 20px rgba(225,6,0,0.3)" }}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book Free Demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}