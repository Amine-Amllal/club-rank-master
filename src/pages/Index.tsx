import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Users, TrendingUp, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Binary background animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-neon-violet/20 font-mono text-xs animate-binary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/20 p-8 neon-glow-lg animate-pulse-neon">
              <Trophy className="h-20 w-20 text-primary" />
            </div>
          </div>
          <h1 className="mb-8 text-6xl font-bold text-foreground md:text-7xl uppercase tracking-wider">
            <span className="inline-block bg-primary px-4 py-2 text-glow">WELCOME</span>{" "}
            <span className="text-foreground">TO</span>
            <br />
            <span className="text-primary text-glow">GENOS</span>
          </h1>
          <p className="mb-10 text-xl text-muted-foreground max-w-3xl mx-auto uppercase tracking-wide">
            Enter the <span className="text-primary font-bold">digital arena</span> where members earn points, 
            dominate the leaderboard, and <span className="text-primary font-bold">achieve greatness</span> together.
          </p>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="h-16 px-12 text-lg"
          >
            <span className="text-glow">INITIALIZE ACCESS</span>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 uppercase tracking-wider">
            <span className="bg-primary px-6 py-2 text-glow inline-block">SYSTEM</span>{" "}
            <span className="text-primary text-glow">FEATURES</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-8 text-center neon-glow hover:neon-glow-lg transition-all duration-300 group">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-primary/20 p-6 neon-glow group-hover:neon-glow-lg transition-all">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground uppercase tracking-wide">EARN POINTS</h3>
              <p className="text-muted-foreground uppercase text-sm tracking-wide">
                Participate in activities and accumulate digital credits to showcase your contributions.
              </p>
            </div>

            <div className="rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-8 text-center neon-glow hover:neon-glow-lg transition-all duration-300 group">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-primary/20 p-6 neon-glow group-hover:neon-glow-lg transition-all">
                  <Users className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground uppercase tracking-wide">COMPETE</h3>
              <p className="text-muted-foreground uppercase text-sm tracking-wide">
                Climb the digital leaderboard and compete with other members in the cyber arena.
              </p>
            </div>

            <div className="rounded-xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-8 text-center neon-glow hover:neon-glow-lg transition-all duration-300 group">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-primary/20 p-6 neon-glow group-hover:neon-glow-lg transition-all">
                  <Star className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground uppercase tracking-wide">ACHIEVE</h3>
              <p className="text-muted-foreground uppercase text-sm tracking-wide">
                Track your progress and celebrate milestones as you evolve with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-5xl font-bold uppercase tracking-wider">
            <span className="text-primary text-glow">READY TO</span>{" "}
            <span className="bg-primary px-6 py-2 text-glow inline-block">CONNECT?</span>
          </h2>
          <p className="mb-10 text-xl text-muted-foreground max-w-2xl mx-auto uppercase tracking-wide">
            Sign in with your <span className="text-primary font-bold">@edu.umi.ac.ma</span> email 
            to join the digital collective.
          </p>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="h-16 px-12 text-lg"
          >
            <span className="text-glow">AUTHENTICATE NOW</span>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-primary/30 bg-card/30 backdrop-blur-sm py-8 px-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground uppercase tracking-wider">
          <p>&copy; 2025 GENOS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
