import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogOut, Users, Settings, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  total_points: number;
}

const Admin2 = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Profile[]>([]);
  const [pointsInput, setPointsInput] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("total_points", { ascending: false });

    if (data) {
      setMembers(data);
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
      description: `Points ${change > 0 ? "added" : "removed"} by assistant`,
      performed_by: user.id,
    });

    if (!activityError) {
      toast.success("Points updated successfully");
      fetchMembers();
      setPointsInput({ ...pointsInput, [userId]: "" });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold text-primary">Assistant Panel</h1>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Manage Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">{member.full_name || "Member"}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="mt-1 flex items-center gap-1 text-lg font-bold text-accent">
                      <TrendingUp className="h-4 w-4" />
                      {member.total_points} points
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Points"
                      value={pointsInput[member.id] || ""}
                      onChange={(e) =>
                        setPointsInput({ ...pointsInput, [member.id]: e.target.value })
                      }
                      className="w-24"
                    />
                    <Button
                      onClick={() =>
                        handleUpdatePoints(member.id, parseInt(pointsInput[member.id] || "0"))
                      }
                      size="sm"
                      variant="default"
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() =>
                        handleUpdatePoints(member.id, -parseInt(pointsInput[member.id] || "0"))
                      }
                      size="sm"
                      variant="outline"
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

export default Admin2;
