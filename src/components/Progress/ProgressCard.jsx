import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import axios from 'axios';

function ProgressCard() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/progress');
        setProgress(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: '#1e3a5f',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #3b82f6',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {payload[0].value} problems
          </Typography>
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card sx={{ backgroundColor: 'background.paper', height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width={120} height={28} />
          <Box sx={{ display: 'flex', gap: 4, mt: 2, mb: 3 }}>
            <Skeleton variant="rectangular" width={80} height={60} />
            <Skeleton variant="rectangular" width={80} height={60} />
          </Box>
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
        </CardContent>
      </Card>
    );
  }

  const difficultyData = progress?.difficultyProgress || {
    easy: { solved: 20, total: 100 },
    medium: { solved: 15, total: 200 },
    hard: { solved: 10, total: 50 },
  };

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        height: '100%',
        margin: '20px 0px',
      }}
      data-testid="card-your-progress"
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}
        >
          Your Progress
        </Typography>

        <Box sx={{ display: 'flex', gap: 15, mb: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                lineHeight: 1,
              }}
              data-testid="text-xp-achieved"
            >
              {progress?.currentUser?.xp ? Math.floor(progress.currentUser.xp / 100) : 18}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              XP ACHIEVED
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1,
              }}
              data-testid="text-problems-solved"
            >
              {progress?.currentUser?.problemsSolved || 45}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              SOLVED
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: 120, mb: 3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={progress?.weeklyActivity || []}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="problems"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorProblems)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: 'success.main' }}>
                Easy
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {difficultyData.easy.solved}/{difficultyData.easy.total}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(difficultyData.easy.solved / difficultyData.easy.total) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'success.main',
                  borderRadius: 3,
                },
              }}
              data-testid="progress-easy"
            />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: 'warning.main' }}>
                Medium
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {difficultyData.medium.solved}/{difficultyData.medium.total}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(difficultyData.medium.solved / difficultyData.medium.total) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'warning.main',
                  borderRadius: 3,
                },
              }}
              data-testid="progress-medium"
            />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: 'error.main' }}>
                Hard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {difficultyData.hard.solved}/{difficultyData.hard.total}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(difficultyData.hard.solved / difficultyData.hard.total) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'error.main',
                  borderRadius: 3,
                },
              }}
              data-testid="progress-hard"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProgressCard;
