import { useState, useRef, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import mernImage from "../assets/mern.png";
import javaImage from "../assets/java.png";
import pythonImage from "../assets/python.webp";
import pydaImage from "../assets/pyda.jpeg";
import mlImage from "../assets/ml.jpeg";
import sqlImage from "../assets/sql.jpeg";
import uiuxImage from "../assets/uiux.avif";
import graphicImage from "../assets/graphic.webp";
import digitalMImage from "../assets/digitalM.jpg";

const FILTERS = ["All", "Development", "Data", "Design", "Marketing"];

const COURSES = [
  { id: 1, title: "MERN Stack Development", desc: "Master MongoDB, Express.js, React, and Node.js to build production-ready full-stack web applications.", duration: "4 Months", level: "Intermediate", image: mernImage, price: "₹14,999", cat: "Development" },
  { id: 2, title: "Java Full Stack", desc: "Learn Core Java, Spring Boot, Hibernate, and React to become a job-ready full stack Java developer.", duration: "5 Months", level: "Intermediate", image: javaImage, price: "₹16,999", cat: "Development" },
  { id: 3, title: "Python Programming", desc: "From fundamentals to advanced Python — scripting, OOP, APIs, and automation with practical exercises.",   duration: "2 Months", level: "Beginner", image: pythonImage, price: "₹8,999",  cat: "Development" },
  { id: 4, title: "Data Analytics & Python",  desc: "Master Python, Pandas, NumPy, SQL, Power BI, and ML fundamentals for a data analytics career.", duration: "3 Months", level: "Beginner", image: pydaImage, price: "₹12,999", cat: "Data" },
  { id: 5, title: "Data Science with ML", desc: "Deep dive into machine learning, statistics, data wrangling, and model deployment with real datasets.", duration: "5 Months", level: "Advanced", image: mlImage, price: "₹19,999", cat: "Data" },
  { id: 6, title: "SQL & Database Mgmt", desc: "Master relational databases, complex queries, stored procedures, indexing, and optimization techniques.", duration: "6 Weeks", level: "Beginner", image: sqlImage, price: "₹6,999",  cat: "Data" },
  { id: 7, title: "UI/UX Design", desc: "Learn user-centered design, wireframing, prototyping, and Figma. Build a professional design portfolio.", duration: "3 Months", level: "Beginner", image: uiuxImage, price: "₹11,999", cat: "Design" },
  { id: 8, title: "Graphic Design Essentials", desc: "Master Photoshop, Illustrator, and Canva for brand identity, print, and digital design with projects.", duration: "2 Months", level: "Beginner", image: graphicImage, price: "₹7,999", cat: "Design" },
  { id: 9, title: "Digital Marketing", desc: "SEO, SEM, social media, Google Ads, and analytics to grow brands online with real campaign experience.", duration: "2 Months", level: "Beginner", image: digitalMImage, price: "₹9,999", cat: "Marketing" },
];

const LEVEL_STYLE = {
  Beginner:     "bg-green-50 text-green-600",
  Intermediate: "bg-blue-50 text-blue-600",
  Advanced:     "bg-red-50 text-[#E10600]",
};

const CARD_V = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 } }),
  exit:    { opacity: 0, y: 10, transition: { duration: 0.18 } },
};

function scrollToContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
}

const CourseCard = memo(function CourseCard({ course, index }) {
  return (
    <motion.div
      layout
      custom={index}
      variants={CARD_V}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
    >
      {/* Thumbnail */}
     <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
  {course.image ? (
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
      <svg
        className="w-10 h-10 text-red-200"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    </div>
  )}

  <span
    className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_STYLE[course.level]}`}
  >
    {course.level}
  </span>
</div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#E10600] transition-colors duration-200">{course.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{course.desc}</p>

        <div className="flex items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3 text-[#E10600]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.duration}
          </span>
        </div>

        <div className="h-px bg-gray-100 mb-4" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">Course Fee</p>
            <p className="text-lg font-extrabold text-[#E10600] leading-none">{course.price}</p>
          </div>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-xs font-semibold rounded-lg transition-all duration-200 active:scale-95 hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#E10600,#b80500)", boxShadow: "0 4px 12px rgba(225,6,0,0.25)" }}
          >
            Enroll Now
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default function CoursesSection() {
  const [active, setActive] = useState("All");
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const filtered = active === "All" ? COURSES : COURSES.filter(c => c.cat === active);

  return (
    <section id="courses" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-semibold text-[#E10600] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Industry-Focused Courses
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Carefully crafted programs built around what the industry demands — taught by working professionals with guaranteed placement support.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2.5 mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
        >
          {FILTERS.map((f) => {
            const isActive = active === f;
            const count    = f === "All" ? COURSES.length : COURSES.filter(c => c.cat === f).length;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-[#E10600] text-white border-[#E10600] shadow-md shadow-red-100"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#E10600] hover:text-[#E10600]"
                }`}
              >
                {f}
                {f !== "All" && (
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Count */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            className="text-sm text-gray-400 mb-7 text-center"
          >
            Showing <span className="font-semibold text-gray-700">{filtered.length}</span> {filtered.length === 1 ? "course" : "courses"}
            {active !== "All" && <> in <span className="font-semibold text-[#E10600]">{active}</span></>}
          </motion.p>
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}