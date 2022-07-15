import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';

import logo from '../assets/energi.png';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import LightModeIcon from '@mui/icons-material/LightMode';
import { alpha, useTheme } from '@mui/material/styles';

import ColorModeContext from '../components/ColorModeContext';
import CustomButton from '../components/CustomButton';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onSidebarOpen }) => {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const colorMode = useContext(ColorModeContext);

  return (
    <React.Fragment>
      <AppBar
        elevation={5}
        sx={{
          top: 0,
          border: 0,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.secondary,
        }}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          <Box
            alignItems="center"
            sx={{ display: { md: 'block', lg: 'none' } }}
          ></Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box>
              <IconButton size="large" disabled>
                <Avatar
                  variant="rounded"
                  sx={{
                    marginRight: '15px',
                    backgroundColor: 'white',
                  }}
                >
                  <img
                    src={logo}
                    style={{
                      color: '#fff',
                      height: 30,
                      width: 30,
                    }}
                  />
                </Avatar>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color: theme.palette.text.primary,
                    fontWeight: 'bold',
                    display: {
                      md: 'inline',
                      xs: 'none',
                    },
                  }}
                >
                  Energi DApp
                </Typography>
              </IconButton>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: { lg: 'flex', md: 'none', xs: 'none' },
            }}
          >
            <Divider
              orientation="vertical"
              sx={{
                height: 32,
                mx: 2,
                display: { lg: 'flex', md: 'none', xs: 'none' },
              }}
            />
            <Link style={{ textDecoration: 'none' }} to="/">
              <CustomButton text="Home" />
            </Link>

            <Divider
              orientation="vertical"
              sx={{
                height: 32,
                mx: 2,
                display: { lg: 'flex', md: 'none', xs: 'none' },
              }}
            />
            <Link style={{ textDecoration: 'none' }} to="/wallet">
              <CustomButton text="Wallet" />
            </Link>
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              height: 32,
              mx: 2,
              display: { lg: 'flex', md: 'none', xs: 'none' },
            }}
          />
          <Box sx={{ display: 'flex' }}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              aria-label="Theme Mode"
              color={theme.palette.mode === 'dark' ? 'warning' : 'inherit'}
            >
              {theme.palette.mode === 'dark' ? (
                <LightModeIcon fontSize="medium" />
              ) : (
                <DarkModeIcon fontSize="medium" />
              )}
            </IconButton>
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              height: 32,
              mx: 2,
              display: { lg: 'flex', md: 'none', xs: 'none' },
            }}
          />

          {theme.palette.mode === 'dark' && <Divider />}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Header;
