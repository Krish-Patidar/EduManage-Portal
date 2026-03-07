import Navbar         from "../components/Navbar";
import Hero           from "../components/Hero";
import About          from "../components/About";
import CoursesSection from "../components/Coursessection";
import Placement      from "../components/Placement";
import Testimonials   from "../components/Testimonials";
import Contact        from "../components/Contact";
import Footer         from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CoursesSection />
        <Placement />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}