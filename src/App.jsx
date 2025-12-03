import AppRouter from './routes/AppRouter.jsx';
import ThemeProvider from './theme';
import { Typography } from '@mui/material';
const App = ()=>{
  return (
    <ThemeProvider>
      <AppRouter />    
    </ThemeProvider>
  );
}

export default App
