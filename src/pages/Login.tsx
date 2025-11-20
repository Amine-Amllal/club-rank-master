import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO, generatePageMeta } from "@/lib/seo-config";

const Login = () => {
  const navigate = useNavigate();

  // SEO optimization for login page
  const seoMeta = generatePageMeta(PAGE_SEO.login);
  useSEO({
    ...seoMeta,
    ogType: 'website',
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .order("role", { ascending: true })
          .limit(1)
          .single();

        redirectBasedOnRole(roleData?.role);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setTimeout(async () => {
            const { data: roleData } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .order("role", { ascending: true })
              .limit(1)
              .single();

            redirectBasedOnRole(roleData?.role);
          }, 0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const redirectBasedOnRole = (role: string | undefined) => {
    switch (role) {
      case "admin0":
        navigate("/admin0");
        break;
      case "admin1":
        navigate("/admin1");
        break;
      case "admin2":
        navigate("/admin2");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const redirectUrl = `${window.location.origin}/login`;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          hd: "edu.umi.ac.ma",
        },
      },
    });

    if (error) {
      toast.error("Authentication failed. Please ensure you're using a @edu.umi.ac.ma email address.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden" role="main">
      {/* Binary background animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
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

      <div className="w-full max-w-md space-y-8 rounded-2xl border-2 border-primary/50 bg-card/60 backdrop-blur-md p-10 neon-glow-lg relative z-10">
        <div className="text-center">
          <div className="mb-6 flex justify-center" aria-hidden="true">
            <div className="rounded-full bg-primary/20 p-6 neon-glow animate-pulse-neon">
              <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-4">
            <span className="bg-primary px-4 py-2 text-glow inline-block">ACCESS</span>
          </h1>
          <h2 className="text-3xl font-bold text-primary text-glow uppercase tracking-wider mb-3">
            CONTROL
          </h2>
          <p className="mt-4 text-muted-foreground uppercase text-sm tracking-wide">
            Sign in to access GENOS
          </p>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleGoogleLogin}
            className="w-full h-14 text-lg"
            size="lg"
          >
            <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-glow">CONNECT WITH GOOGLE</span>
          </Button>

          <p className="mt-6 text-center text-xs text-muted-foreground uppercase tracking-wider border-t-2 border-primary/20 pt-4">
            Only <span className="text-primary font-bold">@edu.umi.ac.ma</span> email addresses permitted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
