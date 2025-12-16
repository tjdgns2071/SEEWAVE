// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email")?.trim();
        const password = formData.get("password")?.trim();

        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해 주세요.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("로그인 성공!");
            // 로그인 성공 후 어디로 보낼지 결정
            navigate("/"); // 또는 "/" 로 바꿔도 됨
        } catch (error) {
            console.error(error);
            let message = "로그인에 실패했습니다.";

            if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
                message = "이메일 또는 비밀번호가 올바르지 않습니다.";
            } else if (error.code === "auth/user-not-found") {
                message = "해당 이메일의 계정이 없습니다.";
            }

            alert(message);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "radial-gradient(circle at top, #2d1b33 0, #05030a 55%, #010104 100%)",
                padding: "24px",
            }}
        >
            {/* 카드 */}
            <div
                style={{
                    width: 420,
                    maxWidth: "100%",
                    borderRadius: 32,
                    padding: "32px 32px 28px",
                    background:
                        "radial-gradient(circle at top left, rgba(255,255,255,0.04), transparent 55%), rgba(4,4,10,0.96)",
                    boxShadow:
                        "0 22px 60px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.03)",
                    color: "#f9fafb",
                }}
            >
                {/* 헤더 */}
                <div style={{ marginBottom: 26 }}>
                    <div
                        style={{
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            opacity: 0.6,
                            marginBottom: 8,
                        }}
                    >
                        WELCOME BACK
                    </div>
                    <h1
                        style={{
                            fontSize: 28,
                            lineHeight: 1.1,
                            fontWeight: 700,
                            margin: 0,
                        }}
                    >
                        Log in to{" "}
                        <span style={{ color: "#ff9a8b" }}>
                            SEEWAVE
                        </span>
                    </h1>
                    <p
                        style={{
                            fontSize: 13,
                            opacity: 0.7,
                            marginTop: 10,
                            marginBottom: 0,
                        }}
                    >
                        Keep learning cinematic music theory with your saved courses.
                    </p>
                </div>

                {/* 폼 시작 */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div style={{ marginBottom: 14 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 13,
                                marginBottom: 6,
                                opacity: 0.8,
                            }}
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            style={{
                                width: "100%",
                                padding: "11px 16px",
                                borderRadius: 999,
                                border: "1px solid rgba(255,255,255,0.14)",
                                background: "rgba(0,0,0,0.55)",
                                color: "#f9fafb",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Password + 링크 */}
                    <div style={{ marginBottom: 20 }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 6,
                                alignItems: "center",
                            }}
                        >
                            <label
                                style={{
                                    fontSize: 13,
                                    opacity: 0.8,
                                }}
                            >
                                Password
                            </label>
                            <button
                                className="hover-opacity"
                                type="button"
                                style={{
                                    border: "none",
                                    background: "none",
                                    padding: 0,
                                    fontSize: 11,
                                    color: "rgba(255,255,255,0.7)",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                Forgot password?
                            </button>
                        </div>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            style={{
                                width: "100%",
                                padding: "11px 16px",
                                borderRadius: 999,
                                border: "1px solid rgba(255,255,255,0.14)",
                                background: "rgba(0,0,0,0.55)",
                                color: "#f9fafb",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Log in 버튼 */}
                    <button
                        className="hover-scale"
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px 20px",
                            borderRadius: 999,
                            border: "none",
                            background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
                            color: "#111827",
                            fontWeight: 600,
                            fontSize: 15,
                            cursor: "pointer",
                            boxShadow: "0 10px 30px rgba(255,105,105,0.4)",
                        }}
                    >
                        Log in
                    </button>
                </form>

                {/* 구분선 */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        margin: "18px 0 18px",
                    }}
                >
                    <div
                        style={{
                            height: 1,
                            flex: 1,
                            background:
                                "linear-gradient(to right, transparent, rgba(255,255,255,0.18))",
                        }}
                    />
                    <span
                        style={{
                            fontSize: 11,
                            opacity: 0.55,
                            textTransform: "uppercase",
                            letterSpacing: "0.16em",
                        }}
                    >
                        or
                    </span>
                    <div
                        style={{
                            height: 1,
                            flex: 1,
                            background:
                                "linear-gradient(to left, transparent, rgba(255,255,255,0.18))",
                        }}
                    />
                </div>

                {/* 회원가입 이동 버튼 */}
                <button
                    className="hover-scale"
                    type="button"
                    onClick={() => navigate("/signup")}
                    style={{
                        width: "100%",
                        padding: "12px 20px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.16)",
                        background: "rgba(0,0,0,0.45)",
                        color: "#f9fafb",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    Create a new account
                </button>
            </div>
        </div>
    );
}
