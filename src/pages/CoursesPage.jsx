import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import visualTheoryImg from "../assets/visual-theory.png";
import rhythmImg from "../assets/rhythm-in-motion.png";
import harmonyImg from "../assets/harmony-flow.png";
import pianoImg from "../assets/piano-roll-lab.png";
import compositionImg from "../assets/composition.png";
import melodyImg from "../assets/melody-lines.png";

export default function CoursesPage() {
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState(null);
    const [loadingAccess, setLoadingAccess] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setSubscription(null);
                setLoadingAccess(false);
                return;
            }

            try {
                const ref = doc(db, "subscriptions", user.uid);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    setSubscription(null);
                    setLoadingAccess(false);
                    return;
                }

                setSubscription(snap.data());
                setLoadingAccess(false);
            } catch (error) {
                console.error("Courses access check error:", error);
                setSubscription(null);
                setLoadingAccess(false);
            }
        });

        return () => unsub();
    }, []);

    const hasAccess = (slug) => {
        if (!subscription || subscription.status !== "active") return false;
        if (subscription.all_access === true || subscription.planType === "all_access") return true;
        return subscription.categories?.includes(slug) === true;
    };

    return (
        <>
            <main style={{ maxWidth: 1120, margin: "80px auto 0", padding: "0 40px" }}>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontSize: 38, margin: 0 }}>Courses</h1>
                    <p style={{ opacity: 0.7, marginTop: 10, marginBottom: 0 }}>
                        Pick a category to start learning. If you want everything, go All Access.
                    </p>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                    <button onClick={() => navigate("/pricing")} style={primaryBtn}>
                        All Access
                    </button>
                    <button onClick={() => navigate("/pricing")} style={ghostBtn}>
                        View plans
                    </button>
                </div>

                <h2 style={{ fontSize: 18, margin: "0 0 14px", opacity: 0.9 }}>
                    Browse by Category
                </h2>

                <div className="coursesGrid" style={grid}>
                    {HOME_CATEGORIES.map((c) => {
                        const unlocked = hasAccess(c.slug);

                        return (
                            <button
                                key={c.slug}
                                onClick={() => {
                                    if (loadingAccess) return;
                                    navigate(`/category/${c.slug}`);
                                }}
                                style={cardBtn}
                            >
                                <div style={card}>
                                    <div style={imgWrap}>
                                        <img
                                            src={c.image}
                                            alt={c.title}
                                            style={{
                                                ...img,
                                                filter: unlocked
                                                    ? "contrast(1.05) saturate(0.95)"
                                                    : "contrast(0.85) saturate(0.45) brightness(0.55)",
                                            }}
                                        />
                                    </div>

                                    <div style={overlay} />

                                    {!loadingAccess && !unlocked && (
                                        <div style={lockBadge}>Locked</div>
                                    )}

                                    {!loadingAccess && unlocked && (
                                        <div style={unlockBadge}>Unlocked</div>
                                    )}

                                    <div style={textWrap}>
                                        <div style={titleText}>{c.title}</div>
                                        <div style={descText}>
                                            {unlocked
                                                ? "Ready to start learning."
                                                : "Subscribe to unlock this category."}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </main>

            <style>{`
                @media (max-width: 900px) {
                    .coursesGrid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </>
    );
}

const primaryBtn = {
    padding: "12px 18px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
    color: "#111827",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
};

const ghostBtn = {
    padding: "12px 18px",
    borderRadius: 999,
    border: "1px solid rgba(148,163,184,0.35)",
    background: "rgba(0,0,0,0.35)",
    color: "#f9fafb",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 18,
    paddingBottom: 40,
};

const cardBtn = {
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
};

const card = {
    position: "relative",
    borderRadius: 18,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
    boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
};

const imgWrap = {
    height: 240,
    width: "100%",
    overflow: "hidden",
    background: "rgba(0,0,0,0.25)",
};

const img = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
};

const overlay = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background:
        "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.10) 100%)",
    pointerEvents: "none",
};

const lockBadge = {
    position: "absolute",
    top: 12,
    right: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.65)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "rgba(255,255,255,0.86)",
    fontSize: 12,
    fontWeight: 800,
};

const unlockBadge = {
    position: "absolute",
    top: 12,
    right: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,154,139,0.18)",
    border: "1px solid rgba(255,154,139,0.32)",
    color: "#ffd1ca",
    fontSize: 12,
    fontWeight: 800,
};

const textWrap = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    textAlign: "left",
};

const titleText = {
    fontWeight: 800,
    marginBottom: 6,
    color: "#f9fafb",
    textShadow: "0 2px 14px rgba(0,0,0,0.6)",
};

const descText = {
    fontSize: 12,
    color: "rgba(255,255,255,0.72)",
    textShadow: "0 2px 14px rgba(0,0,0,0.6)",
};

const HOME_CATEGORIES = [
    { title: "Visual Theory", image: visualTheoryImg, slug: "visual-theory" },
    { title: "Rhythm in Motion", image: rhythmImg, slug: "rhythm-in-motion" },
    { title: "Harmony Flow", image: harmonyImg, slug: "harmony-flow" },
    { title: "Piano Roll Lab", image: pianoImg, slug: "piano-roll-lab" },
    { title: "Composition", image: compositionImg, slug: "composition" },
    { title: "Melody Lines", image: melodyImg, slug: "melody-lines" },
];