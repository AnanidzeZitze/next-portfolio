import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.1) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { 
        setInView(true); 
        obs.unobserve(el); 
      } 
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useMouse() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

export function useScroll() {
  const [y, setY] = useState(0);
  const requestRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(() => {
          setY(window.scrollY);
          requestRef.current = null;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);
  return y;
}
