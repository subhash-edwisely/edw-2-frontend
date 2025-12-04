import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import DailyChallengeCard from "../../components/DailyChallenge/DailyChallengeCard";
import ProblemTable from "../../components/Problems/ProblemTable";
import ProgressCard from "../../components/Progress/ProgressCard";
import LeaderboardCard from "../../components/Leaderboard/LeaderboardCard";
import TopicGrid from "../../components/Topics/TopicGrid";

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navbar */}
     

      {/* Main content */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 2, sm: 4, md: 6, lg: 10 }, 
          display: "flex",
          gap: 4,
        }}
      >
        {/* LEFT COLUMN */}
        <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <DailyChallengeCard />
          <TopicGrid />
          <ProblemTable />
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={{ flex: 1.5, display: "flex", flexDirection: "column", gap: 3 }}>
          <ProgressCard />
          <LeaderboardCard />
        </Box>
      </Box>
    </Box>
  );
}
