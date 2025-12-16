// src/pages/SignUp.jsx
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name")?.trim();
        const email = formData.get("email")?.trim();
        const password = formData.get("password")?.trim();

        if (!name || !email || !password) {
            alert("모든 칸을 채워주세요.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("회원가입 완료! 이제 로그인해 주세요.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("회원가입 중 오류가 발생했습니다: " + error.message);
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
                    "radial-gradient(circle at top, #3b1f4a 0, #05030b 45%, #020006 100%)",
                color: "#f9fafb",
                padding: "24px",
            }}
        >
            {/* 카드 */}
            <div
                style={{
                    width: 420,
                    maxWidth: "100%",
                    borderRadius: 28,
                    padding: "32px 40px 36px",
                    background:
                        "linear-gradient(145deg, rgba(7,7,12,0.98), rgba(5,5,10,0.98))",
                    boxShadow:
                        "0 32px 90px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
            >
                {/* 상단 텍스트 */}
                <div style={{ marginBottom: 16 }}>
                    <div
                        style={{
                            fontSize: 12,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(148, 163, 184, 0.9)",
                            marginBottom: 8,
                        }}
                    >
                        Create account
                    </div>
                    <h1
                        style={{
                            fontSize: 26,
                            fontWeight: 700,
                            margin: 0,
                            marginBottom: 6,
                        }}
                    >
                        Sign up for{" "}
                        <span style={{ color: "#ff8b7b" }}>
                            SEEWAVE
                        </span>
                    </h1>
                    <p
                        style={{
                            fontSize: 13,
                            lineHeight: 1.6,
                            color: "rgba(148, 163, 184, 0.95)",
                            margin: 0,
                        }}
                    >
                        Start learning cinematic music theory with personalized progress
                        tracking and saved courses.
                    </p>
                </div>

                {/* 폼 */}
                <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                    {/* Name */}
                    <div style={{ marginBottom: 14 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 13,
                                marginBottom: 6,
                                color: "rgba(148, 163, 184, 0.95)",
                            }}
                        >
                            Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            required
                            style={{
                                width: "100%",
                                height: 44,
                                padding: "0 14px",
                                borderRadius: 999,
                                border: "1px solid rgba(148, 163, 184, 0.3)",
                                background:
                                    "radial-gradient(circle at top, #0b0b13, #050509)",
                                color: "#e5e7eb",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 14 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 13,
                                marginBottom: 6,
                                color: "rgba(148, 163, 184, 0.95)",
                            }}
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            style={{
                                width: "100%",
                                height: 44,
                                padding: "0 14px",
                                borderRadius: 999,
                                border: "1px solid rgba(148, 163, 184, 0.3)",
                                background:
                                    "radial-gradient(circle at top, #0b0b13, #050509)",
                                color: "#e5e7eb",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 18 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 13,
                                marginBottom: 6,
                                color: "rgba(148, 163, 184, 0.95)",
                            }}
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            style={{
                                width: "100%",
                                height: 44,
                                padding: "0 14px",
                                borderRadius: 999,
                                border: "1px solid rgba(148, 163, 184, 0.3)",
                                background:
                                    "radial-gradient(circle at top, #0b0b13, #050509)",
                                color: "#e5e7eb",
                                fontSize: 14,
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <button
                        className="hover-scale"
                        type="submit"
                        style={{
                            width: "100%",
                            height: 46,
                            borderRadius: 999,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 15,
                            fontWeight: 600,
                            background:
                                "linear-gradient(135deg, #ff7b66, #ff9a8b)",
                            color: "#111827",
                            boxShadow:
                                "0 14px 30px rgba(248, 113, 113, 0.45)",
                            marginBottom: 18,
                        }}
                    >
                        Create account
                    </button>
                </form>

                {/* 구분선 */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 14,
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            height: 1,
                            background:
                                "linear-gradient(to right, transparent, rgba(148,163,184,0.4))",
                        }}
                    />
                    <span
                        style={{
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "rgba(148, 163, 184, 0.9)",
                        }}
                    >
                        or
                    </span>
                    <div
                        style={{
                            flex: 1,
                            height: 1,
                            background:
                                "linear-gradient(to left, transparent, rgba(148,163,184,0.4))",
                        }}
                    />
                </div>

                {/* 로그인으로 돌아가기 */}
                <button
                    className="hover-scale"
                    type="button"
                    onClick={() => navigate("/login")}
                    style={{
                        width: "100%",
                        height: 42,
                        borderRadius: 999,
                        border: "1px solid rgba(148, 163, 184, 0.4)",
                        background:
                            "radial-gradient(circle at top, #05050b, #020006)",
                        color: "rgba(249, 250, 251, 0.9)",
                        fontSize: 14,
                        cursor: "pointer",
                    }}
                >
                    Log in instead
                </button>
            </div>
        </div>
    );
}
