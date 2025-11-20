import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Trophy, Search, ArrowLeft, Medal } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PAGE_SEO, generatePageMeta, generateBreadcrumbs } from "@/lib/seo-config";

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

const Leaderboard = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<LeaderboardEntry[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // SEO optimization for leaderboard page
  const seoMeta = generatePageMeta(PAGE_SEO.leaderboard);
  useSEO({
    ...seoMeta,
    ogType: 'website',
  });

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = members.filter(
        (member) =>
          member.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchQuery, members]);

  const fetchLeaderboard = async () => {
    const { data } = await supabase
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

    if (data) {
      // Transform data to match expected structure
      const memberData = data
        .filter(item => item.profiles !== null)
        .map(item => ({
          id: item.profiles.id,
          email: item.profiles.email,
          full_name: item.profiles.full_name,
          avatar_url: item.profiles.avatar_url,
          total_points: item.profiles.total_points,
        }))
        .sort((a, b) => b.total_points - a.total_points); // Sort by points descending

      const rankedData = memberData.map((member, index) => ({
        ...member,
        rank: index + 1,
      }));
      setMembers(rankedData);
      setFilteredMembers(rankedData);
    }
  };

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background" role="main">
      {/* Header */}
      <header className="border-b bg-card shadow-sm" role="banner">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              size="sm"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-primary">Leaderboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-accent" aria-hidden="true" />
              GENOS Rankings - AI Club ENSAM Meknès
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Compete with fellow AI enthusiasts and track your progress in the GENOS community
            </p>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  placeholder="Search members by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  aria-label="Search members"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredMembers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No members found</p>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer"
                    onClick={() => navigate(`/profile/${member.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {member.rank <= 3 ? (
                          <Medal className={`h-8 w-8 ${getMedalColor(member.rank)}`} />
                        ) : (
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-bold text-foreground">
                            {member.rank}
                          </span>
                        )}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar_url || ""} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {member.full_name?.[0] || member.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">
                          {member.full_name || "Member"}
                        </p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{member.total_points}</p>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
