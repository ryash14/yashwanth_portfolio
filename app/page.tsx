import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BentoHighlights from "@/components/BentoHighlights";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import EducationSection from "@/components/EducationSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import PageLoader from "@/components/PageLoader";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Nav />
      <AIChat />
      <SectionNav />
      <CommandPalette />
      <main>
        <Hero />
        <About />
        <BentoHighlights />
        <Experience />
        <Projects />
        <Skills />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
