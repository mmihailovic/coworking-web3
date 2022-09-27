import "../style/Header.css";
import logo from '../assets/beodesks.svg';
import arrow from '../assets/arrow.svg';

const Header = ({walletAddress, avatar}) => {

  return (
    <div className="header">  
        <img src={logo} id="beoseats"></img>
        <span id="whiteCircle"></span>
        <span id="blueCircle"><img src={avatar}></img></span>
        <p id="wallet">{walletAddress.substring(0,13) + "..."}</p>
        <img src={arrow} id="arrow"></img>
    </div>
  )
}

export default Header