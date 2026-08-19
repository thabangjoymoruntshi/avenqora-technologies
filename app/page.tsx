import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-950 text-white">
       <Hero />
       <Services />
       <Solutions />
       <Projects />
       <About />
       <Contact />
      </main>
      <Footer />
    </>
  );
}