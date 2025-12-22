// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** ✅ 여기 값만 바꾸면 “영상 크기”가 바로 조절됨 */
const DESKTOP_VIDEO_MAX_WIDTH = 820; // 760~900 사이로 조절 추천
const DESKTOP_ASPECT = "16 / 9";     // 비율 유지 (잘림 없음)
const MOBILE_ASPECT = "16 / 10";     // 모바일에서 너무 길면 16/10 or 4/3로도 가능

const primaryBtn = {
    padding: "14px 26px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
    color: "#fff",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

const ghostBtn = {
    padding: "14px 24px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    cursor: "pointer",
    fontSize: 15,
    color: "#f5f5f5",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

function useIsMobile(breakpoint = 900) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);

    return isMobile;
}

export default function Hero() {
    const isMobile = useIsMobile(980);

    const sectionStyle = {
        padding: isMobile ? "22px 16px 18px" : "48px 40px 32px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.9fr) minmax(0, 1.3fr)",
        gap: isMobile ? 18 : 56,
        alignItems: "center",
    };

    /** ✅ “좌상단은 그대로, 우하단에서 줄이는 느낌”
     * - 바깥(왼쪽 영역)은 그대로
     * - 영상 wrapper만 maxWidth로 살짝 줄임 (왼쪽 붙어서 우하단이 줄어든 느낌)
     */
    const leftWrapStyle = {
        position: "relative",
        overflow: "visible",
    };

    const videoOuterStyle = {
        position: "relative",
        width: "100%",
        maxWidth: isMobile ? "100%" : DESKTOP_VIDEO_MAX_WIDTH,
        borderRadius: 0,
        overflow: "hidden",
        background: "transparent",
    };

    const videoRatioStyle = {
        width: "100%",
        aspectRatio: isMobile ? MOBILE_ASPECT : DESKTOP_ASPECT,
        position: "relative",
    };

    const overlayStyle = {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.32)",
        backdropFilter: "blur(2.2px)",
        WebkitBackdropFilter: "blur(2.2px)",
        pointerEvents: "none",
        zIndex: 2,
    };

    const iframeStyle = {
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
        position: "absolute",
        inset: 0,
        zIndex: 1,
    };

    const textLayerStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: isMobile ? "18px" : "30px 52px 36px 30px",
        zIndex: 3,
        display: "flex",
        alignItems: "flex-start",
    };

    const h1Style = {
        fontSize: isMobile ? 34 : 44,
        lineHeight: 1.1,
        marginBottom: isMobile ? 14 : 20,
    };

    const descStyle = {
        fontSize: isMobile ? 14 : 15,
        color: "rgba(255,255,255,0.86)",
        maxWidth: 520,
        marginBottom: isMobile ? 18 : 28,
    };

    const btnRowStyle = {
        display: "flex",
        gap: 12,
        marginBottom: 16,
        flexWrap: "wrap",
    };

    /** ✅ 샘플레슨 카드 “덜 튀게” */
    const sampleOuterStyle = {
        borderRadius: 34,
        padding: isMobile ? 18 : 24,
        background: "linear-gradient(180deg, rgba(15,15,22,0.78), rgba(6,6,10,0.92))",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
    };

    const sampleInnerStyle = {
        borderRadius: 24,
        padding: isMobile ? "18px" : "22px 24px 22px",
        background: "linear-gradient(135deg, rgba(10,10,16,0.85), rgba(2,2,6,0.95))",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
    };

    const staffWrapStyle = {
        borderRadius: 20,
        padding: 18,
        background: "linear-gradient(0deg, rgba(15,15,24,0.65), rgba(5,5,10,0.85))",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
        marginBottom: 18,
    };

    const staffStyle = {
        height: 90,
        borderRadius: 18,
        backgroundColor: "rgba(0,0,0,0.82)",
        backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 13px, rgba(255,255,255,0.14) 13px, rgba(255,255,255,0.14) 14px)",
        backgroundRepeat: "repeat",
        position: "relative",
        overflow: "hidden",
    };

    return (
        <section style={sectionStyle}>
            {/* -------- 왼쪽 : 배경 영상 + 텍스트 -------- */}
            <div style={leftWrapStyle}>
                <div style={videoOuterStyle}>
                    <div style={videoRatioStyle}>
                        <div style={overlayStyle} />
                        <iframe
                            title="SEEWAVE intro"
                            src="https://player.vimeo.com/video/1143730520?background=1&autopause=0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={iframeStyle}
                        />
                    </div>

                    <div style={textLayerStyle}>
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

                            <h1 style={h1Style}>
                                Cinematic music theory
                                <br />
                                for visual learners.
                            </h1>

                            <p style={descStyle}>
                                SEEWAVE turns harmony, rhythm and notation into motion graphics.
                                Learn music through scores, shapes and color instead of talking heads.
                            </p>

                            <div style={btnRowStyle}>
                                <Link to="/start" style={primaryBtn}>
                                    Start watching
                                </Link>
                                <Link to="/courses" style={ghostBtn}>
                                    Browse courses
                                </Link>
                            </div>

                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                                No narration overload · Visual-first · New lessons every week
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* -------- 오른쪽 : Sample lesson 카드 -------- */}
            <div style={sampleOuterStyle}>
                <p style={{ fontSize: 13, marginBottom: 18, color: "rgba(255,255,255,0.9)" }}>
                    Sample lesson · Harmony
                </p>

                <div style={sampleInnerStyle}>
                    <div style={staffWrapStyle}>
                        <div style={staffStyle}>
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
                                            "radial-gradient(circle, rgba(255,224,240,0.95) 0%, rgba(255,134,165,0.75) 55%, rgba(255,80,107,0.55) 100%)",
                                        boxShadow:
                                            "0 0 12px rgba(255,120,150,0.35), 0 0 18px rgba(255,120,150,0.18)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", marginBottom: 12 }}>
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
