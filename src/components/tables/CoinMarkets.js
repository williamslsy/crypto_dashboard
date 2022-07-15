import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import SvgIcon from '@mui/material/SvgIcon';
import { CoinList } from '../../config/api';
import '../../style.css';
import TablePaginationActions from './TablePaginationActions';
import { useNavigate } from 'react-router-dom';
const CoinMarkets = () => {
  const navigate = useNavigate();

  const currency = 'usd';
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const graphImages = [
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7129.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3957.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/328.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2416.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1765.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2099.svg',
    'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7653.svg',
  ];

  const getRandomGraph = () => {
    const rndInt = Math.floor(Math.random() * 10) + 1;
    return graphImages[rndInt];
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  const fetchCoinMarkets = async () => {
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
  };

  useEffect(() => {
    fetchCoinMarkets();
  }, []);

  return (
    <React.Fragment>
      <Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search a cryptocurrency"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box sx={{ pt: 3 }}>
        <Card>
          <Box sx={{ minWidth: 1050, pb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Symbol</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  {/* <TableCell sx={{ fontWeight: 'bold' }}>24h</TableCell> */}
                  <TableCell sx={{ fontWeight: 'bold' }}>24h Volume</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Market Cap</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>24h Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredCoins.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredCoins
                ).map((coin) => (
                  <TableRow
                    hover
                    key={coin.id}
                    onClick={() => navigate(`/coins/${coin.id}`)}
                  >
                    <TableCell>{coin.market_cap_rank}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={coin.image}
                          alt=""
                          style={{
                            height: '30px',
                            width: '30px',
                            marginRight: '3px',
                          }}
                        />
                        <p>{coin.name}</p>{' '}
                      </div>
                    </TableCell>
                    <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                    <TableCell>${coin.current_price.toFixed(2)}</TableCell>
                    <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
                    <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                    {/* <TableCell>
                      <img
                        src={getRandomGraph()}
                        width={100}
                        height={60}
                        alt="graph"
                      />
                    </TableCell> */}
                    <TableCell>
                      <span
                        className={
                          coin.price_change_percentage_24h > 0 ? 'green' : 'red'
                        }
                      >
                        {formatPercent(coin.price_change_percentage_24h)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={3}
              count={coins.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default CoinMarkets;
