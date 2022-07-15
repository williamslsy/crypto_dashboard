import React, { useEffect } from 'react';
import { useState } from 'react';
import { connectionContext } from './useConnection';
// import Web3 from 'web3';

import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';

function ConnectionProvider({ children }) {
  const moralis = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [chainId, setChainId] = useState();
  const [address, setAddress] = useState(null);
  // const [data, setData] = useState();
  useEffect(() => {
    Moralis.onWeb3Enabled((result) => {
      console.log('web3 enabled', result);
      setChainId(result.chainId);
      localStorage.setItem('connected', '1');
    });

    const onChainChangedEvent = Moralis.onChainChanged((chain) => {
      setChainId(chain);
    });

    const web3DeactivatedEvent = Moralis.onWeb3Deactivated((result) => {
      console.log(result);
    });

    const accountChangedEvent = Moralis.onAccountChanged((address) => {
      console.log('address', address);
      window.location.reload();
    });

    const accountDisconnected = Moralis.onDisconnect((error) => {
      console.log(error);
      localStorage.removeItem('connected', '1');
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('connected') === '1') {
      login();
      console.log('login');
    }
  }, []);

  // useEffect(() => {
  //   Moralis.onWeb3Enabled((result) => {
  //     console.log('web3 enabled', result);
  //     setData(result);
  //   });
  // }, []);

  const login = async () => {
    try {
      const user = await moralis.authenticate();
      setAddress(user.get('ethAddress'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <connectionContext.Provider
      value={{
        moralis,
        Web3Api,
        login,
        address,
        chainId,
      }}
    >
      {children}
    </connectionContext.Provider>
  );
}

export default ConnectionProvider;
