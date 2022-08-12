import { ethers } from 'ethers';
import logo from './logo.svg'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';


function App() {

  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const navigate = useNavigate();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const ConnectWallet = async () => {
    try{
      if(!ethereum){
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
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

  useEffect( () => {
      checkIfWalletIsConnected(setIsConnected);
    }, []);

  return (
      <div className="App">
        {/* <header className="App-header">
          {haveMetamask ? (
              <div className="App-header">
                {isConnected ? (
                    <div className="card">
                      <div className="card-row">
                        <h3>Wallet Address:</h3>
                        <p>
                          {accountAddress.slice(0, 4)}...
                          {accountAddress.slice(38, 42)}
                        </p>
                      </div>
                      <div className="card-row">
                        <h3>Wallet Balance:</h3>
                        <p>{accountBalance}</p>
                      </div>
                    </div>
                ) : (
                    <img src={logo} className="App-logo" alt="logo" />
                )}
                {isConnected ? (
                    <p className="info">🎉 Connected Successfully</p>
                ) : (
                    <button className="btn" onClick={connectWallet}>
                      Connect
                    </button>
                )}
              </div>
          ) : (
              <p>Please Install MataMask</p>
          )}
        </header> */}
        
          <Routes>
            <Route exac path="/" element={(<button onClick={ConnectWallet}>Login</button>)}/>
            <Route path="/main" element={<Mainpage accountAddress={accountAddress}/>} />
          </Routes>
        
      </div>
  );
}


export default App;
