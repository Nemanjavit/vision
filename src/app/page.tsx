import Hero from "@/components/layout/Hero";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="home-page">
      <header className="header">
        <Navbar />
      </header>
      <main className="main">
        <Hero />
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
