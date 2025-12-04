import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Bolt as BoltIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

export default function Navbar() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeToggle = () => setDarkMode(!darkMode);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4 },     
          py: 2,                    
          gap: 3,
          minHeight: 72,            
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1,
              backgroundColor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CodeIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: theme.palette.text.primary }}
          >
            CodeMaster AI
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
          {['dashboard', 'problems'].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                color:
                  activeTab === tab
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                fontWeight: activeTab === tab ? 600 : 400,
                borderBottom:
                  activeTab === tab
                    ? `2px solid ${theme.palette.primary.main}`
                    : 'none',
                borderRadius: 0,
                px: 2,
                pb: 0.5,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: theme.palette.text.primary,
                },
                '&:focus': { outline: 'none' },
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Search */}
        <TextField
          placeholder="Search problems"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 280,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: 1,
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: theme.palette.divider },
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary,
              fontSize: '0.875rem',
              '&::placeholder': {
                color: theme.palette.text.secondary,
                opacity: 1,
              },
            },
          }}
        />

        {/* Theme Toggle */}
        <IconButton
          size="medium"
          onClick={handleThemeToggle}
          sx={{
            color: theme.palette.text.secondary,
            ml: 1,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            p: 1.1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
            '&:focus': { outline: 'none' },
          }}
        >
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        {/* XP Badge */}
        <Chip
  icon={<BoltIcon />}
  label="150"
  sx={{
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.xp.primary}`,
    color: theme.palette.xp.primary, // sets label color
    fontWeight: 600,
    fontSize: '0.875rem',
    ml: 1,
    '& .MuiChip-icon': {
      color: theme.palette.xp.primary, // this sets icon color
      ml: 1,
      fontSize: 16,
    },
  }}
/>

        {/* Avatar */}
        <Avatar
          src="https://i.pravatar.cc/150?img=7"
          alt="User Avatar"
          sx={{
            width: 36,
            height: 36,
            border: `2px solid ${theme.palette.primary.main}`,
            ml: 1,
            cursor: 'pointer',
            '&:focus': { outline: 'none' },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
