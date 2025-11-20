import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Create magical particles for background effect
function createParticles() {
  // Detect if device is mobile
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 50 : 200; // Fewer particles on mobile for performance

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'magical-particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animation = `float ${5 + Math.random() * 10}s infinite`;
    document.body.appendChild(particle);
  }
}

createParticles();

createRoot(document.getElementById("root")!).render(<App />);
