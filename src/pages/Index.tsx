import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Users, TrendingUp, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent py-24 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-accent/20 p-6">
              <Trophy className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-primary-foreground md:text-6xl">
            Welcome to Our Club
          </h1>
          <p className="mb-8 text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join our gamified community where members earn points, climb the leaderboard, 
            and achieve greatness together.
          </p>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-lg shadow-lg"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Why Join Our Club?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-accent/10 p-4">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">Earn Points</h3>
              <p className="text-muted-foreground">
                Participate in activities and earn points to showcase your contributions.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-accent/10 p-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">Compete</h3>
              <p className="text-muted-foreground">
                Climb the leaderboard and compete with other members in a friendly environment.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-8 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-accent/10 p-4">
                  <Star className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">Achieve</h3>
              <p className="text-muted-foreground">
                Track your progress and celebrate milestones as you grow with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-primary">Ready to Get Started?</h2>
          <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
            Sign in with your @edu.umi.ac.ma email to join our thriving community.
          </p>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg"
          >
            Sign In Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Club Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
