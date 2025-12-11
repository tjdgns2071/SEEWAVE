// src/components/Auth.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(7,7,14,0.9)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    marginBottom: 14,
};

const labelStyle = {
    fontSize: 13,
    marginBottom: 6,
    color: "rgba(255,255,255,0.8)",
};

const primaryBtn = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
    color: "#fff",
    marginTop: 6,
};

const ghostSwitchBtn = {
    padding: "6px 10px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    background: "transparent",
    color: "rgba(255,255,255,0.75)",
    textDecoration: "underline",
};

export default function Auth() {
    const [mode, setMode] = useState("login"); // 'login' or 'signup'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const isSignup = mode === "signup";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password || (isSignup && !name)) {
            setError("모든 필드를 입력해 주세요.");
            return;
        }

        // 여기서 실제로는 서버에 요청을 보내야 함.
        // 지금은 그냥 콘솔에 찍고 메인 페이지로 이동만 해볼게.
        console.log(`[${mode}]`, { email, password, name });

        // TODO: 실제 로그인 성공 시에만 이동하도록 변경
        navigate("/");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "radial-gradient(circle at top, #1b1024 0, #050510 55%, #020207 100%)",
                padding: 24,
                color: "#fff",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 28,
                    padding: "32px 32px 28px",
                    background:
                        "linear-gradient(145deg, rgba(12,12,22,0.96), rgba(3,3,10,0.98))",
                    boxShadow:
                        "0 28px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
            >
                <p
                    style={{
                        fontSize: 12,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: 10,
                    }}
                >
                    SEEWAVE
                </p>

                <h1
                    style={{
                        fontSize: 26,
                        marginBottom: 4,
                    }}
                >
                    {isSignup ? "Create your account" : "Welcome back"}
                </h1>

                <p
                    style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: 22,
                    }}
                >
                    {isSignup
                        ? "Sign up to start watching cinematic music theory lessons."
                        : "Log in to continue your visual music journey."}
                </p>

                {/* 탭처럼 보이는 모드 스위치 */}
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        padding: 4,
                        borderRadius: 999,
                        background: "rgba(12,12,24,0.9)",
                        marginBottom: 20,
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setMode("login")}
                        style={{
                            flex: 1,
                            padding: "8px 0",
                            borderRadius: 999,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 600,
                            background:
                                mode === "login"
                                    ? "linear-gradient(135deg, #ff6b6b, #ff9a8b)"
                                    : "transparent",
                            color: mode === "login" ? "#fff" : "rgba(255,255,255,0.7)",
                        }}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("signup")}
                        style={{
                            flex: 1,
                            padding: "8px 0",
                            borderRadius: 999,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 600,
                            background:
                                mode === "signup"
                                    ? "linear-gradient(135deg, #ff6b6b, #ff9a8b)"
                                    : "transparent",
                            color: mode === "signup" ? "#fff" : "rgba(255,255,255,0.7)",
                        }}
                    >
                        Sign up
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div style={{ marginBottom: 6 }}>
                            <div style={labelStyle}>Name</div>
                            <input
                                style={inputStyle}
                                type="text"
                                placeholder="이름 또는 닉네임"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: 6 }}>
                        <div style={labelStyle}>Email</div>
                        <input
                            style={inputStyle}
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: 6 }}>
                        <div style={labelStyle}>Password</div>
                        <input
                            style={inputStyle}
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div
                            style={{
                                fontSize: 12,
                                color: "#ff9a8b",
                                marginTop: 4,
                                marginBottom: 4,
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <button type="submit" style={primaryBtn}>
                        {isSignup ? "Create account" : "Log in"}
                    </button>
                </form>

                <div
                    style={{
                        marginTop: 18,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.7)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span>
                        {isSignup
                            ? "Already have an account?"
                            : "New to SEEWAVE?"}
                    </span>
                    <button
                        type="button"
                        style={ghostSwitchBtn}
                        onClick={() =>
                            setMode(isSignup ? "login" : "signup")
                        }
                    >
                        {isSignup ? "Log in" : "Create one"}
                    </button>
                </div>

                <div
                    style={{
                        marginTop: 22,
                        fontSize: 11,
                        color: "rgba(255,255,255,0.55)",
                        textAlign: "right",
                    }}
                >
                    <Link to="/" style={{ color: "inherit" }}>
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
