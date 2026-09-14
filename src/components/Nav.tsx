import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY.current && y > 180);
      if (y < lastY.current) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          inset: "0 0 auto",
          zIndex: 100,
          padding: "22px 0",
          transition: "transform 0.35s ease, background 0.35s ease, border-color 0.35s ease",
          transform: hidden ? "translateY(-110%)" : "translateY(0)",
          background: scrolled ? "rgba(5,5,5,.82)" : "linear-gradient(#050505, transparent)",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,.1)" : "1px solid transparent",
        }}
      >
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            to="/"
            style={{
              font: "700 13px 'Space Grotesk'",
              letterSpacing: "-.02em",
              color: "#f5f5f3",
            }}
          >
            PONTSHO / MOSEHLANE
          </Link>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              gap: 30,
              font: "500 10px 'Space Mono'",
              textTransform: "uppercase",
              color: "#999",
            }}
            className="nav-desktop"
          >
            {isHome ? (
              <>
                <a href="#work" style={{ transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#999")}>Work</a>
                <a href="#capabilities" style={{ transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#999")}>What I Do</a>
                <a href="#about" style={{ transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#999")}>About</a>
              </>
            ) : (
              <Link to="/" style={{ transition: "color .2s", color: "#999" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#999")}>← Home</Link>
            )}
            <Link
              to="/projects"
              style={{
                transition: "color .2s",
                color: location.pathname === "/projects" ? "#fff" : "#999",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = location.pathname === "/projects" ? "#fff" : "#999")}
            >
              Projects
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="mailto:pontsho.witty.9@gmail.com"
              style={{
                font: "700 10px 'Space Mono'",
                padding: "9px 14px",
                border: "1px solid #444",
                borderRadius: 100,
                background: "#111",
                transition: "background .25s, color .25s, border-color .25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#fff";
                el.style.color = "#000";
                el.style.borderColor = "#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#111";
                el.style.color = "#f5f5f3";
                el.style.borderColor = "#444";
              }}
            >
              Let's talk ↗
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-hamburger"
              style={{
                display: "none",
                background: "none",
                border: "1px solid #333",
                borderRadius: 8,
                width: 36,
                height: 36,
                cursor: "pointer",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: 0,
              }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 16,
                    height: 1,
                    background: "#fff",
                    transition: "transform .3s, opacity .3s",
                    transform:
                      menuOpen
                        ? i === 0 ? "translateY(6px) rotate(45deg)" : i === 2 ? "translateY(-6px) rotate(-45deg)" : "scaleX(0)"
                        : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          background: "rgba(5,5,5,.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          transition: "opacity .3s, visibility .3s",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
        }}
      >
        {isHome ? (
          <>
            <a href="#work" onClick={() => setMenuOpen(false)} style={{ font: "500 32px/1 'Space Grotesk'", letterSpacing: "-.04em" }}>Work</a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)} style={{ font: "500 32px/1 'Space Grotesk'", letterSpacing: "-.04em" }}>What I Do</a>
            <a href="#about" onClick={() => setMenuOpen(false)} style={{ font: "500 32px/1 'Space Grotesk'", letterSpacing: "-.04em" }}>About</a>
          </>
        ) : (
          <Link to="/" style={{ font: "500 32px/1 'Space Grotesk'", letterSpacing: "-.04em" }}>Home</Link>
        )}
        <Link to="/projects" style={{ font: "500 32px/1 'Space Grotesk'", letterSpacing: "-.04em" }}>Projects</Link>
        <a href="mailto:pontsho.witty.9@gmail.com" style={{ font: "700 11px 'Space Mono'", padding: "12px 20px", border: "1px solid #444", borderRadius: 100, marginTop: 16 }}>
          pontsho.witty.9@gmail.com ↗
        </a>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
