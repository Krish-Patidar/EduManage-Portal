import { useEffect, useRef, useState, memo } from "react";
import { useInView } from "framer-motion";

const Counter = memo(function Counter({ target, suffix = "", duration = 1800, className = "" }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    let raf;
    const start = performance.now();
    const ease  = (t) => 1 - Math.pow(1 - t, 3);
    const tick  = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(ease(t) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return <span ref={ref} className={className}>{count.toLocaleString()}{suffix}</span>;
});

export default Counter;