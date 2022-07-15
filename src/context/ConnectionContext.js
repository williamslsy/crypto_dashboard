import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { createContext } from 'react';

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState();
  const [balance, setBalance] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert('Please install metamask');

      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        setIsWalletConnected(true);
      } else {
        console.log('No accounts Found');
      }
    } catch (error) {
      console.log(error);

      throw new Error('No Ethereum Object');
    }
  };

  // const handleWalletBalance = async () => {
  //   const { ethereum } = window;

  //   if (ethereum) {
  //     const balance = await ethereum.request({ method: 'eth_getBalance' });
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     await provider.getBalance(balance);
  //     setBalance(balance);
  //     console.log(balance);
  //   }
  // };

  const getBalance = async () => {
    try {
      if (!window.ethereum) return alert('Please install metamask');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEth = ethers.utils.formatEther(balance);
      setBalance(balanceInEth);
      console.log(balanceInEth);
    } catch (error) {
      console.log(error);

      throw new Error('No Ethereum Object');
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert('Please install metamask');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error('No Ethereum Object');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <ConnectionContext.Provider
      value={{ connectWallet, connectedAccount, balance, isWalletConnected }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
