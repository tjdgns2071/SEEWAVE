import React from "react";
import { createCheckoutSession } from "../firebase";

export default function Pricing() {
    const isMobile = window.innerWidth < 768;

    const handleSubscribe = async (lookupKey) => {
        try {
            const result = await createCheckoutSession({ lookupKey });
            window.location.href = result.data.url;
        } catch (err) {
            console.error(err);
            alert("결제 세션 생성 실패");
        }
    };

    return (
        <section
            style={{
                padding: "40px 20px",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 24,
            }}
        >
            {/* 🔹 ALL ACCESS */}
            <div
                style={{
                    borderRadius: 20,
                    padding: 20,
                    background:
                        "radial-gradient(circle at top, #1e1e25, #101018)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <div style={{ fontSize: 12, letterSpacing: "0.16em", opacity: 0.7 }}>
                        ALL ACCESS
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 32, fontWeight: 700 }}>$1</span>
                        <span style={{ fontSize: 13, opacity: 0.6 }}>/ month</span>
                    </div>

                    <ul style={{ marginTop: 14, fontSize: 13, opacity: 0.8 }}>
                        <li>All categories unlocked</li>
                        <li>Future content included</li>
                        <li>Premium visuals</li>
                    </ul>
                </div>

                <button
                    onClick={() =>
                        handleSubscribe("all_access_monthly_test")
                    }
                    style={{
                        marginTop: 18,
                        width: "100%",
                        padding: "10px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
                        color: "#fff",
                        fontWeight: 600,
                    }}
                >
                    Subscribe All Access
                </button>
            </div>

            {/* 🔹 COMPOSITION */}
            <div
                style={{
                    borderRadius: 20,
                    padding: 20,
                    background:
                        "radial-gradient(circle at top, #1b1b22, #0b0b12)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <div style={{ fontSize: 12, letterSpacing: "0.16em", opacity: 0.7 }}>
                        COMPOSITION
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 32, fontWeight: 700 }}>$1</span>
                        <span style={{ fontSize: 13, opacity: 0.6 }}>/ month</span>
                    </div>

                    <ul style={{ marginTop: 14, fontSize: 13, opacity: 0.8 }}>
                        <li>Composition category only</li>
                        <li>Chord & structure lessons</li>
                    </ul>
                </div>

                <button
                    onClick={() =>
                        handleSubscribe("composition_monthly_test")
                    }
                    style={{
                        marginTop: 18,
                        width: "100%",
                        padding: "10px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.25)",
                        background: "transparent",
                        color: "#fff",
                        fontWeight: 600,
                    }}
                >
                    Subscribe Composition
                </button>
            </div>
        </section>
    );
}
