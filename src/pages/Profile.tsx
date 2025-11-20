import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO, generatePageMeta, generatePersonSchema } from "@/lib/seo-config";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  total_points: number;
  created_at: string;
}

interface Activity {
  id: string;
  action_type: string;
  points_change: number;
  description: string | null;
  created_at: string;
  performed_by: string | null;
}

interface ActivityWithPerformer extends Activity {
  performer_name?: string;
}

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activities, setActivities] = useState<ActivityWithPerformer[]>([]);
  const [loading, setLoading] = useState(true);

  // SEO optimization for profile page
  const seoMeta = generatePageMeta({
    ...PAGE_SEO.profile,
    title: profile ? `${profile.full_name || 'Member'} - Profile` : PAGE_SEO.profile.title,
    description: profile 
      ? `View ${profile.full_name || profile.email}'s profile on GENOS Leaderboard. ${profile.total_points} points earned at ENSAM Meknès AI Club.`
      : PAGE_SEO.profile.description,
  });
  
  useSEO({
    ...seoMeta,
    ogType: 'profile',
  });

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        toast.error("Failed to load profile");
        navigate("/dashboard");
        return;
      }

      setProfile(profileData);

      // Fetch activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (activitiesError) {
        console.error("Error fetching activities:", activitiesError);
        toast.error("Failed to load activity history");
      } else if (activitiesData) {
        // Fetch performer names for activities
        const performerIds = activitiesData
          .map(a => a.performed_by)
          .filter(id => id !== null);
        
        const uniquePerformerIds = [...new Set(performerIds)];

        const { data: performersData } = await supabase
          .from("profiles")
          .select("id, full_name, email")
          .in("id", uniquePerformerIds);

        const performersMap = new Map(
          performersData?.map(p => [p.id, p.full_name || p.email]) || []
        );

        const activitiesWithPerformers = activitiesData.map(activity => ({
          ...activity,
          performer_name: activity.performed_by 
            ? performersMap.get(activity.performed_by) 
            : undefined,
        }));

        setActivities(activitiesWithPerformers);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Profile not found</p>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background" role="main">
      {/* Header */}
      <header className="border-b bg-card shadow-sm" role="banner">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-primary">Member Profile</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6">
          {/* Profile Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                  <AvatarImage src={profile.avatar_url || ""} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                    {profile.full_name?.[0] || profile.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2">
                    {profile.full_name || "Member"}
                  </h2>
                  <p className="text-muted-foreground mb-4">{profile.email}</p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                      <Trophy className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Points</p>
                        <p className="text-2xl font-bold text-primary">{profile.total_points}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-semibold">
                          {format(new Date(profile.created_at), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity History Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Points History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No activity history yet
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between rounded-lg border bg-card p-4 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          activity.points_change > 0 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {activity.points_change > 0 ? (
                            <TrendingUp className="h-5 w-5" />
                          ) : (
                            <TrendingDown className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{activity.action_type}</p>
                            <Badge 
                              variant={activity.points_change > 0 ? "default" : "destructive"}
                              className="font-bold"
                            >
                              {activity.points_change > 0 ? '+' : ''}{activity.points_change} pts
                            </Badge>
                          </div>
                          {activity.description && (
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          )}
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(activity.created_at), "MMM d, yyyy 'at' h:mm a")}
                            </p>
                            {activity.performer_name && (
                              <p className="text-xs text-muted-foreground">
                                by {activity.performer_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
