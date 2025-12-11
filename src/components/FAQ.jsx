import React from "react";

function FAQCard({ q, a }) {
    return (
        <div
            style={{
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.08)",
                padding: 14,
                background: "rgba(16,16,24,0.9)",
            }}
        >
            <div
                style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                }}
            >
                {q}
            </div>
            <div
                style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.72)",
                }}
            >
                {a}
            </div>
        </div>
    );
}

export default function FAQ() {
    return (
        <section
            style={{
                padding: "32px 40px 40px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                marginTop: 8,
            }}
        >
            <h2 style={{ fontSize: 20, marginBottom: 14 }}>FAQ</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 16,
                }}
            >
                <FAQCard
                    q="Is SEEWAVE for beginners?"
                    a="Yes. We start from rhythm, notation and intervals before moving into harmony and form."
                />
                <FAQCard
                    q="Do I need to read notation?"
                    a="Basic reading helps, but every lesson is also color and shape-based so you can follow visually."
                />
                <FAQCard
                    q="Can I cancel anytime?"
                    a="Absolutely. Your subscription is month-to-month with no long term contract."
                />
            </div>
        </section>
    );
}
