import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Users, Shield, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  total_points: number;
  role?: string;
}

const Admin0 = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Profile[]>([]);
  const [pointsInput, setPointsInput] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .order("total_points", { ascending: false });

    if (profilesData) {
      const profilesWithRoles = await Promise.all(
        profilesData.map(async (profile) => {
          const { data: roleData } = await supabase.rpc("get_user_role", {
            _user_id: profile.id,
          });
          return { ...profile, role: roleData || "member" };
        })
      );
      setMembers(profilesWithRoles);
    }
  };

  const handleUpdatePoints = async (userId: string, change: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const member = members.find((m) => m.id === userId);
    if (!member) return;

    const newTotal = Math.max(0, member.total_points + change);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ total_points: newTotal })
      .eq("id", userId);

    if (updateError) {
      toast.error("Failed to update points");
      return;
    }

    const { error: activityError } = await supabase.from("activities").insert({
      user_id: userId,
      action_type: change > 0 ? "points_added" : "points_removed",
      points_change: change,
      description: `Points ${change > 0 ? "added" : "removed"} by admin`,
      performed_by: user.id,
    });

    if (!activityError) {
      toast.success("Points updated successfully");
      fetchMembers();
      setPointsInput({ ...pointsInput, [userId]: "" });
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (newRole === "admin0") {
      toast.error("Cannot assign admin0 role from interface");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error: deleteError } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId);

    if (deleteError) {
      toast.error("Failed to update role");
      return;
    }

    const { error: insertError } = await supabase.from("user_roles").insert([{
      user_id: userId,
      role: newRole as "admin0" | "admin1" | "admin2" | "member",
      assigned_by: user.id,
    }]);

    if (insertError) {
      toast.error("Failed to update role");
    } else {
      toast.success(`Role updated to ${newRole}`);
      fetchMembers();
    }
  };

  const handleKickMember = async (userId: string) => {
    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) {
      toast.error("Failed to remove member");
    } else {
      toast.success("Member removed successfully");
      fetchMembers();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Binary background animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(10)].map((_, i) => (
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

      <header className="border-b-2 border-primary/30 bg-card/50 backdrop-blur-sm neon-glow relative z-10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20 neon-glow">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-wider">
              <span className="text-primary text-glow">SUPER ADMIN</span> PANEL
            </h1>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm" className="uppercase">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        <Card className="neon-glow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl uppercase tracking-wide">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-primary text-glow">MANAGE ALL MEMBERS</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col gap-4 rounded-lg border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-4 sm:flex-row sm:items-center sm:justify-between neon-glow hover:neon-glow-lg transition-all"
                >
                  <div>
                    <p className="font-bold uppercase text-lg">{member.full_name || "Member"}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{member.email}</p>
                    <p className="mt-1 flex items-center gap-1 text-lg font-bold text-primary text-glow">
                      <TrendingUp className="h-4 w-4" />
                      {member.total_points} POINTS
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Role:</span>
                      <Select
                        value={member.role || "member"}
                        onValueChange={(value) => handleUpdateRole(member.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8 border-primary/30 bg-background/50 text-xs uppercase">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin2">Admin2</SelectItem>
                          <SelectItem value="admin1">Admin1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="±"
                        value={pointsInput[member.id] || ""}
                        onChange={(e) =>
                          setPointsInput({ ...pointsInput, [member.id]: e.target.value })
                        }
                        className="w-24 border-2 border-primary/30 bg-background/50 focus:border-primary uppercase"
                      />
                      <Button
                        onClick={() =>
                          handleUpdatePoints(member.id, parseInt(pointsInput[member.id]) || 0)
                        }
                        variant="outline"
                        size="sm"
                        className="uppercase"
                      >
                        Update
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleKickMember(member.id)}
                      variant="destructive"
                      size="sm"
                      className="uppercase neon-glow"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin0;
