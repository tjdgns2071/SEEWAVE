// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const primaryBtn = {
    padding: "14px 26px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
    color: "#fff",
};

const ghostBtn = {
    padding: "14px 24px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    cursor: "pointer",
    fontSize: 15,
    color: "#f5f5f5",
};

export default function Hero() {
    return (
        <section
            style={{
                padding: "48px 40px 32px 40px", // 위·아래 여백 줄인 버전
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.9fr) minmax(0, 1.3fr)",
                gap: 56,
                alignItems: "center",
                minHeight: 460,
            }}
        >
            {/* -------- 왼쪽 : 배경 영상 + 텍스트 -------- */}
            <div
                style={{
                    position: "relative",
                    borderRadius: 0,
                    overflow: "hidden",
                    background: "transparent",
                }}
            >

                {/* 16:9 VIDEO WRAPPER */}
                <div
                    style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        position: "relative",
                    }}
                >
                    {/* BLUR + DARK OVERLAY */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.32)",
                            backdropFilter: "blur(2.2px)",
                            WebkitBackdropFilter: "blur(2.2px)",
                            pointerEvents: "none",
                            zIndex: 2,
                        }}
                    />

                    {/* VIDEO */}
                    <iframe
                        title="SEEWAVE intro"
                        src="https://player.vimeo.com/video/1143730520?background=1&autopause=0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            display: "block",
                            position: "absolute",
                            inset: 0,
                            zIndex: 1,
                        }}
                    />
                </div>

                {/* TEXT OVERLAY */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        padding: "30px 52px 36px 30px",
                        zIndex: 3,
                    }}
                >
                    <div style={{ maxWidth: 520 }}>

                        <p
                            style={{
                                fontSize: 12,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.7)",
                                marginBottom: 18,
                            }}
                        >
                            SEE THE SOUND
                        </p>

                        <h1
                            style={{
                                fontSize: 44,
                                lineHeight: 1.1,
                                marginBottom: 20,
                            }}
                        >
                            Cinematic music theory
                            <br />
                            for visual learners.
                        </h1>

                        <p
                            style={{
                                fontSize: 15,
                                color: "rgba(255,255,255,0.86)",
                                maxWidth: 520,
                                marginBottom: 28,
                            }}
                        >
                            SEEWAVE turns harmony, rhythm and notation into motion graphics.
                            Learn music through scores, shapes and color instead of talking heads.
                        </p>

                        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                            <Link to="/start" style={primaryBtn}>
                                Start watching
                            </Link>
                            <Link to="/courses" style={ghostBtn}>
                                Browse courses
                            </Link>
                        </div>

                        <p
                            style={{
                                fontSize: 12,
                                color: "rgba(255,255,255,0.7)",
                            }}
                        >
                            No narration overload · Visual-first · New lessons every week
                        </p>

                    </div>
                </div>

            </div>


            {/* -------- 오른쪽 : Sample lesson 카드 -------- */}
            <div
                style={{
                    borderRadius: 34,
                    padding: 24,
                    background:
                        "radial-gradient(circle at top, rgba(255,120,150,0.16), rgba(5,5,12,0.98))",
                    border: "1px solid rgba(255,120,150,0.9)",
                    boxShadow:
                        "0 0 40px rgba(255,120,150,0.35), 0 40px 80px rgba(0,0,0,0.9)",
                }}
            >
                <p
                    style={{
                        fontSize: 13,
                        marginBottom: 18,
                        color: "rgba(255,255,255,0.9)",
                    }}
                >
                    Sample lesson · Harmony
                </p>

                <div
                    style={{
                        borderRadius: 24,
                        padding: "22px 24px 22px",
                        background:
                            "linear-gradient(135deg, rgba(10,10,18,0.98), rgba(2,2,5,1))",
                        border: "1px solid rgba(255,255,255,0.16)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
                    }}
                >
                    {/* 오선지 + 음표 점 */}
                    <div
                        style={{
                            borderRadius: 20,
                            padding: 18,
                            background:
                                "linear-gradient(0deg, rgba(15,15,24,1), rgba(5,5,10,1))",
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
                            marginBottom: 18,
                        }}
                    >
                        <div
                            style={{
                                height: 90,
                                borderRadius: 18,
                                backgroundColor: "rgba(0,0,0,0.96)",
                                backgroundImage:
                                    "repeating-linear-gradient(0deg, transparent, transparent 13px, rgba(255,255,255,0.16) 13px, rgba(255,255,255,0.16) 14px)",
                                backgroundRepeat: "repeat",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {[
                                { x: 0.1, y: 62 },
                                { x: 0.22, y: 52 },
                                { x: 0.34, y: 66 },
                                { x: 0.46, y: 44 },
                                { x: 0.58, y: 55 },
                                { x: 0.7, y: 38 },
                                { x: 0.82, y: 48 },
                                { x: 0.94, y: 60 },
                            ].map((pos, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        left: `${pos.x * 100}%`,
                                        top: `${pos.y}%`,
                                        width: 14,
                                        height: 14,
                                        borderRadius: "50%",
                                        transform: "translate(-50%, -50%)",
                                        background:
                                            "radial-gradient(circle, #ffe0f0 0%, #ff86a5 55%, #ff506b 100%)",
                                        boxShadow:
                                            "0 0 18px rgba(255,120,150,0.9), 0 0 32px rgba(255,120,150,0.5)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <p
                        style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.78)",
                            marginBottom: 12,
                        }}
                    >
                        Chord tones, passing tones and tensions animated on a single phrase.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 11,
                            color: "rgba(255,255,255,0.7)",
                        }}
                    >
                        <span>Level · Intermediate</span>
                        <span>Length · 7 min</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
