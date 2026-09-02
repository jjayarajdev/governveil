import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, Footer } from "./components/shared";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Features from "./pages/Features";
import Security from "./pages/Security";
import Pricing from "./pages/Pricing";
import Compare from "./pages/Compare";
import Benchmark from "./pages/Benchmark";
import Pilot from "./pages/Pilot";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full flex flex-col bg-white">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/features" element={<Features />} />
            <Route path="/security" element={<Security />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/benchmark" element={<Benchmark />} />
            <Route path="/pilot" element={<Pilot />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
