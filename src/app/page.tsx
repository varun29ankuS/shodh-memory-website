import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Architecture } from "@/components/Architecture";
import { Footer } from "@/components/Footer";

// Below-fold client components — defer JS hydration, still SSR the HTML
const WhyShodh = dynamic(() => import("@/components/WhyShodh").then(m => ({ default: m.WhyShodh })), { ssr: true });
const Durability = dynamic(() => import("@/components/Durability").then(m => ({ default: m.Durability })), { ssr: true });
const Installation = dynamic(() => import("@/components/Installation").then(m => ({ default: m.Installation })), { ssr: true });
const Demo = dynamic(() => import("@/components/Demo").then(m => ({ default: m.Demo })), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyShodh />
        <Durability />
        <Architecture />
        <Installation />
        <Demo />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
