import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, subscribeToAuth } from "../firebase";

export default function NavBar() {
    const navigate = useNavigate();
    const [lang, setLang] = useState("EN");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = subscribeToAuth(setUser);
        return () => unsubscribe();
    }, []);

    const handleAuthClick = () => {
        if (user) {
            auth.signOut();
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 40,
                backdropFilter: "blur(16px)",
                background:
                    "linear-gradient(to bottom, rgba(5,5,10,0.9), rgba(5,5,10,0.6), transparent)",
                borderBottom: "1px solid rgba(148,163,184,0.12)",
            }}
        >
            {/* 🔹 1줄 */}
            <div
                style={{
                    padding: "12px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        fontSize: 18,
                        fontWeight: 600,
                        letterSpacing: "0.24em",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    SEEWAVE
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                        onClick={() => setLang(lang === "EN" ? "KR" : "EN")}
                        style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid rgba(148,163,184,0.4)",
                            background: "transparent",
                            color: "#e5e7eb",
                            fontSize: 11,
                        }}
                    >
                        {lang}
                    </button>

                    <button
                        onClick={handleAuthClick}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 999,
                            border: "1px solid rgba(148,163,184,0.4)",
                            background: "transparent",
                            color: "#e5e7eb",
                            fontSize: 12,
                        }}
                    >
                        {user ? "Log out" : "Log in"}
                    </button>

                    <button
                        onClick={() => navigate("/pricing")}
                        style={{
                            padding: "6px 14px",
                            borderRadius: 999,
                            border: "none",
                            background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
                            color: "#111827",
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                    >
                        Start
                    </button>
                </div>
            </div>

            {/* 🔹 2줄 */}
            <nav
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 16,
                    paddingBottom: 10,
                    fontSize: 13,
                    color: "rgba(209,213,219,0.9)",
                    flexWrap: "wrap",
                }}
            >
                <Link to="/start" style={{ color: "inherit", textDecoration: "none" }}>
                    How it works
                </Link>
                <Link to="/courses" style={{ color: "inherit", textDecoration: "none" }}>
                    Courses
                </Link>
                <Link to="/pricing" style={{ color: "inherit", textDecoration: "none" }}>
                    Pricing
                </Link>
                <Link to="/faq" style={{ color: "inherit", textDecoration: "none" }}>
                    FAQ
                </Link>
            </nav>
        </header>
    );
}
