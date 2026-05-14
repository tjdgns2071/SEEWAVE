// src/components/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, subscribeToAuth } from "../firebase";

export default function NavBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState("EN");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const unsub = subscribeToAuth(setUser);
        return () => unsub();
    }, []);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const handleAuthClick = () => {
        if (user) {
            auth.signOut();
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        opacity: 0.85,
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
            <div
                style={{
                    padding: "14px 32px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                {/* Logo */}
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

                {/* Center Nav */}
                {!isMobile && (
                    <nav
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 18,
                            fontSize: 13,
                            whiteSpace: "nowrap",
                        }}
                    >
                        <Link to="/how-it-works" style={linkStyle}>
                            How it works
                        </Link>
                        <Link to="/courses" style={linkStyle}>
                            Courses
                        </Link>
                        <Link to="/pricing" style={linkStyle}>
                            Pricing
                        </Link>
                        <Link to="/faq" style={linkStyle}>
                            FAQ
                        </Link>
                    </nav>
                )}

                {/* Right Buttons */}
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
        </header>
    );
}
