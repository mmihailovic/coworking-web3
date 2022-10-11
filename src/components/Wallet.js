import React from 'react'
import walletImage from '../assets/WalletImage.svg';
import '../style/wallet.css';

const Wallet = ({onClick}) => {
  return (
    <div style={{position:"absolute", width:"90%", top:"2%", left:"25%", width:"65%", height:"100%"}}>
          <div style={{position:"relative",top:"2%", height:"10%"}}>
            
            <p id="tickets">Wallet</p>
          </div>
          <div className='walletMain'>
            <div className='walletContent'>
                <p id="walletTitle">Connect a wallet to rent & share desks</p>
                <p id="walletContent">You need to connect your crypto wallet to rent and manage your desks.</p>
            </div>
            <img src={walletImage} id="walletImg"></img>
            <button className='confirmButton' id="connectWalletBtn" onClick={onClick}>Connect Wallet</button>
          </div>
    </div>
  )
}

export default Wallet