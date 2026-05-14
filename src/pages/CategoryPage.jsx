import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../categories";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

import visualTheoryImg from "../assets/visual-theory.png";
import rhythmImg from "../assets/rhythm-in-motion.png";
import harmonyImg from "../assets/harmony-flow.png";
import pianoImg from "../assets/piano-roll-lab.png";
import compositionImg from "../assets/composition.png";
import melodyImg from "../assets/melody-lines.png";

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
    const [canAccess, setCanAccess] = useState(null);

    const cat = categories.find((c) => c.slug === slug);
    const heroImg = imageBySlug[slug];

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setCanAccess(false);
                return;
            }

            try {
                const ref = doc(db, "subscriptions", user.uid);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    setCanAccess(false);
                    return;
                }

                const data = snap.data();

                if (data.status !== "active") {
                    setCanAccess(false);
                    return;
                }

                if (data.all_access === true || data.planType === "all_access") {
                    setCanAccess(true);
                    return;
                }

                setCanAccess(data.categories?.includes(slug) === true);
            } catch (error) {
                console.error("Access check error:", error);
                setCanAccess(false);
            }
        });

        return () => unsub();
    }, [slug]);

    return (
        <>
            <main
                style={{
                    maxWidth: 1320,
                    margin: "0 auto",
                    padding: "64px 40px 70px",
                }}
            >
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
                    <div>Category not found</div>
                ) : (
                    <>
                        <h1 style={{ fontSize: 42, margin: "0 0 22px" }}>
                            {cat.title}
                        </h1>

                        <div className="categoryDetailGrid" style={detailGrid}>
                            <img
                                src={heroImg}
                                alt={cat.title}
                                style={heroImage}
                            />

                            <aside style={sideCard}>
                                <div>
                                    <div style={eyebrow}>
                                        {canAccess ? "Unlocked" : "Category subscription"}
                                    </div>

                                    <h2 style={sideTitle}>
                                        {canAccess
                                            ? "Ready to watch"
                                            : "Unlock this track"}
                                    </h2>

                                    <p style={sideText}>
                                        {canAccess
                                            ? "Your subscription is active. Start learning this category now."
                                            : "Subscribe to access all lessons and future updates in this category."}
                                    </p>
                                </div>

                                <div style={priceBox}>
                                    <div style={price}>
                                        {canAccess ? "Active" : "$9"}
                                    </div>
                                    {!canAccess && (
                                        <div style={priceSub}>/ month</div>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        if (canAccess === null) return;

                                        if (!canAccess) {
                                            navigate("/pricing");
                                            return;
                                        }

                                        alert("Lesson player will be connected next.");
                                    }}
                                    style={mainButton}
                                >
                                    {canAccess === null
                                        ? "Checking access..."
                                        : canAccess
                                            ? "Start learning"
                                            : "Subscribe"}
                                </button>

                                <div style={metaList}>
                                    <span>✓ Visual lessons</span>
                                    <span>✓ Category updates</span>
                                    <span>✓ Progress saved</span>
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </main>

            <style>{`
                @media (max-width: 900px) {
                    .categoryDetailGrid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </>
    );
}

const detailGrid = {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.55fr) minmax(280px, 0.75fr)",
    gap: 26,
    alignItems: "stretch",
};

const heroImage = {
    width: "100%",
    aspectRatio: "16 / 9",
    objectFit: "cover",
    borderRadius: 22,
    display: "block",
    boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
};

const sideCard = {
    borderRadius: 24,
    padding: "18px 24px",

    background:
        "linear-gradient(135deg, rgba(255,120,135,0.07), rgba(12,12,20,0.96))",

    border: "1px solid rgba(255,154,139,0.14)",

    boxShadow: "0 18px 50px rgba(0,0,0,0.45)",

    display: "flex",
    flexDirection: "column",

    gap: 14,

    height: "fit-content",
};

const eyebrow = {
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.62)",
    marginBottom: 10,
};

const sideTitle = {
    fontSize: 24,
    lineHeight: 1,
    margin: 0,
};

const sideText = {
    marginTop: 8,
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.35,
    color: "rgba(255,255,255,0.72)",
};

const priceBox = {
    display: "flex",
    alignItems: "flex-end",
    gap: 6,
};

const price = {
    fontSize: 28,
    fontWeight: 900,
    lineHeight: 1,
};

const priceSub = {
    fontSize: 14,
    color: "rgba(255,255,255,0.62)",
    paddingBottom: 4,
};

const mainButton = {
    width: "100%",
    padding: "11px 18px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
    color: "#111827",
    fontWeight: 900,
    cursor: "pointer",
};

const metaList = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    fontSize: 13,
    color: "rgba(255,255,255,0.72)",
};