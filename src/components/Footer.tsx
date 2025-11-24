import { Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-2 border-primary/30 bg-card/30 backdrop-blur-sm py-8 px-6" role="contentinfo">
      <div className="container mx-auto text-center">
        {/* Social Media Links */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <a
            href="https://www.instagram.com/ai.club.am/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary/20 p-4 neon-glow hover:neon-glow-lg transition-all duration-300 group"
            aria-label="Visit our Instagram page"
          >
            <Instagram className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.linkedin.com/company/genos-ai-club-ensam-meknes/people/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary/20 p-4 neon-glow hover:neon-glow-lg transition-all duration-300 group"
            aria-label="Visit our LinkedIn page"
          >
            <Linkedin className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://github.com/genos-ai-club-ensam-meknes"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary/20 p-4 neon-glow hover:neon-glow-lg transition-all duration-300 group"
            aria-label="Visit our GitHub page"
          >
            <Github className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          <p>&copy; 2025 GENOS - AI Club ENSAM Meknès. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 text-xs">
            Gamified leaderboard platform for AI enthusiasts and engineering students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
