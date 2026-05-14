import NavBar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "radial-gradient(circle at top, #111118, #020206)",
                color: "#f5f5f5",
                overflowX: "hidden",
            }}
        >
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}
