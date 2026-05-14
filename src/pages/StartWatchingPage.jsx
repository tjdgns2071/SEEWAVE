import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Layout from "../components/Layout";

export default function StartWatchingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login?redirect=/start", { replace: true });
                return;
            }

            // ✅ 로그인 됐으면 코스 선택 화면으로 이동
            navigate("/courses", { replace: true });
        });

        return () => unsub();
    }, [navigate]);

    return (
        <Layout>
            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    opacity: 0.85,
                }}
            >
                Loading…
            </div>
        </Layout>
    );
}
