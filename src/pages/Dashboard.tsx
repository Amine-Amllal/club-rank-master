import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, TrendingUp, LogOut, Crown, Medal, Award, Settings } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  total_points: number;
}

interface LeaderboardEntry extends Profile {
  rank: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [topMembers, setTopMembers] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<Database["public"]["Enums"]["app_role"] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }

    
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);

    // Fetch user role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleData) {
      setUserRole(roleData.role);
    }

    
    const { data: leaderboardData } = await supabase
      .from("user_roles")
      .select(`
        user_id,
        role,
        profiles!user_roles_user_id_fkey (
          id,
          email,
          full_name,
          avatar_url,
          total_points
        )
      `)
      .eq("role", "member");

    // Transform data to match expected structure
    const memberData = leaderboardData?.filter(item => item.profiles !== null)
      .map(item => ({
        id: item.profiles.id,
        email: item.profiles.email,
        full_name: item.profiles.full_name,
        avatar_url: item.profiles.avatar_url,
        total_points: item.profiles.total_points,
      }))
      .sort((a, b) => b.total_points - a.total_points)
      .slice(0, 5);

    if (memberData) {
      const rankedData = memberData.map((member, index) => ({
        ...member,
        rank: index + 1,
      }));
      setTopMembers(rankedData);
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const handleAdminPanel = () => {
    if (userRole === "admin0") {
      navigate("/admin0");
    } else if (userRole === "admin1") {
      navigate("/admin1");
    } else if (userRole === "admin2") {
      navigate("/admin2");
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch(rank) {
      case 1: return "h-40";
      case 2: return "h-32";
      case 3: return "h-24";
      default: return "h-20";
    }
  };

  const getPodiumIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Crown className="h-8 w-8 text-yellow-400" />;
      case 2: return <Medal className="h-7 w-7 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return null;
    }
  };

  const getPodiumColor = (rank: number) => {
    switch(rank) {
      case 1: return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/50";
      case 2: return "from-gray-400/20 to-gray-500/20 border-gray-400/50";
      case 3: return "from-amber-600/20 to-amber-700/20 border-amber-600/50";
      default: return "from-secondary to-secondary/50";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const top3 = topMembers.slice(0, 3);
 
  const podiumOrder = top3.length >= 2 ? [top3[1], top3[0], top3[2]].filter(Boolean) : top3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">GENOS Dashboard</h1>
          <div className="flex items-center gap-3">
            {userRole && ["admin0", "admin1", "admin2"].includes(userRole) && (
              <Button onClick={handleAdminPanel} variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Admin Panel
              </Button>
            )}
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6">
          
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Trophy className="h-6 w-6 text-accent" />
                Podium des Champions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {top3.length > 0 ? (
                <div className="flex items-end justify-center gap-4">
                  {podiumOrder.map((member) => {
                    if (!member) return null;
                    const actualRank = member.rank;
                    return (
                      <div
                        key={member.id}
                        className="flex flex-col items-center gap-3 animate-in fade-in-50 zoom-in-95 duration-500 cursor-pointer"
                        style={{ animationDelay: `${actualRank * 150}ms` }}
                        onClick={() => navigate(`/profile/${member.id}`)}
                      >
                       
                        <div className="mb-2">
                          {getPodiumIcon(actualRank)}
                        </div>
                        
                       
                        <Avatar className={`${actualRank === 1 ? 'h-24 w-24 ring-4 ring-yellow-400' : actualRank === 2 ? 'h-20 w-20 ring-4 ring-gray-400' : 'h-16 w-16 ring-4 ring-amber-600'} ring-offset-2 ring-offset-background transition-transform hover:scale-110`}>
                          <AvatarImage src={member.avatar_url || ""} />
                          <AvatarFallback className={`${actualRank === 1 ? 'bg-yellow-500 text-white text-3xl' : actualRank === 2 ? 'bg-gray-400 text-white text-2xl' : 'bg-amber-600 text-white text-xl'} font-bold`}>
                            {member.full_name?.[0] || member.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        
                        <div className="text-center mb-2">
                          <p className={`font-bold ${actualRank === 1 ? 'text-lg' : 'text-base'} truncate max-w-[120px]`}>
                            {member.full_name || member.email.split('@')[0]}
                          </p>
                          <p className={`font-bold ${actualRank === 1 ? 'text-yellow-500 text-xl' : actualRank === 2 ? 'text-gray-400 text-lg' : 'text-amber-600'}`}>
                            {member.total_points} pts
                          </p>
                        </div>

                        
                        <div className={`${getPodiumHeight(actualRank)} w-32 bg-gradient-to-b ${getPodiumColor(actualRank)} rounded-t-lg border-2 flex items-center justify-center transition-all hover:brightness-110`}>
                          <span className={`text-5xl font-black ${actualRank === 1 ? 'text-yellow-400' : actualRank === 2 ? 'text-gray-300' : 'text-amber-500'} opacity-30`}>
                            {actualRank}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun membre dans le classement pour le moment
                </div>
              )}
            </CardContent>
          </Card>

        
          <div className="grid gap-6 md:grid-cols-2">
           
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {profile?.full_name?.[0] || profile?.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{profile?.full_name || "Member"}</h3>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-accent" />
                      <span className="text-2xl font-bold text-primary">
                        {profile?.total_points} points
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-accent" />
                    Top Members
                  </span>
                  <Button
                    onClick={() => navigate("/leaderboard")}
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent/90"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 transition-all hover:bg-secondary/70 cursor-pointer"
                      onClick={() => navigate(`/profile/${member.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                          member.rank === 1 ? 'bg-yellow-500 text-white' : 
                          member.rank === 2 ? 'bg-gray-400 text-white' : 
                          member.rank === 3 ? 'bg-amber-600 text-white' : 
                          'bg-primary text-primary-foreground'
                        }`}>
                          {member.rank}
                        </span>
                        <Avatar>
                          <AvatarImage src={member.avatar_url || ""} />
                          <AvatarFallback>
                            {member.full_name?.[0] || member.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.full_name || member.email}</span>
                      </div>
                      <span className="font-bold text-accent">{member.total_points} pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
