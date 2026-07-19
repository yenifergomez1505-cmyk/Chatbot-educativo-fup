import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Cta } from "@/components/landing/Cta";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Materias } from "@/components/landing/Materias";
import { Navbar } from "@/components/landing/Navbar";
import { Stats } from "@/components/landing/Stats";

export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Materias />
      <ComoFunciona />
      <Cta />
      <Footer />
    </div>
  );
}
