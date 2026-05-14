// src/pages/FaqPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaqPage() {
    const navigate = useNavigate();
    const [openIdx, setOpenIdx] = useState(0);

    const items = useMemo(
        () => [
            {
                q: "What is SEEWAVE?",
                a: "SEEWAVE is a visual-first music theory platform. We teach harmony, rhythm, and notation using motion graphics so you can learn with your eyes as much as your ears.",
            },
            {
                q: "Category subscription vs All Access: what’s the difference?",
                a: "A category subscription unlocks one track (e.g., Harmony Flow). All Access unlocks every category plus future updates.",
            },
            {
                q: "How do payments work?",
                a: "We’re using Stripe as the baseline. The plan is: Checkout → Webhook → Firestore subscription state → UI access control.",
            },
            {
                q: "If I subscribe to multiple categories, what happens?",
                a: "You can. Later we’ll unify billing logic (combined total or recommend upgrading to All Access when it makes sense).",
            },
            {
                q: "Do I need to log in to watch lessons?",
                a: "Some previews can be public. For saved progress and subscribed content, login is required.",
            },
            {
                q: "What’s your refund policy?",
                a: "We’ll publish a clear refund policy once billing is fully live. Until then, we keep the UX honest and avoid confusing paywalls.",
            },
        ],
        []
    );

    const wrap = {
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111118, #020206)",
        color: "#f5f5f5",
        padding: "84px 24px 80px",
    };

    const container = { maxWidth: 980, margin: "0 auto" };

    const kicker = {
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        opacity: 0.6,
        marginBottom: 10,
    };

    const h1 = { fontSize: 54, lineHeight: 1.02, margin: 0, letterSpacing: "-0.02em" };

    const lead = {
        marginTop: 12,
        fontSize: 14,
        lineHeight: 1.6,
        color: "rgba(209,213,219,0.88)",
        maxWidth: 820,
    };

    const card = {
        marginTop: 26,
        borderRadius: 22,
        padding: 18,
        background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.04), transparent 55%), rgba(4,4,10,0.82)",
        border: "1px solid rgba(148,163,184,0.14)",
        boxShadow: "0 24px 70px rgba(0,0,0,0.6)",
    };

    const row = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "14px 14px",
        borderRadius: 16,
        cursor: "pointer",
    };

    const q = { fontSize: 14, fontWeight: 700, margin: 0 };
    const icon = {
        width: 28,
        height: 28,
        borderRadius: 999,
        border: "1px solid rgba(148,163,184,0.18)",
        display: "grid",
        placeItems: "center",
        fontSize: 16,
        opacity: 0.9,
        flexShrink: 0,
    };

    const aWrap = (open) => ({
        maxHeight: open ? 240 : 0,
        transition: "max-height 280ms ease",
        overflow: "hidden",
    });

    const a = {
        padding: "0 14px 14px",
        margin: 0,
        fontSize: 13,
        lineHeight: 1.65,
        color: "rgba(209,213,219,0.88)",
    };

    const footNote = {
        marginTop: 16,
        padding: 14,
        borderRadius: 16,
        background: "rgba(0,0,0,0.28)",
        border: "1px solid rgba(148,163,184,0.14)",
        color: "rgba(209,213,219,0.82)",
        fontSize: 12,
        lineHeight: 1.6,
    };

    const backBtn = {
        marginTop: 18,
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid rgba(148,163,184,0.22)",
        background: "rgba(0,0,0,0.28)",
        color: "#f9fafb",
        cursor: "pointer",
        fontSize: 12,
    };

    return (
        <div style={wrap}>
            <div style={container}>
                <div style={kicker}>FAQ</div>
                <h1 style={h1}>Questions, answered.</h1>
                <div style={lead}>
                    These answers reflect SEEWAVE’s current build direction (Stripe webhook → subscription state → access control).
                </div>

                <div style={card}>
                    {items.map((item, idx) => {
                        const open = idx === openIdx;
                        return (
                            <div key={item.q} style={{ borderRadius: 16, overflow: "hidden" }}>
                                <div
                                    style={{
                                        ...row,
                                        background: open ? "rgba(255,255,255,0.03)" : "transparent",
                                        border: "1px solid rgba(148,163,184,0.10)",
                                        marginBottom: 10,
                                    }}
                                    onClick={() => setOpenIdx(open ? -1 : idx)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <p style={q}>{item.q}</p>
                                    <div style={icon}>{open ? "–" : "+"}</div>
                                </div>

                                <div style={aWrap(open)}>
                                    <p style={a}>{item.a}</p>
                                </div>
                            </div>
                        );
                    })}

                    <div style={footNote}>
                        Rule of thumb: if you ever see a white screen again, it’s usually an <b>import/export mismatch</b>
                        (default export vs named export) or a missing file path. Fix the first red console error, and the UI returns.
                    </div>

                    <button style={backBtn} onClick={() => navigate("/pricing")}>
                        ← Back to Pricing
                    </button>
                </div>
            </div>
        </div>
    );
}
