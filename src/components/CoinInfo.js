import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HistoricalChart } from '../config/api';
import Container from '@mui/material/Container';
import SelectButton from './SelectButton';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { CircularProgress } from '@mui/material';

import { useParams } from 'react-router-dom';

import { chartDays } from '../config/data';

import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';

ChartJS.register(...registerables);
const CoinInfo = ({ coin }) => {
  const theme = useTheme();
  const { id } = useParams();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const currency = 'usd';
  const [flag, setflag] = useState(false);

  const styles = {
    container: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
    },
  };

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
    console.log('prices', data.prices);
  };

  console.log('id:', id);
  console.log('coin', coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <Container minWidth={true}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          maxHeight: '50%',
          py: 2,
        }}
      >
        <div className={styles.container}>
          {!historicData | (flag === false) ? (
            <CircularProgress
              style={{ color: 'gold' }}
              size={100}
              thickness={1}
            />
          ) : (
            <>
              <Chart
                style={{
                  height: '50%',
                }}
                type="line"
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: '#EEBC1D',
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      setflag(false);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default CoinInfo;
