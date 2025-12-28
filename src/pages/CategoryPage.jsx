import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../categories";

import visualTheoryImg from "../assets/visual-theory.png";
import rhythmImg from "../assets/rhythm-in-motion.png";
import harmonyImg from "../assets/harmony-flow.png";
import pianoImg from "../assets/piano-roll-lab.png";
import compositionImg from "../assets/composition.png";
import melodyImg from "../assets/melody-lines.png";

const payCardStyle = {
    borderRadius: 24,
    padding: 22,
    background: "linear-gradient(135deg, rgba(255,90,120,0.18), rgba(12,12,20,0.96))",
    border: "1px solid rgba(255,90,120,0.38)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.45), 0 0 40px rgba(255,90,120,0.10)",
};

const payTopRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
};

const payTitle = { fontSize: 13, opacity: 0.85, marginBottom: 6 };
const payPrice = { fontSize: 28, fontWeight: 700, lineHeight: 1 };
const payDesc = { fontSize: 12, opacity: 0.75, marginTop: 8, marginBottom: 10 };

const payMetaRow = {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 12,
    opacity: 0.85,
};

const payBtn = {
    padding: "10px 14px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(90deg, #ff5a78, #ff7a9c)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
};

const imageBySlug = {
    "visual-theory": visualTheoryImg,
    "rhythm-in-motion": rhythmImg,
    "harmony-flow": harmonyImg,
    "piano-roll-lab": pianoImg,
    composition: compositionImg,
    "melody-lines": melodyImg,
};

export default function CategoryPage() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const cat = categories.find((c) => c.slug === slug);
    const heroImg = imageBySlug[slug];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "radial-gradient(circle at top, #111118, #020206)",
                color: "#f5f5f5",
                fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                padding: "110px 40px 70px",
            }}
        >
            <style>{`
        @keyframes thumbFloat {
          0%   { transform: scale(1.02) translateY(0px); filter: saturate(1.02) contrast(1.02); }
          50%  { transform: scale(1.08) translateY(-5px); filter: saturate(1.12) contrast(1.06); }
          100% { transform: scale(1.02) translateY(0px); filter: saturate(1.02) contrast(1.02); }
        }
        @keyframes pinkGlow {
          0%   { opacity: .18; transform: scale(1); }
          50%  { opacity: .38; transform: scale(1.06); }
          100% { opacity: .18; transform: scale(1); }
        }
        @keyframes grainMove {
          0% { transform: translate3d(0,0,0); opacity: .10; }
          50% { transform: translate3d(-2%, 1%, 0); opacity: .14; }
          100% { transform: translate3d(0,0,0); opacity: .10; }
        }
        @media (max-width: 980px) {
          .catGrid { grid-template-columns: 1fr !important; gap: 18px !important; }
          .padTop  { padding: 96px 16px 60px !important; }
          .leftShift { marginLeft: 0 !important; }
        }
      `}</style>

            <div className="padTop" style={{ maxWidth: 1240, margin: "0 auto" }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "rgba(255,255,255,0.92)",
                        borderRadius: 999,
                        padding: "8px 12px",
                        cursor: "pointer",
                        marginBottom: 18,
                    }}
                >
                    ← Back
                </button>

                {!cat ? (
                    <div style={{ opacity: 0.85 }}>
                        <h1 style={{ fontSize: 32, marginBottom: 10 }}>Category not found</h1>
                        <div style={{ opacity: 0.7 }}>slug: {slug}</div>
                    </div>
                ) : (
                    <div
                        className="catGrid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.22fr 0.78fr",
                            gap: 44, // ✅ 좌우 간격만 벌림 (26 → 44)
                            alignItems: "start",
                        }}
                    >
                        {/* LEFT (✅ 중앙 깨던 marginLeft -36 원복) */}
                        <div className="leftShift" style={{ marginLeft: 0 }}>
                            <div style={{ fontSize: 12, letterSpacing: "0.22em", opacity: 0.7, marginBottom: 10 }}>
                                CATEGORY
                            </div>

                            <h1 style={{ fontSize: 52, margin: "0 0 10px" }}>{cat.title}</h1>
                            <p style={{ opacity: 0.82, marginTop: 0, marginBottom: 18, fontSize: 15 }}>
                                {cat.tagline}
                            </p>

                            <div
                                style={{
                                    position: "relative",
                                    borderRadius: 28,
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: "linear-gradient(180deg, rgba(16,16,24,0.65), rgba(6,6,10,0.90))",
                                    boxShadow: "0 34px 90px rgba(0,0,0,0.60)",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: -2,
                                        borderRadius: 30,
                                        background:
                                            "radial-gradient(900px 340px at 65% 22%, rgba(255,108,128,0.22), transparent 60%), radial-gradient(820px 320px at 30% 92%, rgba(255,154,139,0.16), transparent 58%)",
                                        animation: "pinkGlow 6s ease-in-out infinite",
                                        pointerEvents: "none",
                                        zIndex: 1,
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundImage:
                                            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"160\" height=\"160\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
                                        mixBlendMode: "overlay",
                                        animation: "grainMove 6.5s ease-in-out infinite",
                                        pointerEvents: "none",
                                        zIndex: 2,
                                    }}
                                />

                                <div style={{ width: "100%", aspectRatio: "16 / 8.6", position: "relative", overflow: "hidden" }}>
                                    {heroImg ? (
                                        <img
                                            src={heroImg}
                                            alt={cat.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                transformOrigin: "center",
                                                animation: "thumbFloat 8s ease-in-out infinite",
                                                opacity: 0.95,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                background: "rgba(255,255,255,0.06)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: 0.75,
                                            }}
                                        >
                                            No thumbnail
                                        </div>
                                    )}

                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(90deg, rgba(0,0,0,0.52), rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.40)), linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.58))",
                                            pointerEvents: "none",
                                            zIndex: 3,
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "absolute",
                                            left: 16,
                                            bottom: 14,
                                            zIndex: 4,
                                            fontSize: 12,
                                            padding: "6px 10px",
                                            borderRadius: 999,
                                            border: "1px solid rgba(255,120,150,0.18)",
                                            background: "rgba(0,0,0,0.35)",
                                            backdropFilter: "blur(10px)",
                                            WebkitBackdropFilter: "blur(10px)",
                                            color: "rgba(255,255,255,0.9)",
                                        }}
                                    >
                                        Visual-first track
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                                <button
                                    style={{
                                        padding: "12px 18px",
                                        borderRadius: 999,
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: 13,
                                        fontWeight: 800,
                                        background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
                                        color: "#111827",
                                    }}
                                >
                                    Start this track
                                </button>
                                <button
                                    style={{
                                        padding: "12px 18px",
                                        borderRadius: 999,
                                        border: "1px solid rgba(255,255,255,0.20)",
                                        cursor: "pointer",
                                        fontSize: 13,
                                        background: "rgba(255,255,255,0.06)",
                                        color: "rgba(255,255,255,0.92)",
                                    }}
                                >
                                    View lessons
                                </button>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div>
                            <div
                                style={{
                                    borderRadius: 26,
                                    padding: 18,
                                    background: "linear-gradient(180deg, rgba(20,20,28,0.70), rgba(8,8,12,0.92))",
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    boxShadow: "0 22px 60px rgba(0,0,0,0.50)",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: 26,
                                        boxShadow: "0 0 0 1px rgba(255,120,150,0.14) inset",
                                        pointerEvents: "none",
                                    }}
                                />

                                <div style={{ fontSize: 13, opacity: 0.88, marginBottom: 12 }}>Learning path</div>

                                <div style={{ display: "grid", gap: 10 }}>
                                    {cat.steps.map((s, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: 12,
                                                padding: "12px 14px",
                                                borderRadius: 16,
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                background: "rgba(0,0,0,0.22)",
                                            }}
                                        >
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.92)" }}>{s}</span>
                                            <span
                                                style={{
                                                    fontSize: 11,
                                                    padding: "4px 10px",
                                                    borderRadius: 999,
                                                    border: "1px solid rgba(255,120,150,0.18)",
                                                    background: "rgba(255,120,150,0.08)",
                                                    color: "rgba(255,200,215,0.95)",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                Step {i + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    style={{
                                        marginTop: 14,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 10,
                                        flexWrap: "wrap",
                                        fontSize: 12,
                                        opacity: 0.75,
                                    }}
                                >
                                    <span>Visual exercises · Motion cues</span>
                                    <span>New lessons added over time</span>
                                </div>
                            </div>

                            {/* ✅ Pricing box: 네가 만든 스타일 그대로 사용 */}
                            <div style={{ marginTop: 16, ...payCardStyle }}>
                                <div style={payTopRow}>
                                    <div>
                                        <div style={payTitle}>Unlock this category</div>
                                        <div style={payPrice}>$5</div>
                                        <div style={payDesc}>One-time purchase · Includes all lessons in this track</div>
                                    </div>
                                    <button style={payBtn}>Buy for $5</button>
                                </div>

                                <div style={payMetaRow}>
                                    <span>✓ Visual lessons</span>
                                    <span>✓ Practice prompts</span>
                                    <span>✓ Future updates included</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
