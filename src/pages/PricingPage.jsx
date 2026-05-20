// src/pages/PricingPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const PAYPAL_CLIENT_ID =
    "AQyDJNBSwqwn-z_IeAs6MyEtyE6kGf6i3ETIMJDj9DofboswMVfdpUvmwRwHIbqbbDXkxzh_7PX_JHz_";

const PAYPAL_PLAN_IDS = {
    allAccess: "P-1U497050AG490934WNICIBGI",
    visualTheory: "P-1FT92885Y41515152NICI2XQ",
    rhythmInMotion: "P-13W29253JG6829919NICI4HA",
    harmonyFlow: "P-5P234175BG938673LNICI6AY",
    pianoRollLab: "P-1FL38210M5166514YNICI6WY",
    composition: "P-2CJ494O1RL949183GNICI7HI",
    melodyLines: "P-9L835765PL469572MNICI7ZY",
};

function PayPalSubscribeButton({ planId, planName }) {
    const paypalRef = useRef(null);

    useEffect(() => {
        const scriptId = "paypal-sdk-script";

        const renderButton = () => {
            if (!window.paypal || !paypalRef.current) return;

            paypalRef.current.innerHTML = "";

            window.paypal
                .Buttons({
                    style: {
                        layout: "vertical",
                        color: "black",
                        shape: "pill",
                        label: "subscribe",
                    },
                    createSubscription: (data, actions) => {
                        return actions.subscription.create({
                            plan_id: planId,
                        });
                    },
                    onApprove: (data) => {
                        console.log("PayPal subscription approved:", data);

                        window.location.href = `/payment-success?subscription_id=${data.subscriptionID}&plan_id=${planId}`;
                    },
                    onCancel: () => {
                        window.location.href = "/payment-cancel";
                    },
                    onError: (err) => {
                        console.error("PayPal subscription error:", err);
                        alert("PayPal subscription failed.");
                    },
                })
                .render(paypalRef.current);
        };

        if (window.paypal) {
            renderButton();
            return;
        }

        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription&currency=USD`;
            script.async = true;
            script.onload = renderButton;
            document.body.appendChild(script);
        } else {
            script.addEventListener("load", renderButton);
        }
    }, [planId, planName]);

    return <div ref={paypalRef} style={{ marginTop: 18 }} />;
}

export default function PricingPage() {
    const navigate = useNavigate();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [openIdx, setOpenIdx] = useState(0);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login?redirect=/pricing", { replace: true });
                return;
            }

            setCheckingAuth(false);
        });

        return () => unsub();
    }, [navigate]);

    const plans = useMemo(
        () => [
            {
                name: "All Access",
                price: "$19",
                period: "/ month",
                badge: "RECOMMENDED",
                subtitle: "Everything unlocked + weekly updates",
                bullets: [
                    "All categories unlocked",
                    "New lessons every week",
                    "Progress saved (Auth)",
                    "Works across devices",
                ],
                primary: true,
                planId: PAYPAL_PLAN_IDS.allAccess,
            },
            {
                name: "Visual Theory",
                price: "$9",
                period: "/ month",
                subtitle: "Visual music theory lessons",
                bullets: [
                    "Unlock Visual Theory only",
                    "Motion-based theory lessons",
                    "Category updates included",
                    "Upgrade anytime",
                ],
                primary: false,
                planId: PAYPAL_PLAN_IDS.visualTheory,
            },
            {
                name: "Rhythm in Motion",
                price: "$9",
                period: "/ month",
                subtitle: "Rhythm through motion graphics",
                bullets: [
                    "Unlock Rhythm in Motion only",
                    "Timing and groove lessons",
                    "Category updates included",
                    "Upgrade anytime",
                ],
                primary: false,
                planId: PAYPAL_PLAN_IDS.rhythmInMotion,
            },
            {
                name: "Harmony Flow",
                price: "$9",
                period: "/ month",
                subtitle: "Harmony for modern creators",
                bullets: [
                    "Unlock Harmony Flow only",
                    "Chord and progression lessons",
                    "Category updates included",
                    "Upgrade anytime",
                ],
                primary: false,
                planId: PAYPAL_PLAN_IDS.harmonyFlow,
            },
            {
                name: "Piano Roll Lab",
                price: "$9",
                period: "/ month",
                subtitle: "MIDI and piano roll learning",
                bullets: [
                    "Unlock Piano Roll Lab only",
                    "MIDI visualization lessons",
                    "Category updates included",
                    "Upgrade anytime",
                ],
                primary: false,
                planId: PAYPAL_PLAN_IDS.pianoRollLab,
            },
            {
                name: "Composition",
                price: "$9",
                period: "/ month",
                subtitle: "Cinematic composition lessons",
                bullets: [
                    "Unlock Composition only",
                    "Writing and structure lessons",
                    "Category updates included",
                    "Upgrade anytime",
                ],
                primary: false,
                planId: PAYPAL_PLAN_IDS.composition,
            },
            {
                name: "Melody Lines",
                price: "$9",
                period: "/ month",
                subtitle: "Melody writing and phrasing",
                bullets: [
                    "Unlock Melody Lines only",
                    "Melody and phrasing lessons",
                    "Category updates included",
                    "Upgrade anytime",
                ],
                primary: false,
                planId: PAYPAL_PLAN_IDS.melodyLines,
            },
        ],
        []
    );

    const faqs = useMemo(
        () => [
            {
                q: "What does All Access include?",
                a: "All Access unlocks every SEEWAVE category, including Visual Theory, Rhythm in Motion, Harmony Flow, Piano Roll Lab, Composition, and Melody Lines.",
            },
            {
                q: "What happens if I subscribe to one category?",
                a: "A category subscription unlocks only that specific category. Other categories stay locked unless you subscribe to them or upgrade to All Access.",
            },
            {
                q: "Can I upgrade to All Access later?",
                a: "Yes. The access system is designed so category subscribers can upgrade to All Access later.",
            },
            {
                q: "Can I cancel anytime?",
                a: "Yes. Subscriptions are month-to-month. You can cancel any time and your access lasts until the end of the billing period.",
            },
            {
                q: "Will my progress be saved?",
                a: "Yes. With login, progress can be saved so you can continue across devices.",
            },
        ],
        []
    );

    const pageWrap = {
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111118, #020206)",
        color: "#f5f5f5",
        padding: "84px 24px 80px",
    };

    const container = { maxWidth: 1120, margin: "0 auto" };
    const kicker = { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6, marginBottom: 10 };
    const h1 = { fontSize: 54, lineHeight: 1.02, margin: 0, letterSpacing: "-0.02em" };
    const lead = { marginTop: 12, maxWidth: 820, fontSize: 14, lineHeight: 1.6, color: "rgba(209,213,219,0.88)" };
    const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 26 };
    const cardBase = {
        borderRadius: 22,
        padding: 22,
        background: "radial-gradient(circle at top left, rgba(255,255,255,0.04), transparent 55%), rgba(4,4,10,0.82)",
        border: "1px solid rgba(148,163,184,0.14)",
        boxShadow: "0 24px 70px rgba(0,0,0,0.6)",
        position: "relative",
        overflow: "hidden",
    };
    const badge = {
        position: "absolute",
        top: 18,
        right: 18,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 10,
        letterSpacing: "0.14em",
        border: "1px solid rgba(255,154,139,0.35)",
        color: "rgba(255,200,190,0.95)",
        background: "rgba(255,105,105,0.08)",
    };
    const planName = { fontSize: 18, fontWeight: 700, margin: 0 };
    const priceRow = { display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 };
    const price = { fontSize: 36, fontWeight: 800 };
    const period = { fontSize: 13, opacity: 0.7 };
    const subtitle = { marginTop: 8, fontSize: 12, opacity: 0.75 };
    const ul = { marginTop: 14, paddingLeft: 18, color: "rgba(229,231,235,0.92)" };
    const li = { margin: "8px 0", fontSize: 13, opacity: 0.92 };
    const noteBox = {
        marginTop: 14,
        padding: 16,
        borderRadius: 16,
        background: "rgba(0,0,0,0.28)",
        border: "1px solid rgba(148,163,184,0.14)",
        color: "rgba(209,213,219,0.85)",
        fontSize: 12,
        lineHeight: 1.6,
    };
    const faqHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 54, gap: 12 };
    const faqTitle = { fontSize: 26, margin: 0 };
    const toFaqBtn = {
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid rgba(148,163,184,0.22)",
        background: "rgba(0,0,0,0.28)",
        color: "#f9fafb",
        cursor: "pointer",
        fontSize: 12,
    };
    const accordion = { marginTop: 14, display: "grid", gap: 12 };
    const qaCard = {
        borderRadius: 16,
        background: "rgba(0,0,0,0.28)",
        border: "1px solid rgba(148,163,184,0.14)",
        overflow: "hidden",
    };
    const qaTop = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        cursor: "pointer",
    };
    const qText = { fontSize: 14, fontWeight: 700, margin: 0 };
    const plus = {
        width: 28,
        height: 28,
        borderRadius: 999,
        border: "1px solid rgba(148,163,184,0.18)",
        display: "grid",
        placeItems: "center",
        fontSize: 16,
        opacity: 0.9,
    };
    const aWrap = (open) => ({
        maxHeight: open ? 240 : 0,
        transition: "max-height 280ms ease",
        overflow: "hidden",
    });
    const aText = {
        padding: "0 16px 14px",
        margin: 0,
        fontSize: 13,
        lineHeight: 1.65,
        color: "rgba(209,213,219,0.88)",
    };

    return (
        <div style={pageWrap}>
            <div style={container}>
                <div style={kicker}>PRICING</div>
                <h1 style={h1}>Choose your plan.</h1>
                <div style={lead}>
                    Start with one category, or unlock everything with <b>All Access</b>. Payments and access control will
                    be wired to <b>PayPal + Firestore</b> next.
                </div>

                <div style={grid}>
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            style={{
                                ...cardBase,
                                border: p.primary ? "1px solid rgba(255,154,139,0.35)" : cardBase.border,
                                background: p.primary
                                    ? "radial-gradient(circle at top left, rgba(255,154,139,0.12), transparent 58%), rgba(4,4,10,0.86)"
                                    : cardBase.background,
                            }}
                        >
                            {p.badge && <div style={badge}>{p.badge}</div>}
                            <h3 style={planName}>{p.name}</h3>

                            <div style={priceRow}>
                                <div style={price}>{p.price}</div>
                                <div style={period}>{p.period}</div>
                            </div>

                            <div style={subtitle}>{p.subtitle}</div>

                            <ul style={ul}>
                                {p.bullets.map((b) => (
                                    <li key={b} style={li}>
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            <PayPalSubscribeButton planId={p.planId} planName={p.name} />
                        </div>
                    ))}
                </div>

                <div style={noteBox}>
                    <b>Status:</b> PayPal subscription buttons are connected. Next step is writing subscription state into
                    Firestore for All Access and category-based unlock.
                </div>

                <div style={faqHeader}>
                    <h2 style={faqTitle}>Pricing FAQ</h2>
                    <button style={toFaqBtn} onClick={() => navigate("/faq")}>
                        Go to FAQ →
                    </button>
                </div>

                <div style={accordion}>
                    {faqs.map((item, idx) => {
                        const open = idx === openIdx;
                        return (
                            <div key={item.q} style={qaCard}>
                                <div
                                    style={qaTop}
                                    onClick={() => setOpenIdx(open ? -1 : idx)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <p style={qText}>{item.q}</p>
                                    <div style={plus}>{open ? "–" : "+"}</div>
                                </div>
                                <div style={aWrap(open)}>
                                    <p style={aText}>{item.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}