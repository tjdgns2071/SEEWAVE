import React from "react";

const primaryBtn = {
    padding: "8px 16px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    background: "linear-gradient(135deg, rgba(255,80,80,1), rgba(255,120,120,1))",
    color: "#fff",
};

export default function Pricing() {
    return (
        <section
            style={{
                padding: "40px 40px 32px",
                display: "grid",
                gridTemplateColumns: "1.3fr 1.7fr",
                gap: 28,
                alignItems: "stretch",
            }}
        >
            <div>
                <h2 style={{ fontSize: 24, marginBottom: 8 }}>Simple pricing</h2>
                <p
                    style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.7)",
                        maxWidth: 360,
                    }}
                >
                    One subscription unlocks every course, update and future series.
                </p>
            </div>
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
                    <div
                        style={{
                            fontSize: 12,
                            textTransform: "uppercase",
                            letterSpacing: "0.16em",
                            color: "rgba(255,255,255,0.7)",
                            marginBottom: 6,
                        }}
                    >
                        Creator plan
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 32, fontWeight: 700 }}>$19</span>
                        <span
                            style={{
                                fontSize: 13,
                                color: "rgba(255,255,255,0.6)",
                            }}
                        >
                            / month
                        </span>
                    </div>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            marginTop: 14,
                            fontSize: 13,
                            color: "rgba(255,255,255,0.78)",
                        }}
                    >
                        <li>• Unlimited access to all lessons</li>
                        <li>• New visual series every month</li>
                        <li>• Downloadable practice stems</li>
                    </ul>
                </div>
                <div style={{ marginTop: 18 }}>
                    <button
                        style={{
                            ...primaryBtn,
                            width: "100%",
                            justifyContent: "center",
                            display: "inline-flex",
                            textAlign: "center",
                        }}
                    >
                        Start 7-day free trial
                    </button>
                    <p
                        style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.6)",
                            marginTop: 8,
                        }}
                    >
                        Cancel anytime. Student & educator plans coming soon.
                    </p>
                </div>
            </div>
        </section>
    );
}
