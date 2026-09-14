import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { caseStudies } from "../data/projects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const project = caseStudies.find(p => p.id === id);
  const index = caseStudies.findIndex(p => p.id === id);
  const next = caseStudies[(index + 1) % caseStudies.length];

  useEffect(() => {
    if (!project) { navigate("/"); return; }
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [project, navigate]);

  if (!project) return null;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          minHeight: "65vh",
          display: "flex",
          alignItems: "flex-end",
          padding: "130px 0 60px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: project.image ? `url(${project.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, rgba(5,5,5,.3) 0%, rgba(5,5,5,.95) 100%)`,
          }}
        />
        {/* Tonal wash from project color */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 50%, ${project.color}99, transparent 60%)`,
          }}
        />

        <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 32,
                flexWrap: "wrap",
              }}
            >
              <span style={{ font: "700 8px 'Space Mono'", color: "#555", textTransform: "uppercase", letterSpacing: ".16em" }}>
                {project.no}
              </span>
              <span style={{ width: 1, height: 12, background: "#333" }} />
              <span className="section-badge">{project.type}</span>
              <span style={{ font: "700 8px 'Space Mono'", color: "#555", marginLeft: "auto" }}>{project.year}</span>
            </div>

            <h1
              style={{
                font: "500 clamp(42px,6vw,88px)/.88 'Space Grotesk'",
                letterSpacing: "-.065em",
                maxWidth: "16ch",
                marginBottom: 24,
              }}
            >
              {project.title}
            </h1>

            <p style={{ fontSize: 14, color: "#888", maxWidth: "52ch", lineHeight: 1.7 }}>
              {project.longDescription}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 28 }}>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #292929",
                    borderRadius: 100,
                    font: "700 8px 'Space Mono'",
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content body */}
      <div className="wrap" style={{ padding: "80px 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 60,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity .7s ease 0.2s, transform .7s ease 0.2s",
          }}
          className="detail-grid"
        >
          {/* Mock project image/visual */}
          <div>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: 16,
                border: "1px solid #202020",
                overflow: "hidden",
                marginBottom: 16,
                background: project.color,
                position: "relative",
              }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .65 }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,.05), transparent 60%)",
                }}
              >
                <span style={{ font: "500 20px 'Space Grotesk'", color: "rgba(255,255,255,.3)", letterSpacing: "-.04em" }}>
                  {project.title}
                </span>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "#555", font: "9px 'Space Mono'" }}>Project visual — {project.year}</p>
          </div>

          {/* Sidebar */}
          <div>
            <InfoRow label="Client / Project" value={project.title} />
            <InfoRow label="Year" value={project.year} />
            <InfoRow label="Category" value={project.type} />
            <InfoRow label="Services" value={project.tags.join(", ")} />
            <InfoRow label="Location" value="Pretoria, South Africa" />

            <div style={{ marginTop: 32 }}>
              <a
                href="mailto:pontsho.witty.9@gmail.com"
                style={{
                  display: "inline-flex",
                  width: "100%",
                  justifyContent: "center",
                  padding: "12px 16px",
                  borderRadius: 100,
                  background: "#fff",
                  color: "#050505",
                  font: "700 9px 'Space Mono'",
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = ".85")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                Discuss a similar project ↗
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #1a1a1a", margin: "80px 0 60px" }} />

        {/* Next project */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity .7s ease 0.4s",
          }}
        >
          <p style={{ font: "700 9px 'Space Mono'", color: "#555", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 24 }}>Next project</p>
          <Link
            to={`/project/${next.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "28px 32px",
              border: "1px solid #202020",
              borderRadius: 16,
              background: "linear-gradient(145deg, #111, #090909)",
              transition: "border-color .3s, transform .3s",
              color: "#f5f5f3",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#444";
              el.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#202020";
              el.style.transform = "translateY(0)";
            }}
          >
            <div>
              <div style={{ font: "700 8px 'Space Mono'", color: "#666", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>{next.type}</div>
              <h3 style={{ font: "500 28px 'Space Grotesk'", letterSpacing: "-.04em" }}>{next.title}</h3>
            </div>
            <span style={{ font: "18px 'Space Mono'", color: "#bbb" }}>↗</span>
          </Link>
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link
            to="/#work"
            style={{
              font: "700 9px 'Space Mono'",
              color: "#555",
              textTransform: "uppercase",
              letterSpacing: ".12em",
              transition: "color .2s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#555")}
          >
            ← Back to all work
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: "14px 0", borderBottom: "1px solid #1a1a1a" }}>
      <div style={{ font: "700 8px 'Space Mono'", color: "#555", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 12, color: "#aaa" }}>{value}</div>
    </div>
  );
}
