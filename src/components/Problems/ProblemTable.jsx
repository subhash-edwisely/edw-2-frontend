import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  Skeleton,
  Link,
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import axios from 'axios';

function ProblemTable() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const url = difficultyFilter === 'all'
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

  const handleStatusChange = async (problemId, currentStatus) => {
    const newStatus = currentStatus === 'solved' ? 'unsolved' : 'solved';
    try {
      await axios.patch(`/api/problems/${problemId}/status`, { status: newStatus });
      setProblems(problems.map(p => p.id === problemId ? { ...p, status: newStatus } : p));
    } catch (error) {
      console.error('Error updating problem status:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' };
      case 'medium': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'hard': return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      default: return { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8' };
    }
  };

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Problems
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small">
              <Select value="all" disabled
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                  '& .MuiSvgIcon-root': { color: '#000' },
                  '& .MuiSelect-select': { py: 1 },
                }}
              >
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
            <Link sx={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>View All</Link>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }} data-testid="section-problems">
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'heading.primary' }}>
          Problems
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                backgroundColor: '#fff',       // white background
                color: '#000',                  // black text
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#000' }, // black border
                '& .MuiSvgIcon-root': { color: '#000' }, // black arrow
                '& .MuiSelect-select': { py: 1 },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <Link
            href="#"
            sx={{
              color: '#fff',                 // white text
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            View All
          </Link>
        </Box>
      </Box>

      {/* Table */}
      <Card sx={{ backgroundColor: 'background.paper', width: '100%' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 80 }}>STATUS</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>TITLE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 120 }}>DIFFICULTY</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 120 }}>ACCEPTANCE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 100 }}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {problems.slice(0, 5).map((problem) => {
    const difficultyStyle = getDifficultyColor(problem.difficulty);
    return (
      <TableRow key={problem.id} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.02)' } }}>
        <TableCell>
          <Checkbox
            checked={problem.status === 'solved'}
            onChange={() => handleStatusChange(problem.id, problem.status)}
            sx={{
              color: 'text.disabled',
              '&.Mui-checked': { color: 'success.600' },
              transform: 'scale(2)',
            }}
          />
        </TableCell>
        <TableCell>
          <Box>
            <Typography sx={{ color: 'text.primary', fontWeight: 500, mb: 0.25 }}>
              {problem.title}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {problem.topics?.join(', ')}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Chip
            label={problem.difficulty}
            size="small"
            sx={{ backgroundColor: difficultyStyle.bg, color: difficultyStyle.color, fontWeight: 500, fontSize: '0.75rem' }}
          />
        </TableCell>
        <TableCell>
          <Typography sx={{ color: 'text.secondary' }}>{problem.acceptance}%</Typography>
        </TableCell>
        <TableCell>
          <Button
            variant="text"
            sx={{ color: 'primary.main', fontWeight: 500, minWidth: 'auto', p: 0, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}
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
