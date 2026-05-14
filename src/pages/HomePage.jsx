import Hero from "../components/Hero";
import CategoryRow from "../components/Category";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

import visualTheoryImg from "../assets/visual-theory.png";
import rhythmImg from "../assets/rhythm-in-motion.png";
import harmonyImg from "../assets/harmony-flow.png";
import pianoImg from "../assets/piano-roll-lab.png";
import compositionImg from "../assets/composition.png";
import melodyImg from "../assets/melody-lines.png";

export default function HomePage() {
    return (
        <>
            <section id="hero">
                <Hero />
            </section>

            <section id="courses">
                <CategoryRow title="Browse by Category" items={HOME_CATEGORIES} />
            </section>

            <section id="pricing">
                <Pricing />
            </section>

            <section id="faq">
                <FAQ />
            </section>
        </>
    );
}

const HOME_CATEGORIES = [
    { title: "Visual Theory", image: visualTheoryImg, slug: "visual-theory" },
    { title: "Rhythm in Motion", image: rhythmImg, slug: "rhythm-in-motion" },
    { title: "Harmony Flow", image: harmonyImg, slug: "harmony-flow" },
    { title: "Piano Roll Lab", image: pianoImg, slug: "piano-roll-lab" },
    { title: "Composition", image: compositionImg, slug: "composition" },
    { title: "Melody Lines", image: melodyImg, slug: "melody-lines" },
];
