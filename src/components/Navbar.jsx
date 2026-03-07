import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

// ─── Smooth scroll helper ─────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: "smooth" });
}

// ─── Static data ──────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",               id: "home"      },
  { label: "About Us",           id: "about"     },
  { label: "Courses",            id: "courses"   },
  { label: "Placement & Career", id: "placement" },
  { label: "Feedback",           id: "reviews"   },
  { label: "Contact",            id: "contact"   },
];

// ─── Animation variants (outside component — never re-created) ────
const MENU_VARIANTS = {
  hidden: { opacity: 0, y: -8, scaleY: 0.97, transformOrigin: "top" },
  visible: {
    opacity: 1, y: 0, scaleY: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, y: -6, scaleY: 0.97,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const OVERLAY_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2  } },
};

const ITEM_VARIANTS = {
  hidden:  { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.045, duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Desktop link item ────────────────────────────────────────────
const DesktopLink = memo(function DesktopLink({ label, id, active, onClick }) {
  return (
    <li className="relative">
      <button
        onClick={() => onClick(id)}
        className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-1 inline-block
          ${active ? "text-[#E10600]" : "text-gray-600 hover:text-[#E10600]"}
        `}
        style={{ background: "none", border: "none", cursor: "pointer", transform: "translateY(0)" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {label}
        {/* Animated underline — active */}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#E10600] rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        {/* Hover underline — inactive */}
        {!active && (
          <span className="absolute -bottom-0.5 left-0 h-[2px] bg-[#E10600] rounded-full w-0 hover:w-full transition-all duration-250 group-hover:w-full" />
        )}
      </button>
    </li>
  );
});

// ─── Mobile link item ─────────────────────────────────────────────
const MobileLink = memo(function MobileLink({ label, id, index, active, onNav }) {
  return (
    <motion.li
      custom={index}
      variants={ITEM_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <button
        onClick={() => onNav(id)}
        className={`flex items-center gap-3 w-full py-3.5 px-3 border-b border-gray-100 text-sm font-medium transition-colors duration-200
           ${active ? "text-[#E10600]" : "text-gray-700 hover:text-[#E10600]"}`}
        style={{ background: "none", border: "none", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}
      >
        <span
          className="w-1 h-5 rounded-full shrink-0 transition-all duration-200"
          style={{ background: active ? "#E10600" : "transparent" }}
        />
        {label}
      </button>
    </motion.li>
  );
});

// ─── Navbar ───────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  // Scroll detection — passive listener for performance
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // Find the last section whose top edge has scrolled past the navbar.
      // This correctly handles tall sections like #about that span multiple sub-sections —
      // the old "closest distance" approach wrongly jumped to the next nav item
      // because #about's top was far above while its content was still in view.
      const OFFSET = 80;
      let current = NAV_LINKS[0].id;
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= OFFSET) current = id;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu  = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  // Scroll to section + close mobile menu
  const handleNav = useCallback((id) => {
    scrollTo(id);
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,1)",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          boxShadow: scrolled
            ? "0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.07)"
            : "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── Logo ── */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-2.5 shrink-0 group"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <motion.img
                src={logo}
                alt="Infoviaan Technologies"
                className="h-10 sm:h-12 w-auto object-contain"
                whileHover={{ scale: 1.40 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              />
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">
                  Infoviaan
                  <span className="text-[#E10600]"> Technologies</span>
                </span>
              </span>
            </button>

            {/* ── Desktop Nav ── */}
            <ul className="hidden lg:flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map(({ label, id }) => (
                <DesktopLink
                  key={id}
                  label={label}
                  id={id}
                  active={activeId === id}
                  onClick={handleNav}
                />
              ))}
            </ul>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => handleNav("contact")}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl tracking-wide transition-all duration-200 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #E10600 0%, #c00500 100%)",
                  boxShadow: "0 4px 14px rgba(225,6,0,0.3), 0 1px 4px rgba(225,6,0,0.2)",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(225,6,0,0.38), 0 2px 6px rgba(225,6,0,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(225,6,0,0.3), 0 1px 4px rgba(225,6,0,0.2)"; }}
              >
                Enroll Now
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] gap-[5px]"
            >
              <span className={`block w-5 h-[1.5px] bg-gray-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-800 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              variants={MENU_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
              style={{ transformOrigin: "top" }}
            >
              <ul className="flex flex-col px-4 pt-2 pb-3">
                {NAV_LINKS.map(({ label, id }, i) => (
                  <MobileLink
                    key={id}
                    label={label}
                    id={id}
                    index={i}
                    active={activeId === id}
                    onNav={handleNav}
                  />
                ))}
              </ul>

              {/* Mobile CTA */}
              <motion.div
                className="px-5 py-4"
                custom={NAV_LINKS.length}
                variants={ITEM_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={() => handleNav("contact")}
                  className="flex items-center justify-center gap-2 w-full py-3 text-white text-sm font-semibold rounded-xl tracking-wide transition-all duration-200 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #E10600 0%, #c00500 100%)",
                    boxShadow: "0 4px 14px rgba(225,6,0,0.28)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Enroll Now
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Backdrop overlay (outside header so it covers full screen) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            variants={OVERLAY_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(2px)", top: "68px" }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}