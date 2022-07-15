import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CoinPage from './pages/CoinPage';
import { theme as customTheme } from './theme';
import ColorModeContext from './components/ColorModeContext';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import ConnectionProvider from './context/connectionContext/connectionProvider';
import { MoralisProvider } from 'react-moralis';
import WalletPage from './pages/WalletPage';
const App = () => {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(
    () => ({
      // The light mode switch will invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));

        try {
          window.localStorage.setItem('themeMode', mode);
        } catch {
          /* do nothing */
        }
      },
    }),
    []
  );

  return (
    <MoralisProvider
      serverUrl={'https://iigj2r3zgx8m.usemoralis.com:2053/server'}
      appId={'WN9mb7A5wWKATviXVLwjkh1VAhxGgITk5KfmXRsj'}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ConnectionProvider>
          <ThemeProvider theme={customTheme[mode]}>
            <CssBaseline />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </ThemeProvider>
        </ConnectionProvider>
      </ColorModeContext.Provider>
    </MoralisProvider>
  );
};

export default App;
