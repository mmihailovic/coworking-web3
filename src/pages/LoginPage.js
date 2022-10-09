import React from 'react';
import logo from '../assets/mylogo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from 'react';
import {setAvatar, insertAvatar, selectUser, insertUser} from '../web2communication';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { UserContext } from '../context/userContext';
import { logoutUser } from '../service/magic';
import ConfirmPopup from '../components/ConfirmPopup';


const LoginPage = ( {onClick, setAccount, setBalance, setUserAvatar, setConnected} ) => {
  const navigate = useNavigate();
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showConfirmPopup,setShowConfirmPopup] = useState(false);
  const [avatar,setAvatar] = useState(null);
  const { ethereum } = window;
  const { email } = useContext(UserContext);
  const history = useNavigate();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      history('/');
    } catch (error) {
      console.error(error);
    }
  };
  async function loadAvatar() {
    let myAvatar = await selectUser(email);
    if(myAvatar == "user not existing") {
      let x = Math.floor((Math.random() * 8) + 1);
      insertUser(email, "avatar"+x+".svg");
      setAvatar("avatar"+x+".svg");
      setShowConfirmPopup(true);
    }
    setAvatar(myAvatar);
  }
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      else sethaveMetamask(true);
    };
    checkMetamaskAvailability();
    if(haveMetamask) checkIfWalletIsConnected(setConnected);
    if(avatar == null)loadAvatar();
    if(email == null) navigate('/');
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
      setAccount(accounts[0]);
      setBalance(bal);
      setConnected(true);
      setShowConfirmPopup(false);
      navigate('/main');
    }catch (error){
      setConnected(false);
    }
  }
  async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        setAccount(account);
        ethereum.request({
            method: "eth_getBalance",
            params: [account, "latest"]
          }).then((balance) => {
            console.log("Already connected!")
            setBalance(balance);
            setConnected(true);
            navigate("/main");
        });
      }
    }
  }
  return (
    <>
    {/* // <header className="App-header">   */}
        {/* <div className="App-header"> */}
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <Button variant="light" size="lg" onClick={ConnectWallet}>
                    Connect
            </Button>
            <Button variant="primary" onClick={handleLogOut}>
              Sign Out
            </Button>
            <h1>{email}</h1>
        {/* </div> */}
        <ConfirmPopup showPopup={showConfirmPopup} connectFunc={ConnectWallet} skipFunc={setShowConfirmPopup}></ConfirmPopup>
        {avatar != null?<img src={ require('../assets/' + avatar)}></img>:null}
        </>
    // </header> 
  )
}

export default LoginPage