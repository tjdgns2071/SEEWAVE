import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryRow from "./components/Category";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import visualTheoryImg from "./assets/visual-theory.png";
import rhythmImg from "./assets/rhythm-in-motion.png";
import harmonyImg from "./assets/harmony-flow.png";
import pianoImg from "./assets/piano-roll-lab.png";
import compositionImg from "./assets/composition.png";
import melodyImg from "./assets/melody-lines.png";

/* -------------------------------------------------------------------------- */
/*                                🎨 Shared UI                                */
/* -------------------------------------------------------------------------- */

const Layout = ({ children }) => (
  <div
    style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #111118, #020206)",
      color: "#f5f5f5",
      fontFamily: "-apple-system, system-ui, BlinkMacSystemFont, sans-serif",
    }}
  >
    <NavBar />
    {children}
    <Footer />
  </div>
);

const PageContainer = ({ children, maxWidth = 1120 }) => (
  <main style={{ maxWidth, margin: "80px auto 0", padding: "0 40px" }}>
    {children}
  </main>
);

const SectionHeader = ({ title, description, titleSize = 36 }) => (
  <div style={{ marginBottom: 28 }}>
    <h1 style={{ fontSize: titleSize, marginBottom: 10 }}>{title}</h1>
    {description && (
      <p style={{ fontSize: 16, opacity: 0.8 }}>{description}</p>
    )}
  </div>
);

const FilterButton = ({ label, isActive, onClick, activeColor = "rgba(255,100,120,0.9)" }) => (
  <button
    onClick={onClick}
    style={{
      padding: "6px 14px",
      borderRadius: 999,
      fontSize: 12,
      border: isActive ? `1px solid ${activeColor}` : "1px solid rgba(255,255,255,0.18)",
      background: isActive ? activeColor.replace("0.9", "0.18") : "transparent",
      color: "#f5f5f5",
      cursor: "pointer",
    }}
  >
    {label}
  </button>
);

/* -------------------------------------------------------------------------- */
/*                                 🏠 Pages                                   */
/* -------------------------------------------------------------------------- */

function HomePage() {
  return (
    <Layout>
      <Hero />
      <CategoryRow title="Browse by Category" items={HOME_CATEGORIES} />
      <FeaturedLectures />
      <Pricing />
      <FAQ />
    </Layout>
  );
}

function FeaturedLectures() {
  return (
    <section style={{ padding: "24px 40px" }}>
      <h2 style={{ fontSize: 18, marginBottom: 10 }}>Featured Motion Lectures</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {FEATURED_ITEMS.map((text, i) => (
          <div
            key={i}
            style={{
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              padding: 14,
              background: "rgba(16,16,24,0.9)",
              fontSize: 13,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}

function StartWatchingPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredLessons =
    selectedFilter === "All"
      ? LESSONS
      : LESSONS.filter((lesson) => lesson.level === selectedFilter);

  return (
    <Layout>
      <PageContainer>
        <SectionHeader
          title="Start watching"
          titleSize={40}
          description="Here’s where your visual music lessons will live. Pick a series and start watching, or filter by level when your library grows."
        />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {LESSON_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 12,
                border: "1px solid",
                borderColor: selectedFilter === filter ? "rgba(255,100,120,0.9)" : "rgba(255,255,255,0.18)",
                background: selectedFilter === filter ? "rgba(255,100,120,0.18)" : "transparent",
                color: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
}

const LessonCard = ({ lesson }) => (
  <div
    style={{
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.08)",
      background: "linear-gradient(135deg, rgba(16,16,28,0.96), rgba(12,12,20,0.96))",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
      <img src={lesson.image} alt={lesson.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 11, opacity: 0.7 }}>
        <span>{lesson.category}</span>
        <span>{lesson.length}</span>
      </div>
      <h3 style={{ fontSize: 15, marginBottom: 6 }}>{lesson.title}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, opacity: 0.8 }}>
        <span>{lesson.level}</span>
        <span style={{ padding: "3px 8px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.22)" }}>
          {lesson.tag}
        </span>
      </div>
    </div>
  </div>
);

function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses =
    selectedCategory === "All"
      ? COURSES
      : COURSES.filter((course) => course.category === selectedCategory);

  return (
    <Layout>
      <PageContainer>
        <SectionHeader
          title="Courses"
          description="Full SEEWAVE course library. Browse all visual music theory series."
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 12,
                cursor: "pointer",
                border: "1px solid",
                borderColor: selectedCategory === cat ? "rgba(255,120,140,0.9)" : "rgba(255,255,255,0.2)",
                background: selectedCategory === cat ? "rgba(255,120,140,0.15)" : "transparent",
                color: "#f5f5f5",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              style={{
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(10,10,18,0.96)",
                padding: 18,
                transition: "0.25s",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>{course.category}</div>
              <h3 style={{ fontSize: 16, marginBottom: 10 }}>{course.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.8 }}>
                <span>{course.level}</span>
                <span>{course.length}</span>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
}

function PricingPage() {
  return (
    <Layout>
      <PageContainer>
        <SectionHeader
          title="Pricing"
          description="Simple pricing for every type of visual learner."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={i} plan={plan} />
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
}

const PricingCard = ({ plan }) => (
  <div
    style={{
      borderRadius: 24,
      padding: 24,
      background: plan.highlight
        ? "linear-gradient(135deg, rgba(255,90,120,0.25), rgba(20,10,20,0.95))"
        : "rgba(10,10,18,0.96)",
      border: plan.highlight
        ? "1px solid rgba(255,90,120,0.9)"
        : "1px solid rgba(255,255,255,0.08)",
      boxShadow: plan.highlight ? "0 0 40px rgba(255,90,120,0.25)" : "none",
    }}
  >
    <h3 style={{ fontSize: 18, marginBottom: 6 }}>{plan.name}</h3>
    <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>{plan.price}</div>
    <p style={{ fontSize: 13, opacity: 0.75, marginBottom: 18 }}>{plan.desc}</p>
    <ul style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.8 }}>
      {plan.features.map((f, idx) => (
        <li key={idx}>✓ {f}</li>
      ))}
    </ul>
    <button
      style={{
        marginTop: 18,
        width: "100%",
        padding: "10px 0",
        borderRadius: 999,
        border: "none",
        background: plan.highlight
          ? "linear-gradient(90deg, #ff5a78, #ff7a9c)"
          : "rgba(255,255,255,0.12)",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      {plan.highlight ? "Start free trial" : "Select plan"}
    </button>
  </div>
);

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Layout>
      <PageContainer maxWidth={960}>
        <SectionHeader
          title="FAQ"
          description="Frequently asked questions about SEEWAVE."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
}

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div
    style={{
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.1)",
      background: "rgba(10,10,18,0.96)",
      overflow: "hidden",
    }}
  >
    <div
      onClick={onToggle}
      style={{
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 15,
      }}
    >
      <span>{item.q}</span>
      <span style={{ opacity: 0.7 }}>{isOpen ? "−" : "+"}</span>
    </div>
    {isOpen && (
      <div style={{ padding: "0 18px 18px", fontSize: 13, opacity: 0.85, lineHeight: 1.7 }}>
        {item.a}
      </div>
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                🔗 Routing                                  */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/start" element={<StartWatchingPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/faq" element={<FaqPage />} />
    </Routes>
  );
}

/* -------------------------------------------------------------------------- */
/*                             💾 Static Data                                 */
/* -------------------------------------------------------------------------- */

const HOME_CATEGORIES = [
  { title: "Visual Theory", image: visualTheoryImg },
  { title: "Rhythm in Motion", image: rhythmImg },
  { title: "Harmony Flow", image: harmonyImg },
  { title: "Piano Roll Lab", image: pianoImg },
  { title: "Composition", image: compositionImg },
  { title: "Melody Lines", image: melodyImg },
];

const FEATURED_ITEMS = [
  "The Shape of Jazz · See how 7th chords move",
  "Polyrhythm Visualized · 3 against 4 in motion",
  "Bach's Counterpoint · Follow the weaving lines",
];

const LESSON_FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

const LESSONS = [
  { id: 1, title: "Harmony Flow · Moving chords", level: "Intermediate", category: "Harmony", length: "12 min", image: harmonyImg, tag: "Chord motion" },
  { id: 2, title: "Rhythm in Motion · Off–beat accents", level: "Beginner", category: "Rhythm", length: "9 min", image: rhythmImg, tag: "Groove basics" },
  { id: 3, title: "Visual Theory · Shapes of melody", level: "Beginner", category: "Visual Theory", length: "11 min", image: visualTheoryImg, tag: "Pitch & shape" },
  { id: 4, title: "Melody Lines · Contour & phrasing", level: "Intermediate", category: "Melody", length: "14 min", image: melodyImg, tag: "Melodic flow" },
  { id: 5, title: "Piano Roll Lab · Voice leading", level: "Advanced", category: "Piano Roll", length: "16 min", image: pianoImg, tag: "Voice leading" },
  { id: 6, title: "Composition · Musical form", level: "Advanced", category: "Composition", length: "15 min", image: compositionImg, tag: "Form design" },
];

const COURSE_CATEGORIES = ["All", "Visual Theory", "Harmony", "Rhythm", "Melody", "Piano Roll", "Composition"];

const COURSES = [
  { id: 1, title: "Visual Theory · Foundations", category: "Visual Theory", level: "Beginner", length: "42 min" },
  { id: 2, title: "Harmony Flow · Chord Motion", category: "Harmony", level: "Intermediate", length: "55 min" },
  { id: 3, title: "Rhythm in Motion · Groove Building", category: "Rhythm", level: "Beginner", length: "38 min" },
  { id: 4, title: "Melody Lines · Contour & Phrasing", category: "Melody", level: "Intermediate", length: "47 min" },
  { id: 5, title: "Piano Roll Lab · Voice Leading", category: "Piano Roll", level: "Advanced", length: "61 min" },
  { id: 6, title: "Composition · Musical Form", category: "Composition", level: "Advanced", length: "58 min" },
];

const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    desc: "Try SEEWAVE with limited access.",
    features: ["Access to sample lessons", "Basic visual theory modules", "Community preview access"],
  },
  {
    name: "Creator",
    price: "$19 / month",
    desc: "Full access for learners & creators.",
    features: ["Unlimited access to all lessons", "New visual series every month", "Downloadable practice stems", "Progress tracking"],
    highlight: true,
  },
  {
    name: "Studio",
    price: "$39 / month",
    desc: "For professional creators & teams.",
    features: ["Everything in Creator", "Team workspace", "Advanced analytics", "Early access to new tools"],
  },
];

const FAQ_ITEMS = [
  { q: "What is SEEWAVE?", a: "SEEWAVE is a visual-based music theory learning platform designed for composers, producers, and visual learners." },
  { q: "Do I need music theory knowledge to start?", a: "No. SEEWAVE is designed for complete beginners as well as advanced learners." },
  { q: "Can I cancel my subscription anytime?", a: "Yes. You can cancel your subscription anytime from your account settings." },
  { q: "What devices are supported?", a: "SEEWAVE works on desktop, tablet, and mobile browsers." },
  { q: "Will new courses be added?", a: "Yes. New visual music theory series are added every month." },
];
