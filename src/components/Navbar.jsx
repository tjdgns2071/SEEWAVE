import React from "react";
import { Link } from "react-router-dom";

const navBtn = {
    background: "transparent",
    border: "none",
    color: "#f5f5f5",
    cursor: "pointer",
    textDecoration: "none",
};

const primaryBtn = {
    padding: "8px 16px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    background: "linear-gradient(135deg, rgba(255,80,80,1), rgba(255,120,120,1))",
    color: "#fff",
    textDecoration: "none",
};

const ghostBtn = {
    padding: "8px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    color: "#f5f5f5",
    textDecoration: "none",
};

export default function NavBar() {
    const [lang, setLang] = React.useState("EN");

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 40px",
                background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
            }}
        >
            {/* 로고 → 홈 이동 */}
            <Link
                to="/"
                style={{
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    fontSize: 20,
                    color: "#fff",
                    textDecoration: "none",
                }}
            >
                SEEWAVE
            </Link>

            {/* 네비게이션 링크 */}
            <nav
                style={{
                    display: "flex",
                    gap: 24,
                    fontSize: 14,
                    opacity: 0.9,
                }}
            >
                <button style={navBtn}>How it works</button>
                <Link to="/pricing" style={navBtn}>
                    Pricing
                </Link>
                <Link to="/faq" style={navBtn}>
                    FAQ
                </Link>
            </nav>

            {/* 우측 버튼 영역 */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                    onClick={() => setLang(lang === "EN" ? "KR" : "EN")}
                    style={{
                        ...ghostBtn,
                        padding: "8px 12px",
                        border: "none",
                        opacity: 0.8,
                        width: 40,
                    }}
                >
                    {lang}
                </button>

                <button style={ghostBtn}>Log in</button>

                {/* 스타트 페이지로 이동 */}
                <Link to="/start" style={primaryBtn}>
                    Start free trial
                </Link>
            </div>
        </header>
    );
}
