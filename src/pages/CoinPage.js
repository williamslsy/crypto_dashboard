import React, { useState, useEffect } from 'react';
import CoinInfo from '../components/CoinInfo';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTheme } from '@mui/material/styles';
const CoinPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          maxHeight: '50%',
          py: 2,
        }}
      >
        <Container minWidth={true}>
          <Container container spacing={1}>
            <CoinInfo coin={coin} />
          </Container>
        </Container>
      </Box>
    </React.Fragment>
  );
};
export default CoinPage;
