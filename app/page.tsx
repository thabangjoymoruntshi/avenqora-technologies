import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Trust from "@/components/Trust";


const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Avenqora",
  alternateName: "Avenqora Technologies",
  url: "https://avenqoratechnologies.co.za/",
};
export default function Home() {
  return (
    <>

    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(websiteStructuredData),
  }}
/>
      <Header />

      <main className="min-h-screen bg-slate-950 text-white">
       <Hero />
       <Services />
       <Solutions />
       <Projects />
       <Process />
       <About />
       <Trust />
       <FAQ />
       <Contact />
      </main>
      <Footer />
    </>
  );
}