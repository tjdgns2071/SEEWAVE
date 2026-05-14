// src/pages/PaymentCancelPage.jsx
import { useNavigate } from "react-router-dom";

export default function PaymentCancelPage() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "radial-gradient(circle at top, #111118, #020206)",
                color: "#f9fafb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
            }}
        >
            <div
                style={{
                    maxWidth: 520,
                    width: "100%",
                    borderRadius: 24,
                    padding: 32,
                    background: "rgba(4,4,10,0.86)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 24px 70px rgba(0,0,0,0.6)",
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 42, marginBottom: 12 }}>⚠️</div>

                <h1 style={{ fontSize: 34, margin: 0 }}>
                    Payment cancelled
                </h1>

                <p
                    style={{
                        marginTop: 14,
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "rgba(209,213,219,0.9)",
                    }}
                >
                    Your PayPal checkout was cancelled before approval.
                </p>

                <button
                    onClick={() => navigate("/pricing")}
                    style={{
                        marginTop: 24,
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "#111827",
                        color: "#f9fafb",
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                >
                    Back to pricing
                </button>
            </div>
        </div>
    );
}