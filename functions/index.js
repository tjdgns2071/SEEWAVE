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
exports.stripeWebhook = onRequest(
    {
        secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET],
        cors: false,
        bodyParser: false, // ⭐ 핵심
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
            logger.error("❌ Webhook signature verification failed", err);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            await db
                .collection("subscriptions")
                .doc(session.customer_email)
                .set({
                    email: session.customer_email,
                    subscriptionId: session.subscription,
                    status: "active",
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });
        }

        res.json({ received: true });
    }
);
