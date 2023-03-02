import './App.module.scss';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routing } from './pages';
import { ColorModeContext } from './context/theme-context';

export function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
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
