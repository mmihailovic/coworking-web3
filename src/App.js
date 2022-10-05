/* eslint-disable */
import { ethers } from 'ethers';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css';
import Mainpage from './pages/Mainpage';
import React from 'react';
import LoginPage from './pages/LoginPage';
import { selectUser , insertUser} from './web2communication';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from './context/userContext';
import { checkUser } from './service/magic';
import Authenticate from './components/Authenticate';


function App() {

  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [avatar,setAvatar] = useState("");
  const [user, setUser] = useState({ isLoggedIn: null, email: '' });
  const [loading, setLoading] = useState();
  const { ethereum } = window;
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  const navigate = useNavigate();

  useEffect(()=>{
    checkIfWalletIsConnected(setIsConnected);
  },[])
  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        await checkUser(setUser);
        setLoading(false);
        if(user.isLoggedIn){
          if(isConnected == true)navigate('/main');
          else navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [user.isLoggedIn]);
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  // const ConnectWallet = async () => {
  //   try{
  //     if(!ethereum){
  //       sethaveMetamask(false);
  //     }
  //     const accounts = await ethereum.request({
  //       method: 'eth_requestAccounts',
  //     });
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     let balance = await provider.getBalance(accounts[0]);
  //     let bal = ethers.utils.formatEther(balance);
  //     setAccountAddress(accounts[0]);
  //     let myAvatar = await selectUser(accounts[0]);
  //     setAvatar(myAvatar);
  //     if(myAvatar == "user not existing") {
  //       let x = Math.floor((Math.random() * 8) + 1);
  //       insertUser(accounts[0], "avatar"+x+".svg");
  //       setAvatar("avatar"+x+".svg");
  //     }
  //     setAccountBalance(bal);
  //     setIsConnected(true);
  //     navigate('/main');
  //   }catch (error){
  //     setIsConnected(false);
  //   }
  // }

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
            setIsConnected(true);
            if(user.isLoggedIn)navigate("/main");
        });
      }
      else setIsConnected(false);
    }
  }

  return (
    <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<Authenticate logged={isConnected}></Authenticate>} />
          <Route exac path="/login" element={haveMetamask?<LoginPage setAccount = {setAccountAddress} setBalance = {setAccountBalance} setUserAvatar = {setAvatar} setConnected = {setIsConnected}/>:<p>Please install Metamask!</p>} />
          <Route path="/main" element={<Mainpage accountAddress={accountAddress} userAvatar={avatar}/>}></Route>
        </Routes>
     </UserContext.Provider> 
  //         <div className="App">
  //         <Routes>
  //           <Route exac path="/" element={haveMetamask?<LoginPage onClick={ConnectWallet}/>:<p>Please install Metamask!</p>} />
  //           <Route path="/main" element={<Mainpage accountAddress={accountAddress} userAvatar = {avatar}/>} />
  //         </Routes> 
  // </div>
  );
}


export default App;