import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, subscribeToAuth } from "../firebase";

export default function NavBar() {
    const navigate = useNavigate();
    const [lang, setLang] = useState("EN");
    const [user, setUser] = useState(null);

    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        const unsubscribe = subscribeToAuth(setUser);
        return () => unsubscribe();
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

    const linkStyle = { color: "inherit", textDecoration: "none" };

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
            {/* ✅ PC: 1줄 헤더(로고 | 메뉴 | 우측 버튼), 모바일: 기존 2줄 */}
            {isMobile ? (
                <>
                    {/* 🔹 모바일 1줄: 로고 + 우측 버튼들 */}
                    <div
                        style={{
                            padding: "12px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                letterSpacing: "0.24em",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
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
                                    whiteSpace: "nowrap",
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
                                    whiteSpace: "nowrap",
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
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Start
                            </button>
                        </div>
                    </div>

                    {/* 🔹 모바일 2줄: 메뉴 (wrap 허용) */}
                    <nav
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 16,
                            padding: "0 16px 10px",
                            fontSize: 13,
                            color: "rgba(209,213,219,0.9)",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link to="/start" style={linkStyle}>
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
                </>
            ) : (
                <>
                    {/* ✅ PC 1줄: 로고 | 가운데 메뉴 | 우측 버튼 */}
                    <div
                        style={{
                            width: "100%",                 // ⭐ 풀폭 보장
                            padding: "14px 32px",           // ⭐ 양끝 여백만
                            display: "grid",
                            gridTemplateColumns: "auto 1fr auto",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        {/* 로고 */}
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                letterSpacing: "0.24em",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                            }}
                            onClick={() => navigate("/")}
                        >
                            SEEWAVE
                        </div>

                        {/* 가운데 메뉴 (PC에서는 여기로 올라감) */}
                        <nav
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 18,
                                fontSize: 13,
                                color: "rgba(209,213,219,0.9)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <Link to="/start" style={linkStyle}>
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

                        {/* 우측 버튼들 */}
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
                                    whiteSpace: "nowrap",
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
                                    whiteSpace: "nowrap",
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
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
