import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
    const navigate = useNavigate();

    const isMobile = window.innerWidth < 768;

    return (
        <section
            style={{
                padding: "40px 20px",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 24,
            }}
        >
            <div
                style={{
                    borderRadius: 20,
                    padding: 24,
                    background:
                        "radial-gradient(circle at top, #1e1e25, #101018)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    maxWidth: isMobile ? "100%" : 820,
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 12,
                            letterSpacing: "0.16em",
                            opacity: 0.7,
                        }}
                    >
                        ALL ACCESS
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 6,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 40,
                                fontWeight: 700,
                            }}
                        >
                            $19
                        </span>

                        <span
                            style={{
                                fontSize: 14,
                                opacity: 0.6,
                            }}
                        >
                            / month
                        </span>
                    </div>

                    <ul
                        style={{
                            marginTop: 16,
                            fontSize: 14,
                            opacity: 0.82,
                            lineHeight: 1.8,
                        }}
                    >
                        <li>All categories unlocked</li>
                        <li>Future content included</li>
                        <li>Premium visuals</li>
                        <li>Weekly lesson updates</li>
                    </ul>
                </div>

                <button
                    onClick={() => navigate("/pricing")}
                    style={{
                        marginTop: 22,
                        width: "100%",
                        padding: "14px",
                        borderRadius: 999,
                        border: "none",
                        background:
                            "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: "pointer",
                    }}
                >
                    View Pricing Plans
                </button>
            </div>
        </section>
    );
}