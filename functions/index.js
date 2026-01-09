/**
 * SEEWAVE – Stripe + Firebase Functions (2nd gen)
 * - createCheckoutSession
 * - stripeWebhook
 */

const { onCall, onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const Stripe = require("stripe");
const logger = require("firebase-functions/logger");

setGlobalOptions({ region: "us-central1", maxInstances: 10 });

// 🔐 Secrets
const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

admin.initializeApp();
const db = admin.firestore();

/* ------------------------------------------------------------------ */
/* 1️⃣ Checkout Session 생성 (프론트에서 호출) */
/* ------------------------------------------------------------------ */
exports.createCheckoutSession = onCall(
    { secrets: [STRIPE_SECRET_KEY] },
    async (request) => {
        const { auth, data } = request;
        if (!auth) throw new Error("Not authenticated");

        const stripe = new Stripe(STRIPE_SECRET_KEY.value());
        const { lookupKey } = data;

        const prices = await stripe.prices.list({
            lookup_keys: [lookupKey],
            expand: ["data.product"],
        });

        if (!prices.data.length) {
            throw new Error("Price not found");
        }

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

        return { url: session.url };
    }
);

/* ------------------------------------------------------------------ */
/* 2️⃣ Stripe Webhook (결제 성공 → 구독 저장) */
/* ------------------------------------------------------------------ */
exports.stripeWebhook = onRequest(
    {
        secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET],
    },
    async (req, res) => {
        const stripe = new Stripe(STRIPE_SECRET_KEY.value());

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                req.headers["stripe-signature"],
                STRIPE_WEBHOOK_SECRET.value()
            );
        } catch (err) {
            logger.error("Webhook signature verification failed", err);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // ✅ 결제 완료 이벤트만 처리
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const email = session.customer_email;
            const subscriptionId = session.subscription;

            // Firestore 저장
            await db.collection("subscriptions").doc(email).set(
                {
                    email,
                    subscriptionId,
                    status: "active",
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
            );
        }

        res.json({ received: true });
    }
);
