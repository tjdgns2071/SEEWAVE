import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth, db } from "../firebase";

const CATEGORY_LABELS = {
    "visual-theory": "Visual Theory",
    "rhythm-in-motion": "Rhythm in Motion",
    "harmony-flow": "Harmony Flow",
    "piano-roll-lab": "Piano Roll Lab",
    composition: "Composition",
    "melody-lines": "Melody Lines",
};

export default function StartWatchingPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Checking access...");

    const category = searchParams.get("category");
    const categoryTitle = CATEGORY_LABELS[category] || "SEEWAVE";

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate(`/login?redirect=/start?category=${category || ""}`, {
                    replace: true,
                });
                return;
            }

            if (!category) {
                navigate("/courses", { replace: true });
                return;
            }

            try {
                const ref = doc(db, "subscriptions", user.uid);
                const snap = await getDoc(ref);

                if (!snap.exists()) {
                    navigate("/pricing", { replace: true });
                    return;
                }

                const data = snap.data();

                const active = data.status === "active";
                const allAccess = data.all_access === true || data.planType === "all_access";
                const categoryAccess = data.categories?.includes(category) === true;

                if (!active || (!allAccess && !categoryAccess)) {
                    navigate("/pricing", { replace: true });
                    return;
                }

                setStatus("Access granted");
            } catch (error) {
                console.error("Start watching access error:", error);
                navigate("/pricing", { replace: true });
            }
        });

        return () => unsub();
    }, [navigate, category]);

    return (
        <main
            style={{
                maxWidth: 1120,
                margin: "0 auto",
                padding: "90px 40px 70px",
            }}
        >
            <p
                style={{
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    opacity: 0.6,
                    fontSize: 12,
                }}
            >
                Now watching
            </p>

            <h1 style={{ fontSize: 42, margin: "0 0 14px" }}>
                {categoryTitle}
            </h1>

            <p style={{ opacity: 0.72, marginBottom: 28 }}>{status}</p>

            <section
                style={{
                    borderRadius: 26,
                    padding: 30,
                    minHeight: 360,
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
                }}
            >
                {category === "visual-theory" && (
                    <div
                        style={{
                            borderRadius: 28,
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.02)",
                            marginTop: 24,
                        }}
                    >
                        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                            <iframe
                                src="https://player.vimeo.com/video/1195069911?h=464ac0db85&badge=0&autopause=0&player_id=0&app_id=58479"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title="Visual Theory Lesson"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}