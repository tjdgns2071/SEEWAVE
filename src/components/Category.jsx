import React from "react";

export default function CategoryRow({ title, items }) {
    return (
        <section style={{ padding: "16px 40px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    alignItems: "center",
                }}
            >
                <h2 style={{ fontSize: 18 }}>{title}</h2>
                <button
                    className="hover-scale"
                    style={{
                        fontSize: 13,
                        color: "#fff",
                        background: "rgba(255,255,255,0.1)",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontWeight: 500,
                    }}
                >
                    See all courses <span>→</span>
                </button>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: 16,
                    overflowX: "auto",
                    paddingBottom: 4,
                }}
            >
                {items.map((item, i) => (
                    <div
                        className="hover-lift"
                        key={i}
                        style={{
                            minWidth: 220,
                            borderRadius: 16,
                            background: "linear-gradient(145deg, #18181f, #101017)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            padding: 12,
                            cursor: "pointer",
                        }}
                    >
                        <div
                            style={{
                                height: 110,
                                borderRadius: 12,
                                background: `url(${item.image}) center/cover no-repeat`,
                                marginBottom: 10,
                                boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
                            }}
                        />
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                marginBottom: 4,
                            }}
                        >
                            {item.title}
                        </div>
                        <div
                            style={{
                                fontSize: 11,
                                color: "rgba(255,255,255,0.6)",
                            }}
                        >
                            Motion-score breakdowns, no narration overload.
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
