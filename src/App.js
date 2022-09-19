/* eslint-disable */
import { ethers } from 'ethers';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css';
import Mainpage from './pages/Mainpage';
import React from 'react';
import LoginPage from './pages/LoginPage';


function App() {

  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { ethereum } = window;
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  const navigate = useNavigate();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      else sethaveMetamask(true);
    };
    checkMetamaskAvailability();
    if(haveMetamask) checkIfWalletIsConnected(setIsConnected);
  }, []);

  const ConnectWallet = async () => {
    try{
      if(!ethereum){
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
      navigate('/main');
    }catch (error){
      setIsConnected(false);
    }
  }

  async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        setAccountAddress(account);
        ethereum.request({
            method: "eth_getBalance",
            params: [account, "latest"]
          }).then((balance) => {
            console.log("Already connected!")
            setAccountBalance(balance);
        });
        setIsConnected(true);
        navigate("/main");
      }
    }
  }

  return (
      <div className="App">
          <Routes>
            <Route exac path="/" element={haveMetamask?<LoginPage onClick={ConnectWallet}/>:<p>Please install Metamask!</p>} />
            <Route path="/main" element={<Mainpage accountAddress={accountAddress}/>} />
          </Routes>
        
      </div>
  );
}


export default App;