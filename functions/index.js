/**
 * Firebase Functions (v2) + Stripe Checkout
 */

const { setGlobalOptions } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
const Stripe = require("stripe");

// 🔹 글로벌 옵션
setGlobalOptions({ maxInstances: 10 });

// 🔹 Firebase Admin 초기화
admin.initializeApp();

// 🔹 Stripe Secret (신형 방식)
const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");

// 🔹 Callable Function
exports.createCheckoutSession = onCall(
    { secrets: [STRIPE_SECRET_KEY] },
    async (request) => {
        const { auth, data } = request;

        if (!auth) {
            throw new Error("Not authenticated");
        }

        const { lookupKey } = data;
        if (!lookupKey) {
            throw new Error("lookupKey is required");
        }

        // ✅ Stripe 인스턴스 생성 (여기서 secret 사용)
        const stripe = new Stripe(STRIPE_SECRET_KEY.value());

        // 🔹 lookup_key로 price 찾기
        const prices = await stripe.prices.list({
            lookup_keys: [lookupKey],
            expand: ["data.product"],
        });

        if (!prices.data.length) {
            throw new Error("Price not found");
        }

        // 🔹 Checkout Session 생성
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: auth.token.email,
            line_items: [
                {
                    price: prices.data[0].id,
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:5173/start",
            cancel_url: "http://localhost:5173/pricing",
        });

        return {
            url: session.url,
        };
    }
);
