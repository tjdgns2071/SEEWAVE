// src/pages/PaymentSuccessPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const PLAN_MAP = {
    "P-1U497050AG490934WNICIBGI": {
        planType: "all_access",
        all_access: true,
        categories: [],
    },
    "P-1FT92885Y41515152NICI2XQ": {
        planType: "category",
        all_access: false,
        categories: ["visual-theory"],
    },
    "P-13W29253JG6829919NICI4HA": {
        planType: "category",
        all_access: false,
        categories: ["rhythm-in-motion"],
    },
    "P-5P234175BG938673LNICI6AY": {
        planType: "category",
        all_access: false,
        categories: ["harmony-flow"],
    },
    "P-1FL38210M5166514YNICI6WY": {
        planType: "category",
        all_access: false,
        categories: ["piano-roll-lab"],
    },
    "P-2CJ494O1RL949183GNICI7HI": {
        planType: "category",
        all_access: false,
        categories: ["composition"],
    },
    "P-9L835765PL469572MNICI7ZY": {
        planType: "category",
        all_access: false,
        categories: ["melody-lines"],
    },
};

export default function PaymentSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Checking login status...");

    useEffect(() => {
        const subscriptionId = searchParams.get("subscription_id");
        const planId = searchParams.get("plan_id");
        const planData = PLAN_MAP[planId];

        const unsub = onAuthStateChanged(auth, async (user) => {
            try {
                if (!user) {
                    setMessage("Please log in again to sync your subscription.");
                    return;
                }

                if (!subscriptionId || !planData) {
                    setMessage("Subscription data is missing.");
                    return;
                }

                setMessage("Saving your subscription...");

                await setDoc(
                    doc(db, "subscriptions", user.uid),
                    {
                        uid: user.uid,
                        email: user.email,
                        paypalSubscriptionId: subscriptionId,
                        paypalPlanId: planId,
                        status: "active",
                        ...planData,
                        updatedAt: serverTimestamp(),
                    },
                    { merge: true }
                );

                setMessage("Your subscription has been saved.");
            } catch (error) {
                console.error("Subscription save error:", error);
                setMessage("Subscription approved, but saving failed.");
            }
        });

        return () => unsub();
    }, [searchParams]);

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
                    border: "1px solid rgba(255,154,139,0.28)",
                    boxShadow: "0 24px 70px rgba(0,0,0,0.6)",
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 42, marginBottom: 12 }}>✅</div>

                <h1 style={{ fontSize: 34, margin: 0 }}>
                    Subscription approved
                </h1>

                <p
                    style={{
                        marginTop: 14,
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "rgba(209,213,219,0.9)",
                    }}
                >
                    {message}
                </p>

                <button
                    onClick={() => navigate("/courses")}
                    style={{
                        marginTop: 24,
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: 999,
                        border: "none",
                        background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
                        color: "#111827",
                        fontWeight: 800,
                        cursor: "pointer",
                    }}
                >
                    Go to courses
                </button>
            </div>
        </div>
    );
}