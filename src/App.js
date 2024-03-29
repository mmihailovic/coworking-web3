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
import LoadingScreen from './components/LoadingScreen';

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

  const navigate = useNavigate();

  useEffect(()=>{
    if(!ethereum)
      sethaveMetamask(false);
    if(haveMetamask)checkIfWalletIsConnected(setIsConnected);
  },[])
  
  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        await checkUser(setUser);
        if(user.isLoggedIn && user.email.length > 0){
          if(isConnected == true && await selectUser(user.email) != 'user not existing')navigate('/main/tickets');
          else navigate('/login/tickets');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [user.isLoggedIn]);

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
            if(user.isLoggedIn)navigate("/main/tickets");
        });
      }
      else setIsConnected(false);
    }
  }

  return (
    <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<><Authenticate logged={isConnected}></Authenticate><LoadingScreen showLoadingScreen={loading}></LoadingScreen></>} />
          <Route exac path="/login/*" element={<><LoginPage setAccount = {setAccountAddress} setBalance = {setAccountBalance} setUserAvatar = {setAvatar} setConnected = {setIsConnected}/><LoadingScreen showLoadingScreen={loading}></LoadingScreen></>} />
          <Route path="/main/*" element={<><Mainpage accountAddress={accountAddress} userAvatar={avatar}/><LoadingScreen showLoadingScreen={loading}></LoadingScreen></>}></Route>
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