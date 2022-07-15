import Button from '@mui/material/Button';

import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CHAINS } from '../library/config';
import Container from '@mui/material/Container';
import axios from 'axios';

import useConnection from '../context/connectionContext/useConnection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortAddress, shortenAddress } from '../library/utils';

import metamask from '../assets/metamask.png';

const styles = {
  fontWeight: 'bolder',
  background: 'rgba(255, 255, 255, 0.13)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(1.7px)',
  webkitBackdropFilter: 'blur(1.7px)',
  border: '1px solid rgba(255, 255, 255, 0.31)',
  padding: '10px',
};
const fetchCoinMarkets = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=1000&page=1&sparkline=false',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const WalletPage = () => {
  // const { connectWallet, connectedAccount, balance, isWalletConnected } =
  //   useContext(ConnectionContext);
  const theme = useTheme();

  const [coins, setCoins] = useState([]);

  const { balances, setBalances } = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [tokensWithValue, setTokensWithValue] = useState([]);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [tokens, setTokens] = useState();
  const { moralis, Web3Api, login, address, chainId } = useConnection();
  const { Moralis } = moralis;
  console.log('address is ', address);

  const fetchTokenUSDBalances = useCallback(async () => {
    const options = {
      chain: CHAINS[chainId],
    };
    console.log('chainId', chainId);

    try {
      let tokens = await Web3Api.account.getTokenBalances(options);
      console.log('tokens', tokens);
      setTokens(tokens);
      const markets = await fetchCoinMarkets();
      const tokensWithValue = [];
      tokens.forEach((token) => {
        let value = token.balance;
        let decimals = token.decimals;
        let convertedBalance = Moralis.Units.FromWei(value, decimals);

        console.log('converted balance', convertedBalance);
        let currentToken;
        markets.forEach((market) => {
          if (token.symbol.toLowerCase() === market.symbol) {
            let usdValue = market.current_price * convertedBalance;
            console.log(market);
            currentToken = {
              ...token,
              balance: convertedBalance,
              usdValue,
            };
            tokensWithValue.push(currentToken);
          }
        });
        console.log('current', currentToken);
      });

      // get total usd value
      let totalUsdValue = 0;
      tokensWithValue.forEach((token) => {
        totalUsdValue += Number(token.usdValue);
      });
      console.log('tokens with value', tokensWithValue);
      setTokensWithValue(tokensWithValue);
      setTotalBalance(totalUsdValue);
    } catch (error) {
      console.log(error);
    }
  }, [chainId, Moralis, Web3Api.account, address]);
  useEffect(() => {
    if (login && address > 0) {
      setUserIsLoggedIn(true);
    } else {
      setUserIsLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    if (!address) return;
    fetchTokenUSDBalances();
  }, [address, fetchTokenUSDBalances, chainId]);
  // const validNetwork = network ? network.toUpperCase() : '';
  return (
    <div
      style={{
        height: '300px',
        maxWidth: '544px',
        margin: 'auto',
        marginTop: '40px',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: '100%',
        }}
      >
        {userIsLoggedIn && (
          <Box
            style={{
              background: 'rgba(255, 255, 255, 0.13)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(1.7px)',
              webkitBackdropFilter: 'blur(1.7px)',
              border: '1px solid rgba(255, 255, 255, 0.31)',
              padding: '20px',
              paddingBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',

                padding: '10px',
              }}
            >
              <p style={styles}>{chainId} Network</p>
              <p style={styles}>connected</p>
              <p style={styles}>{address ? shortenAddress(address) : ''}</p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div></div>
            </div>
            <div
              style={{
                fontWeight: 'bolder',
                background: 'rgba(255, 255, 255, 0.13)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(1.7px)',
                webkitBackdropFilter: 'blur(1.7px)',
                border: '1px solid rgba(255, 255, 255, 0.31)',
                paddingTop: '10px',
                margin: '0 auto',
                maxWidth: '200px',
                marginTop: '5px',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Container style={{}}>
                <div>Total Balance</div>
                <h3>${totalBalance}</h3>
              </Container>
              <div style={{ padding: '20px' }}>
                <Button
                  style={{
                    backgroundColor: 'white',
                    margin: '10px',
                    borderRadius: '16px',
                  }}
                >
                  Buy
                </Button>
                <Button
                  style={{
                    backgroundColor: 'white',

                    borderRadius: '16px',
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
            <div>
              {tokensWithValue?.map((tokens) => {
                return (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: 'bolder',
                        background: 'rgba(255, 255, 255, 0.13)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(1.7px)',
                        webkitBackdropFilter: 'blur(1.7px)',
                        border: '1px solid rgba(255, 255, 255, 0.31)',
                        padding: '0px 10px',
                        marginTop: '10px',
                      }}
                    >
                      <p>{tokens.symbol}</p>
                      <p>
                        {tokens.balance} {tokens.symbol}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
            <div
              style={{
                fontWeight: 'bolder',
                background: 'rgba(255, 255, 255, 0.13)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(1.7px)',
                webkitBackdropFilter: 'blur(1.7px)',
                border: '1px solid rgba(255, 255, 255, 0.31)',
                padding: '0px 10px',
                marginTop: '10px',
              }}
            >
              {tokens?.map((token) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p>{token.symbol}</p>
                    <p>
                      {(token.balance / 1000000000000000000).toFixed(2)}&nbsp;
                      {token.symbol}
                    </p>
                  </div>
                );
              })}
            </div>
          </Box>
        )}

        {!address && (
          <div
            style={{
              height: '300px',
              maxWidth: '544px',
              margin: 'auto',
              marginTop: '40px',
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                background: 'rgba(255, 255, 255, 0.13)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(1.7px)',
                webkitBackdropFilter: 'blur(1.7px)',
                border: '1px solid rgba(255, 255, 255, 0.31)',
                minHeight: '100%',
                py: 1,
              }}
            >
              <div style={{ alignItems: 'center', marginLeft: '35%' }}>
                <img
                  src={metamask}
                  alt="metamask"
                  style={{
                    maxHeight: '150px',
                  }}
                />
                <p
                  style={{
                    marginLeft: '5%',
                    fontWeight: 'bolder',
                    fontSize: 'larger',
                  }}
                >
                  METAMASK
                </p>
              </div>
              <Button
                onClick={login}
                sx={{
                  backgroundColor: 'white',
                  marginLeft: '36.8%',
                  marginTop: '20px',
                }}
              >
                Connect Wallet
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
};

export default WalletPage;
