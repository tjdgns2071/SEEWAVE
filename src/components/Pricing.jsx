import React from "react";

export default function Pricing() {
    const isMobile = window.innerWidth < 768;

    return (
        <section
            style={{
                padding: "40px 20px",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1.7fr",
                gap: 24,
            }}
        >
            {/* 🔹 플랜 카드 */}
            <div
                style={{
                    order: isMobile ? 1 : 2,
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
                    <div
                        style={{
                            fontSize: 12,
                            letterSpacing: "0.16em",
                            opacity: 0.7,
                            marginBottom: 6,
                        }}
                    >
                        CREATOR PLAN
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 32, fontWeight: 700 }}>$19</span>
                        <span style={{ fontSize: 13, opacity: 0.6 }}>/ month</span>
                    </div>

                    <ul style={{ marginTop: 14, fontSize: 13, opacity: 0.8 }}>
                        <li>Unlimited access to all lessons</li>
                        <li>New visual series every month</li>
                        <li>Downloadable practice stems</li>
                    </ul>
                </div>

                <button
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
                    Start 7-day free trial
                </button>
            </div>

            {/* 🔹 설명 */}
            <div style={{ order: isMobile ? 2 : 1 }}>
                <h2 style={{ fontSize: 24, marginBottom: 8 }}>Simple pricing</h2>
                <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 360 }}>
                    One subscription unlocks every course, update and future series.
                </p>
            </div>
        </section>
    );
}
