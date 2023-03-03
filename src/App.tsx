import './App.module.scss';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routing } from './pages';
import { ColorModeContext } from './context/theme-context';

export function App() {
  const savedMode = localStorage.getItem('theme');
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light'
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem('theme', savedMode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [savedMode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Routing />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
