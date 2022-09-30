import "../style/Header.css";
import logo from '../assets/beodesks.svg';
import arrow from '../assets/arrow.svg';

const Header = ({walletAddress, avatar}) => {

  return (
    <div className="header">  
        <img src={logo} id="beoseats"></img>
        <span id="whiteCircle"></span>
        {avatar.length > 0 && avatar !== 'user not existing'?<img src={ require('../assets/' + avatar)} style={{position:"absolute", left:"53.46%", top:"26.5%", width:"52%", height:"52%"}}></img>:null}
        <p id="wallet">{walletAddress.substring(0,13) + "..."}</p>
        <img src={arrow} id="arrow"></img>
    </div>
  )
}

export default Header