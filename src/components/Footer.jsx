import React from "react";

export default function Footer() {
    return (
        <footer
            style={{
                padding: "18px 40px 28px",
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <span>© {new Date().getFullYear()} SEEWAVE</span>
            <span>Visual music learning platform</span>
        </footer>
    );
}
