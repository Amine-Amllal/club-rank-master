import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Users, Shield, TrendingUp, Search, X } from "lucide-react";
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
  const [filteredMembers, setFilteredMembers] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pointsInput, setPointsInput] = useState<{ [key: string]: string }>({});
  const [testNameInput, setTestNameInput] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchMembers();
  }, []);

  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMembers(members);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = members.filter(
        (member) =>
          member.full_name?.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query) ||
          member.role?.toLowerCase().includes(query)
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, members]);

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
      setFilteredMembers(profilesWithRoles);
    }
  };

  const handleUpdatePoints = async (userId: string, change: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const member = members.find((m) => m.id === userId);
    if (!member) return;

    
    const testName = testNameInput[userId]?.trim();
    if (!testName) {
      toast.error("Veuillez entrer le nom du test avant de mettre à jour les points");
      return;
    }

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
      description: `${change > 0 ? "Points ajoutés" : "Points retirés"} pour: ${testName}`,
      performed_by: user.id,
    });

    if (!activityError) {
      toast.success(`Points mis à jour pour "${testName}"`);
      fetchMembers();
      setPointsInput({ ...pointsInput, [userId]: "" });
      setTestNameInput({ ...testNameInput, [userId]: "" });
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
    const member = members.find(m => m.id === userId);
    const memberName = member?.full_name || member?.email || "ce membre";

    if (!confirm(`Voulez-vous vraiment supprimer ${memberName} ?\n\nCette action est IRRÉVERSIBLE.`)) {
      return;
    }

    const { data, error } = await supabase.rpc('delete_user_as_admin', {
      target_user_id: userId
    });

    if (error) {
      console.error("Error removing member:", error);
      toast.error(`Failed to remove member: ${error.message}`);
    } else {
      toast.success("Member removed successfully");
      fetchMembers();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      
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
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/dashboard")} variant="outline" size="sm" className="uppercase">
              <Users className="mr-2 h-4 w-4" />
              Member View
            </Button>
            <Button onClick={handleSignOut} variant="outline" size="sm" className="uppercase">
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        <Card className="neon-glow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl uppercase tracking-wide">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-primary text-glow">MANAGE ALL MEMBERS</span>
            </CardTitle>
            
            {/* Barre de recherche */}
            <div className="mt-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom, email ou rôle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-3 w-full border-2 border-primary/30 bg-background/50 focus:border-primary text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {filteredMembers.length} membre{filteredMembers.length > 1 ? "s" : ""} trouvé{filteredMembers.length > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Aucun membre trouvé pour "{searchQuery}"</p>
                  <Button onClick={clearSearch} variant="ghost" className="mt-2">
                    Effacer la recherche
                  </Button>
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col gap-4 rounded-lg border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-4 neon-glow hover:neon-glow-lg transition-all"
                  >
                   
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

                      {/* Bouton Remove */}
                      <Button
                        onClick={() => handleKickMember(member.id)}
                        variant="destructive"
                        size="sm"
                        className="uppercase neon-glow self-start sm:self-center"
                      >
                        Remove
                      </Button>
                    </div>

                    
                    <div className="border-t border-primary/20 pt-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                        Mise à jour des points
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          type="text"
                          placeholder="Nom du test "
                          value={testNameInput[member.id] || ""}
                          onChange={(e) =>
                            setTestNameInput({ ...testNameInput, [member.id]: e.target.value })
                          }
                          className="flex-1 border-2 border-primary/30 bg-background/50 focus:border-primary"
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="± pts"
                            value={pointsInput[member.id] || ""}
                            onChange={(e) =>
                              setPointsInput({ ...pointsInput, [member.id]: e.target.value })
                            }
                            className="w-30 border-2 border-primary/30 bg-background/50 focus:border-primary"
                          />
                          <Button
                            onClick={() =>
                              handleUpdatePoints(member.id, parseInt(pointsInput[member.id]) || 0)
                            }
                            variant="outline"
                            size="default"
                            className="uppercase whitespace-nowrap bg-lime-800"
                          >
                            Update
                          </Button>
                        </div>
                      </div>
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

export default Admin0;