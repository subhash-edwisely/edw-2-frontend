// LeaderboardCard.jsx
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  EmojiEvents as EmojiEventsIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

// Dummy data (replace with API later)
const dummyUsers = [
  { id: 1, name: "Sarah Chen", xp: 8450, avatar: "https://i.pravatar.cc/150?img=1", isCurrentUser: true, rank: 3 },
  { id: 2, name: "Jacob Miller", xp: 9100, avatar: "https://i.pravatar.cc/150?img=2", rank: 1 },
  { id: 3, name: "Priya Singh", xp: 8800, avatar: "https://i.pravatar.cc/150?img=3", rank: 2 },
  { id: 4, name: "Lucas Brown", xp: 6100, avatar: "https://i.pravatar.cc/150?img=4", rank: 4 },
  { id: 5, name: "Ibrahim Khan", xp: 5900, avatar: "https://i.pravatar.cc/150?img=5", rank: 5 },
  { id: 6, name: "Emma Wilson", xp: 5400, avatar: "https://i.pravatar.cc/150?img=6", rank: 6 }
];

const LeaderboardCard = () => {
  const [scope, setScope] = useState("global");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dummy leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // mock delay
        setUsers(dummyUsers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return "#fbbf24";
      case 2:
        return "#94a3b8";
      case 3:
        return "#cd7f32";
      default:
        return "transparent";
    }
  };

  if (loading) {
    return (
      <Card sx={{ backgroundColor: "background.paper", height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width={120} height={28} />
          <Box sx={{ mt: 3 }}>
            {[1, 2, 3, 4].map((item) => (
              <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  const currentUser = users.find((u) => u.isCurrentUser);
  const topUsers = users.slice(0, 5);
  const progressToNextRank = currentUser ? ((currentUser.xp % 500) / 500) * 100 : 0;

  return (
    <Card sx={{ backgroundColor: "background.paper", height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Leaderboard
          </Typography>
          <FormControl size="small">
            <Select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{ minWidth: 100 }}
            >
              <MenuItem value="global">Global</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Top Users */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {topUsers.map((user, index) => (
            <Box
              key={user.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: user.isCurrentUser ? 2 : 0,
                borderRadius: user.isCurrentUser ? 2 : 0,
                backgroundColor: user.isCurrentUser ? "rgba(59,130,246,0.1)" : "transparent",
                border: user.isCurrentUser ? "1px solid" : "none",
                borderColor: "primary.main",
              }}
            >
              {/* Rank Badge */}
              {index < 3 ? (
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: getRankBadgeColor(index + 1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <EmojiEventsIcon sx={{ fontSize: 16, color: "#7c2d12" }} />
                  ) : (
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      {index + 1}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ width: 28, textAlign: "center" }}>
                  {index + 1}
                </Typography>
              )}

              <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {user.isCurrentUser ? `You (${user.name})` : user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {user.xp.toLocaleString()} XP
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Current User Rank if below top 5 */}
        {currentUser && currentUser.rank > 5 && (
          <>
            <Box sx={{ textAlign: "center", py: 1 }}>
              <Typography variant="caption">...</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(59,130,246,0.1)",
                border: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography sx={{ width: 28, textAlign: "center" }}>
                {currentUser.rank}
              </Typography>
              <Avatar src={currentUser.avatar} sx={{ width: 40, height: 40 }} />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  You ({currentUser.name})
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {currentUser.xp.toLocaleString()} XP
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Progress Bar */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption">
            Progress to Rank #{currentUser ? currentUser.rank - 1 : 6}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressToNextRank}
            sx={{ height: 8, borderRadius: 4, mt: 1 }}
          />
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            320 XP away from next rank
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
