import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { WhyShodh } from "@/components/WhyShodh";
import { Durability } from "@/components/Durability";
import { Installation } from "@/components/Installation";
import { Architecture } from "@/components/Architecture";
import { Demo } from "@/components/Demo";
import { Footer } from "@/components/Footer";

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
      </main>
      <Footer />
    </div>
  );
}
