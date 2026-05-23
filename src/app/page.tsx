import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ChatBot from "@/components/ChatBot";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
      </main>
      <Footer />
      <FloatingContact />
      <ChatBot />
    </>
  );
}