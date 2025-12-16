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
                padding: "48px 40px 32px 40px",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.9fr) minmax(0, 1.3fr)",
                gap: 56,
                alignItems: "flex-start", // ② 위쪽 기준 정렬
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

                    // ① 전체 컬럼 중 일부만 쓰면서, 비율은 16:9 유지
                    width: "82%",          // 필요하면 70~85 사이로 조절
                    aspectRatio: "16 / 9",
                    alignSelf: "flex-start",
                }}
            >
                {/* VIDEO WRAPPER - 카드 전체를 채우는 레이어 */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
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

                    {/* VIMEO IFRAME */}
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
                className="hover-lift"
                style={{
                    borderRadius: 28,
                    padding: 22,
                    background:
                        "linear-gradient(135deg, rgba(8,8,14,0.98), rgba(3,3,7,0.98))",
                    border: "1px solid rgba(255,140,150,0.28)", // 훨씬 얌전한 테두리
                    boxShadow: "0 18px 40px rgba(0,0,0,0.85)",   // 퍼지는 글로우 제거
                }}
            >
                <p
                    style={{
                        fontSize: 13,
                        marginBottom: 16,
                        color: "rgba(255,255,255,0.9)",
                    }}
                >
                    Sample lesson · Harmony
                </p>

                <div
                    style={{
                        borderRadius: 22,
                        padding: "20px 22px 20px",
                        background:
                            "linear-gradient(135deg, #141118, #09070d)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 14px 30px rgba(0,0,0,0.8)",
                    }}
                >
                    {/* 오선지 + 음표 점 */}
                    <div
                        style={{
                            borderRadius: 18,
                            padding: 16,
                            background: "#181119",
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
                            marginBottom: 16,
                        }}
                    >
                        <div
                            style={{
                                height: 78,
                                borderRadius: 16,
                                backgroundColor: "#080609",
                                backgroundImage:
                                    "repeating-linear-gradient(0deg, transparent, transparent 11px, rgba(255,200,200,0.10) 11px, rgba(255,200,200,0.10) 12px)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {[
                                { x: 0.1, y: 64 },
                                { x: 0.22, y: 54 },
                                { x: 0.34, y: 68 },
                                { x: 0.46, y: 46 },
                                { x: 0.58, y: 57 },
                                { x: 0.7, y: 40 },
                                { x: 0.82, y: 50 },
                                { x: 0.94, y: 62 },
                            ].map((pos, i) => (
                                <button
                                    className="hover-scale"
                                    onClick={() => navigate("/pricing")}
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        left: `${pos.x * 100}%`,
                                        top: `${pos.y}%`,
                                        width: 11,
                                        height: 11,
                                        borderRadius: "50%",
                                        transform: "translate(-50%, -50%)",
                                        background:
                                            "radial-gradient(circle, #ffe7df 0%, #ff9d8b 55%, #ff6b6b 100%)",
                                        boxShadow:
                                            "0 0 10px rgba(255,140,150,0.7)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <p
                        style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.8)",
                            marginBottom: 10,
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
