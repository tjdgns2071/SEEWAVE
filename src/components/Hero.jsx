// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** ✅ 여기 값만 바꾸면 “영상 크기”가 바로 조절됨 */
const DESKTOP_VIDEO_MAX_WIDTH = 820; // 760~900 사이
const DESKTOP_ASPECT = "16 / 9";
const MOBILE_ASPECT = "16 / 10";

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

    const primaryBtn = {
        padding: isMobile ? "9px 14px" : "14px 26px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        fontSize: isMobile ? 13 : 15,
        fontWeight: 600,
        lineHeight: 1,              // ✅ 세로 중심 느낌
        background: "linear-gradient(135deg, #ff6b6b, #ff9a8b)",
        color: "#fff",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",        // ✅ 세로 중앙
        justifyContent: "center",    // ✅ 가로 중앙
        whiteSpace: "nowrap",
    };

    const ghostBtn = {
        padding: isMobile ? "9px 14px" : "14px 24px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.3)",
        background: "transparent",
        cursor: "pointer",
        fontSize: isMobile ? 13 : 15,
        lineHeight: 1,              // ✅
        color: "#f5f5f5",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
    };

    const sectionStyle = {
        padding: isMobile ? "18px 16px 12px" : "48px 40px 32px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.9fr) minmax(0, 1.3fr)",
        gap: isMobile ? 16 : 56,
        alignItems: "center",
        maxWidth: "100%",
        overflowX: "hidden", // ✅ Hero 내부에서도 안전장치
        boxSizing: "border-box",
    };

    const leftWrapStyle = {
        position: "relative",
        overflow: "visible",
        maxWidth: "100%",
    };

    const videoOuterStyle = {
        position: "relative",
        width: "100%",
        maxWidth: isMobile ? "100%" : DESKTOP_VIDEO_MAX_WIDTH,
        borderRadius: 0,
        overflow: "hidden",
        background: "transparent",
        boxSizing: "border-box",
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
        padding: isMobile ? "18px 18px 34px" : "30px 52px 36px 30px",
        zIndex: 3,
        display: "flex",
        alignItems: "flex-start",
        boxSizing: "border-box",
    };

    const h1Style = {
        fontSize: isMobile ? 30 : 44,
        lineHeight: 1.1,
        marginBottom: isMobile ? 12 : 20,
        maxWidth: "100%",
    };

    const descStyle = {
        fontSize: isMobile ? 13.5 : 15,
        color: "rgba(255,255,255,0.86)",
        maxWidth: isMobile ? "100%" : 520,
        marginBottom: isMobile ? 16 : 28,
    };

    const btnRowStyle = {
        display: "flex",
        gap: 10,
        marginBottom: 14,
        flexWrap: "wrap",
    };

    const sampleOuterStyle = {
        borderRadius: 30,
        padding: isMobile ? 16 : 24,

        background:
            "linear-gradient(180deg, rgba(22,22,30,0.72) 0%, rgba(10,10,16,0.88) 55%, rgba(6,6,10,0.92) 100%)",

        // 🔥 여기 추가 (상단 핑크 하이라이트)
        backgroundImage:
            "linear-gradient(180deg, rgba(255,120,150,0.05), transparent 38%)",

        border: "1px solid rgba(255,120,150,0.18)",

        boxShadow: `
    0 28px 70px rgba(0,0,0,0.55),
    0 0 0 1px rgba(255,120,150,0.06) inset,
    0 0 24px rgba(255,120,150,0.08)
  `,

        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",

        marginLeft: isMobile ? 0 : -32,
    };

    const sampleInnerStyle = {
        borderRadius: 22,
        padding: isMobile ? "16px" : "22px 24px 22px",

        // ✅ 내부는 “무대 조명” 느낌으로 살짝 밝게
        background:
            "linear-gradient(135deg, rgba(18,18,26,0.72) 0%, rgba(6,6,12,0.92) 60%, rgba(2,2,6,0.96) 100%)",

        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 18px 44px rgba(0,0,0,0.55)",
    };

    const staffWrapStyle = {
        borderRadius: 18,
        padding: 16,
        background: "linear-gradient(0deg, rgba(15,15,24,0.65), rgba(5,5,10,0.85))",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
        marginBottom: 16,
    };

    const staffStyle = {
        height: 90,
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.82)",
        backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 13px, rgba(255,255,255,0.14) 13px, rgba(255,255,255,0.14) 14px)",
        backgroundRepeat: "repeat",
        position: "relative",
        overflow: "hidden",
    };

    return (
        <section style={sectionStyle}>
            {/* -------- 위(모바일)/왼쪽(데스크탑) : 배경 영상 + 텍스트 -------- */}
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
                        <div style={{ maxWidth: isMobile ? "100%" : 520 }}>
                            <p
                                style={{
                                    fontSize: 12,
                                    letterSpacing: "0.22em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.7)",
                                    marginBottom: isMobile ? 12 : 18,
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
                                SEEWAVE turns harmony, rhythm and notation into motion graphics. Learn music
                                through scores, shapes and color instead of talking heads.
                            </p>

                            <div style={btnRowStyle}>
                                <Link to="/start" style={primaryBtn}>
                                    Start watching
                                </Link>
                                <Link to="/courses" style={ghostBtn}>
                                    Browse courses
                                </Link>
                            </div>

                            {!isMobile && (
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                                    No narration overload · Visual-first · New lessons every week
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* -------- 아래(모바일)/오른쪽(데스크탑) : Sample lesson 카드 -------- */}
            <div style={sampleOuterStyle}>
                <p style={{ fontSize: 13, marginBottom: 16, color: "rgba(255,255,255,0.9)" }}>
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
                            gap: 12,
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
