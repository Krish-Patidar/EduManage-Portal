import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const levelColors = {
  Beginner: "bg-green-50 text-green-600",
  Intermediate: "bg-blue-50 text-blue-600",
  Advanced: "bg-red-50 text-[#E10600]",
};

export default function CourseCard({
  title = "Course Title",
  description = "A short description of the course goes here.",
  duration = "3 Months",
  level = "Beginner",
  image = "",
  price = "₹9,999",
  slug = "course-slug",
}) {
  const levelStyle = levelColors[level] || "bg-gray-100 text-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* ── Image ── */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder when no image is provided */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
            <svg
              className="w-12 h-12 text-red-200"
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

        {/* Level badge over image */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${levelStyle}`}
        >
          {level}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#E10600] transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Tags — Duration & Level */}
        <div className="flex items-center gap-2 mb-5">
          {/* Duration tag */}
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3 text-[#E10600]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>

          {/* Level tag */}
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${levelStyle}`}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            {level}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-4 mt-auto" />

        {/* ── Footer: Price + CTA ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 leading-none mb-0.5">Course Fee</p>
            <p className="text-lg font-extrabold text-[#E10600] leading-none">{price}</p>
          </div>

          <Link
            to={`/courses/${slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E10600] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#c00500] active:scale-95 transition-all duration-200"
          >
            View Details
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}