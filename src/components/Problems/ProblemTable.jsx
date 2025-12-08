import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
  TextField,
  InputAdornment,
  Checkbox,
  Card,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import axios from 'axios';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function ProblemTable() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const navigate = useNavigate();
  const theme = useTheme();

  // From Outlet context (LayoutPage)
  const { darkMode, searchQuery, setSearchQuery } = useOutletContext();

  useEffect(() => {
    setLoading(true);
    const fetchProblems = async () => {
      try {
        const url =
          difficultyFilter === 'all'
            ? '/api/problems'
            : `/api/problems?difficulty=${difficultyFilter}`;

        const response = await axios.get(url);
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [difficultyFilter]);

  // Searching
  const filteredProblems = problems.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topics?.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleStatusChange = async (problemId, currentStatus) => {
    const newStatus = currentStatus === 'solved' ? 'unsolved' : 'solved';
    try {
      await axios.patch(`/api/problems/${problemId}/status`, {
        status: newStatus,
      });
      setProblems(
        problems.map((p) =>
          p.id === problemId ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' };
      case 'medium':
        return { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' };
      case 'hard':
        return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' };
      default:
        return { bg: '#e5e7eb', color: '#6b7280' };
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: darkMode ? '#fff' : '#000' }}
        >
          Problems
        </Typography>

        {/* Filters Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Difficulty Filter */}
          <FormControl size="small">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                backgroundColor:'#fff',
                color: '#000',
                minWidth: 120,
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '& .MuiSvgIcon-root': { color: '#000' },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          {/* Search */}
          <TextField
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search problems"
  size="small"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ fontSize: 20, color: '#64748b' }} />
      </InputAdornment>
    ),
  }}
  sx={{
    width: 260,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      borderRadius: 1,
      '& fieldset': { borderColor: '#E5E7EB' },
      '&:hover fieldset': { borderColor: '#D1D5DB' },
      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
    },
  }}
/>


          {/* View All */}
          <Link
            component="button"
            onClick={() => navigate('/all-problems')}
            sx={{
              color: darkMode ? '#fff' : '#000',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            View All
          </Link>
        </Box>
      </Box>

      {/* Table */}
      <Card sx={{ backgroundColor: '#fff' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Acceptance</TableCell>
                <TableCell>XP</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProblems.slice(0, 5).map((p) => {
                const difficultyStyle = getDifficultyColor(p.difficulty);

                return (
                  <TableRow key={p.id}>
                  <TableCell>
  <Checkbox
    checked={p.status === "solved"}
    onChange={() => handleStatusChange(p.id, p.status)}
    sx={{
      color: theme.palette.grey[500],              // unchecked border
      '&.Mui-checked': {
        color: '#22c55e',                          // solved = green
      },
      transform: 'scale(2)',                     // slightly smaller than your 1.4
      padding: 0,
      mr: 1,
    }}
  />
</TableCell>



                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {p.topics?.join(', ')}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={p.difficulty}
                        size="small"
                        sx={{
                          backgroundColor: difficultyStyle.bg,
                          color: difficultyStyle.color,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell>{p.acceptance}%</TableCell>

                    <TableCell>
                      <Chip
                         icon={<BoltIcon />}
                         label={p.xp}
                         sx={{
                           backgroundColor: 'transparent',
                           border: `1px solid ${theme.palette.xp.primary}`,
                           color: theme.palette.xp.primary,
                           fontWeight: 600,
                           fontSize: '0.875rem',
                           '& .MuiChip-icon': {
                             color: theme.palette.xp.primary,
                             fontSize: 16,
                           },
                         }}
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => navigate(`/problem/${p.id}`)}
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        Solve
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default ProblemTable;
