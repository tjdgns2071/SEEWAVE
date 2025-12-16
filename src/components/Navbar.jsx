// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, subscribeToAuth } from "../firebase";

export default function NavBar() {
    const navigate = useNavigate();

    // 언어 토글 상태 (원래 있던 거 유지)
    const [lang, setLang] = useState("EN");

    // 🔐 Firebase 로그인 상태
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 로그인 상태 변화를 구독
        const unsubscribe = subscribeToAuth((currentUser) => {
            setUser(currentUser);
        });

        // 컴포넌트 unmount 시 구독 해제
        return () => unsubscribe();
    }, []);

    const handleAuthClick = () => {
        if (user) {
            // 이미 로그인된 상태 → 로그아웃
            auth.signOut();
            alert("로그아웃 되었습니다.");
            navigate("/");
        } else {
            // 로그인 안 된 상태 → 로그인 페이지로 이동
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
            <div
                style={{
                    width: "100%",
                    padding: "14px 40px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto", // 왼·가운데·오른쪽
                    alignItems: "center",
                }}
            >

                {/* 🟡 왼쪽: 로고 */}
                <div
                    className="hover-opacity"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    <span
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            letterSpacing: "0.24em",
                            textTransform: "uppercase",
                            color: "#f9fafb",
                        }}
                    >
                        SEEWAVE
                    </span>
                </div>

                {/* ⚪ 가운데: 네비게이션 4개를 중앙 정렬 */}
                <nav
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 20,
                        fontSize: 13,
                        color: "rgba(209,213,219,0.9)",
                    }}
                >
                    <Link to="/start" className="hover-opacity" style={{ textDecoration: "none", color: "inherit" }}>
                        How it works
                    </Link>
                    <Link to="/courses" className="hover-opacity" style={{ textDecoration: "none", color: "inherit" }}>
                        Courses
                    </Link>
                    <Link to="/pricing" className="hover-opacity" style={{ textDecoration: "none", color: "inherit" }}>
                        Pricing
                    </Link>
                    <Link to="/faq" className="hover-opacity" style={{ textDecoration: "none", color: "inherit" }}>
                        FAQ
                    </Link>
                </nav>

                {/* 🔵 오른쪽: EN / Log in(or Log out) / Start free trial */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    {/* 언어 토글 */}
                    <button
                        className="hover-scale"
                        onClick={() => setLang((prev) => (prev === "EN" ? "KR" : "EN"))}
                        style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid rgba(148,163,184,0.4)",
                            background: "rgba(15,23,42,0.7)",
                            color: "#e5e7eb",
                            fontSize: 11,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                        }}
                    >
                        {lang}
                    </button>

                    {/* 로그인 / 로그아웃 버튼 */}
                    <button
                        className="hover-scale"
                        onClick={handleAuthClick}
                        style={{
                            padding: "8px 14px",
                            borderRadius: 999,
                            border: "1px solid rgba(148,163,184,0.4)",
                            background: "transparent",
                            color: "#e5e7eb",
                            fontSize: 13,
                            cursor: "pointer",
                        }}
                    >
                        {user ? "Log out" : "Log in"}
                    </button>

                    {/* Start free trial → /pricing 으로 이동 */}
                    <button
                        className="hover-scale"
                        onClick={() => navigate("/pricing")}
                        style={{
                            padding: "8px 16px",
                            borderRadius: 999,
                            border: "none",
                            background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
                            color: "#111827",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 10px 30px rgba(248,113,113,0.35)",
                        }}
                    >
                        Start free trial
                    </button>
                </div>
            </div>
        </header>
    );
}
