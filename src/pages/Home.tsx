import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "../data/projects";

/* ─── Intersection observer hook for scroll-reveal ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  const items = [
    "BRAND DEVELOPMENT", "✦", "MARKETING", "✦", "GRAPHIC DESIGN", "✦",
    "STRATEGY", "✦", "TECHNOLOGY", "✦", "COMMERCIAL THINKING", "✦",
    "BRAND DEVELOPMENT", "✦", "MARKETING", "✦", "GRAPHIC DESIGN", "✦",
    "STRATEGY", "✦", "TECHNOLOGY", "✦", "COMMERCIAL THINKING", "✦",
  ];
  return (
    <div
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,.11)",
        borderBottom: "1px solid rgba(255,255,255,.11)",
        padding: "18px 0",
        overflow: "hidden",
        background: "#050505",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 40,
          whiteSpace: "nowrap",
          animation: "marquee 22s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              font: "700 10px 'Space Mono'",
              color: item === "✦" ? "#aaa" : "#777",
              letterSpacing: item === "✦" ? 0 : ".14em",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Project card ─── */
function ProjectCard({ project, index }: { project: typeof caseStudies[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/project/${project.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        minHeight: 360,
        padding: 25,
        border: `1px solid ${hovered ? "#555" : "#202020"}`,
        borderRadius: 17,
        overflow: "hidden",
        background: `linear-gradient(145deg, ${project.color}, #090909)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        transition: "transform .35s ease, border-color .35s ease, box-shadow .35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,.5)" : "none",
        textDecoration: "none",
        color: "#f5f5f3",
      }}
    >
      {/* Ambient gradient */}
      <div
        style={{
          position: "absolute",
          inset: "-30%",
          background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,.08), transparent 27%)",
          opacity: hovered ? 0.9 : 0.5,
          transition: "opacity .35s",
        }}
      />

      {/* Background image */}
      {project.image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: hovered ? 0.18 : 0.1,
            transition: "opacity .35s",
          }}
        />
      )}

      <span
        style={{
          position: "absolute",
          top: 22,
          left: 24,
          font: "400 9px 'Space Mono'",
          color: "#555",
          zIndex: 2,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        style={{
          position: "absolute",
          top: 22,
          right: 24,
          font: "400 9px 'Space Mono'",
          color: "#555",
          zIndex: 2,
        }}
      >
        {project.year}
      </span>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            font: "700 8px 'Space Mono'",
            color: "#8a8a87",
            textTransform: "uppercase",
            letterSpacing: ".1em",
            marginBottom: 8,
          }}
        >
          {project.type}
        </div>
        <h3
          style={{
            font: "500 29px/.98 'Space Grotesk'",
            letterSpacing: "-.045em",
            marginBottom: 9,
          }}
        >
          {project.title}
        </h3>
        <p style={{ fontSize: 11, lineHeight: 1.6, color: "#777", maxWidth: "38ch" }}>
          {project.description}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          right: 23,
          bottom: 23,
          width: 31,
          height: 31,
          border: `1px solid ${hovered ? "#888" : "#383838"}`,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          font: "13px 'Space Mono'",
          color: hovered ? "#fff" : "#bbb",
          transition: "all .25s",
          zIndex: 2,
        }}
      >
        ↗
      </div>
    </Link>
  );
}

/* ─── Home page ─── */
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        id="top"
        style={{
          minHeight: "100svh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: "130px 0 70px",
        }}
      >
        {/* Perspective rings */}
        {["-28%", "auto"].map((left, i) => (
          <div
            key={i}
            style={{
              content: "",
              position: "absolute",
              bottom: "-5%",
              width: "58vw",
              height: "58vh",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.08)",
              transform: "perspective(500px) rotateX(62deg) scaleY(.48)",
              opacity: 0.75,
              left: i === 0 ? left : "auto",
              right: i === 1 ? left : "auto",
              boxShadow:
                "0 0 0 10px rgba(255,255,255,.015), 0 0 0 25px rgba(255,255,255,.012), 0 0 0 45px rgba(255,255,255,.01)",
            }}
          />
        ))}

        <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Kicker badge */}
          <div
            style={{
              display: "inline-flex",
              gap: 9,
              alignItems: "center",
              marginBottom: 25,
              padding: "7px 11px",
              border: "1px solid #252525",
              borderRadius: 100,
              background: "rgba(255,255,255,.025)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", boxShadow: "0 0 12px #fff", display: "inline-block" }} />
            <span className="eyebrow">Brand · Marketing · Design · Creative Direction</span>
          </div>

          <h1
            style={{
              font: "600 clamp(58px,8.6vw,124px)/.86 'Space Grotesk'",
              maxWidth: 950,
              letterSpacing: "-.075em",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity .7s ease 0.1s, transform .7s ease 0.1s",
            }}
          >
            I build brands people{" "}
            <em
              style={{
                fontStyle: "normal",
                background: "linear-gradient(180deg,#fff 20%,#555)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              remember.
            </em>
          </h1>

          <div
            style={{
              marginTop: 28,
              maxWidth: 650,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity .7s ease 0.2s, transform .7s ease 0.2s",
            }}
          >
            <div style={{ font: "400 clamp(18px,2vw,25px)/1.2 'Space Grotesk'", color: "#ddd", letterSpacing: "-.035em" }}>
              Creative, commercial and technical — connected.
            </div>
            <p style={{ margin: "14px auto 0", color: "#777", fontSize: 12, maxWidth: "52ch" }}>
              I turn ideas, services and complex businesses into clear identities, stories and experiences that feel intentional.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 26,
              flexWrap: "wrap",
              justifyContent: "center",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity .7s ease 0.3s, transform .7s ease 0.3s",
            }}
          >
            <a
              href="#work"
              style={{
                display: "inline-flex",
                padding: "11px 18px",
                borderRadius: 100,
                background: "#fff",
                color: "#050505",
                font: "700 10px 'Space Mono'",
                boxShadow: "0 0 30px rgba(255,255,255,.2)",
                transition: "transform .25s, box-shadow .25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 45px rgba(255,255,255,.35)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(255,255,255,.2)";
              }}
            >
              Enter the work ↗
            </a>
            <Link
              to="/projects"
              style={{
                display: "inline-flex",
                padding: "11px 18px",
                borderRadius: 100,
                border: "1px solid #333",
                background: "transparent",
                color: "#999",
                font: "700 10px 'Space Mono'",
                transition: "all .25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#666";
                el.style.color = "#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#333";
                el.style.color = "#999";
              }}
            >
              View all projects →
            </Link>
          </div>

          {/* Star core */}
          <div
            style={{
              width: 74,
              height: 74,
              marginTop: 28,
              border: "1px solid #444",
              borderRadius: 19,
              background: "linear-gradient(#222,#0b0b0b)",
              display: "grid",
              placeItems: "center",
              animation: "pulse-glow 3s ease-in-out infinite",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity .7s ease 0.5s",
            }}
          >
            <span style={{ fontSize: 24, color: "#fff", textShadow: "0 0 15px #fff" }}>✦</span>
          </div>
        </div>

        {/* Hero footer */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: 24,
            right: 24,
            display: "flex",
            justifyContent: "space-between",
            color: "#555",
            font: "9px 'Space Mono'",
            zIndex: 3,
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1s ease 0.8s",
          }}
        >
          <span>PRETORIA · SOUTH AFRICA</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <Marquee />

      {/* ── INTRO ── */}
      <section style={{ background: "var(--bg)", padding: "120px 0", textAlign: "center" }}>
        <div className="wrap">
          <RevealSection>
            <span className="section-badge">The idea</span>
            <h2
              style={{
                font: "500 clamp(38px,5.5vw,76px)/.95 'Space Grotesk'",
                letterSpacing: "-.06em",
                maxWidth: 850,
                margin: "20px auto 15px",
              }}
            >
              I don't sit neatly in one box.{" "}
              <em style={{ fontStyle: "normal", color: "#777" }}>That's the point.</em>
            </h2>
            <p style={{ fontSize: 12, color: "#666", maxWidth: "58ch", margin: "auto" }}>
              My strength is connecting creative thinking with business reality — and understanding enough of the technical world to make complex things human.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" style={{ background: "var(--bg)", padding: "120px 0" }}>
        <div className="wrap">
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="section-badge">Selected work</span>
              <h2 style={{ font: "500 clamp(38px,5vw,68px)/.9 'Space Grotesk'", letterSpacing: "-.06em", marginTop: 16 }}>
                Things I've built.
              </h2>
              <p style={{ fontSize: 11, color: "#666", maxWidth: "55ch", margin: "14px auto 0" }}>
                Brand systems, marketing, design and communication across technology, education, investment and B2B environments.
              </p>
            </div>
          </RevealSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
            className="projects-grid"
          >
            {caseStudies.map((project, i) => (
              <RevealSection key={project.id} delay={i * 80}>
                <ProjectCard project={project} index={i} />
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Link
                to="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 18px",
                  border: "1px solid #333",
                  borderRadius: 100,
                  font: "700 10px 'Space Mono'",
                  color: "#999",
                  transition: "all .25s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#666";
                  el.style.color = "#fff";
                  el.style.background = "rgba(255,255,255,.05)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#333";
                  el.style.color = "#999";
                  el.style.background = "transparent";
                }}
              >
                See all creative projects →
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="capabilities" style={{ background: "var(--bg)", padding: "70px 0 120px" }}>
        <div className="wrap">
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="section-badge">What I bring</span>
              <h2 style={{ font: "500 clamp(38px,5vw,68px)/.9 'Space Grotesk'", letterSpacing: "-.06em", marginTop: 16 }}>
                More than one discipline.
              </h2>
              <p style={{ fontSize: 11, color: "#666", maxWidth: "55ch", margin: "14px auto 0" }}>
                The overlap is where I do my best work.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="cap-grid">
            {[
              { n: "01", title: "Brand development", body: "Positioning, identity systems, visual language, tone of voice, guidelines and the practical assets that make a brand consistent." },
              { n: "02", title: "Marketing & communication", body: "B2B messaging, campaigns, social content, proposals, pitch decks, executive communication and sales enablement." },
              { n: "03", title: "Technical-to-business translation", body: "Making cybersecurity, MSP/MSSP, GRC, SOCaaS and technical services understandable without stripping away their substance." },
              { n: "04", title: "Creative production", body: "Graphic design, presentation design, digital assets, content production, Figma-based interface thinking and website QA." },
              { n: "05", title: "Commercial thinking", body: "Lead-generation support, proposals, stakeholder engagement, market research and the operational discipline behind a functioning marketing system." },
            ].map((cap, i) => (
              <RevealSection key={cap.n} delay={i * 80}>
                <CapCard {...cap} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: "var(--bg)", padding: "70px 0 120px" }}>
        <div className="wrap">
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="section-badge">How I work</span>
              <h2 style={{ font: "500 clamp(38px,5vw,68px)/.9 'Space Grotesk'", letterSpacing: "-.06em", marginTop: 16 }}>
                Think. Make. Refine.
              </h2>
              <p style={{ fontSize: 11, color: "#666", maxWidth: "55ch", margin: "14px auto 0" }}>
                No rigid formula. The work follows the problem.
              </p>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }} className="steps-grid">
            {[
              { num: "01 / UNDERSTAND", title: "Get inside it.", body: "Understand the business, audience, product, people and constraints before trying to make anything look good." },
              { num: "02 / FIND", title: "Find the signal.", body: "Strip away noise. Find the idea, position or story that gives the work a reason to exist." },
              { num: "03 / BUILD", title: "Make the system.", body: "Turn the thinking into identity, messaging, content and usable assets — not just a pretty concept." },
              { num: "04 / REFINE", title: "Keep it honest.", body: "Test the work against the real business. Improve it. Remove what does not earn its place." },
            ].map((step, i) => (
              <RevealSection key={step.num} delay={i * 100}>
                <StepCard {...step} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: "#080808", borderTop: "1px solid #161616", borderBottom: "1px solid #161616", padding: "120px 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: ".5fr 1.5fr", gap: 80 }} className="about-grid">
            <RevealSection>
              <span className="section-badge">About Pontsho</span>
            </RevealSection>
            <RevealSection delay={150}>
              <div>
                <p
                  style={{
                    font: "500 clamp(34px,4.8vw,64px)/.98 'Space Grotesk'",
                    letterSpacing: "-.06em",
                    maxWidth: "17ch",
                  }}
                >
                  I sit between{" "}
                  <strong style={{ color: "#777", fontWeight: 500 }}>creative work</strong>,
                  business and technical environments — and I use that overlap as the advantage.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 35,
                    marginTop: 38,
                  }}
                  className="about-detail"
                >
                  {[
                    { label: "Today", body: "Brand Development & Marketing Consultant at Bison Tech & Bison Tech College. Sole non-technical commercial function within a cybersecurity, GRC, MSP/MSSP, software development and technical training environment." },
                    { label: "Before that", body: "Data administration and sales support at MyNet Holdings, where I was recognised as a top-performing administrator for nine consecutive months. Earlier work included sales administration, property marketing and brand support." },
                    { label: "Technical depth", body: "ISO 9001 QMS certification, Cisco Introduction to Cybersecurity, Fortinet NSE 1 and NSE 2, with practical exposure to ISO documentation, GRC environments and technical business systems." },
                    { label: "Creative toolkit", body: "Canva, Affinity Designer, Adobe Photoshop, Figma, CapCut, Microsoft Office, Google Workspace, Zoho CRM — plus foundations in HTML/CSS, JavaScript, Python and SQL." },
                  ].map(item => (
                    <div key={item.label}>
                      <b style={{ display: "block", color: "#ddd", font: "700 9px 'Space Mono'", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
                        {item.label}
                      </b>
                      <p style={{ fontSize: 11, lineHeight: 1.75, color: "#686865" }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: "var(--bg)", padding: "150px 0 35px", textAlign: "center" }}>
        <div className="wrap">
          <RevealSection>
            <span className="section-badge">Contact</span>
            <h2
              style={{
                font: "500 clamp(52px,8vw,112px)/.82 'Space Grotesk'",
                letterSpacing: "-.075em",
                maxWidth: 900,
                margin: "20px auto",
              }}
            >
              Let's make something{" "}
              <em style={{ fontStyle: "normal", color: "#666" }}>that matters.</em>
            </h2>
            <p style={{ fontSize: 11, color: "#666", maxWidth: "45ch", margin: "auto" }}>
              Open to brand development, marketing, design, creative direction and the right technology-focused opportunities.
            </p>
            <a
              href="mailto:pontsho.witty.9@gmail.com"
              style={{
                display: "inline-flex",
                marginTop: 22,
                padding: "12px 17px",
                border: "1px solid #444",
                borderRadius: 100,
                font: "700 9px 'Space Mono'",
                transition: "all .25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#fff";
                el.style.color = "#000";
                el.style.borderColor = "#fff";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "#f5f5f3";
                el.style.borderColor = "#444";
              }}
            >
              pontsho.witty.9@gmail.com ↗
            </a>
          </RevealSection>

          <footer
            style={{
              marginTop: 100,
              paddingTop: 18,
              borderTop: "1px solid #202020",
              display: "flex",
              justifyContent: "space-between",
              color: "#555",
              font: "9px 'Space Mono'",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span>© 2026 Pontsho Mosehlane</span>
            <span>Pretoria, South Africa</span>
            <a href="#top" style={{ transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "#555")}>Back to top ↑</a>
          </footer>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: 1fr 1fr !important; }
          .cap-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 35px !important; }
          .about-detail { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .cap-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .about-detail { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function CapCard({ n, title, body }: { n: string; title: string; body: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        minHeight: 250,
        border: `1px solid ${hov ? "#333" : "#202020"}`,
        borderRadius: 16,
        background: "linear-gradient(145deg,#111,#090909)",
        padding: 23,
        position: "relative",
        overflow: "hidden",
        transition: "border-color .3s",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 170,
          height: 170,
          right: -60,
          top: -60,
          border: "1px solid #252525",
          borderRadius: "50%",
          boxShadow: "0 0 0 25px rgba(255,255,255,.012), 0 0 0 50px rgba(255,255,255,.008)",
          transition: "border-color .3s",
          borderColor: hov ? "#303030" : "#252525",
        }}
      />
      <span style={{ font: "9px 'Space Mono'", color: "#555" }}>{n}</span>
      <h3 style={{ font: "500 24px 'Space Grotesk'", letterSpacing: "-.04em", marginTop: 80 }}>{title}</h3>
      <p style={{ fontSize: 11, color: "#666", lineHeight: 1.65, marginTop: 9, maxWidth: "38ch" }}>{body}</p>
    </div>
  );
}

function StepCard({ num, title, body }: { num: string; title: string; body: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        minHeight: 260,
        border: `1px solid ${hov ? "#333" : "#202020"}`,
        borderRadius: 16,
        padding: 22,
        background: "#0a0a0a",
        position: "relative",
        transition: "border-color .3s",
      }}
    >
      <span style={{ font: "9px 'Space Mono'", color: "#777" }}>{num}</span>
      <h3 style={{ font: "500 25px/1 'Space Grotesk'", letterSpacing: "-.04em", marginTop: 90 }}>{title}</h3>
      <p style={{ fontSize: 11, color: "#666", lineHeight: 1.65, marginTop: 10 }}>{body}</p>
    </div>
  );
}
