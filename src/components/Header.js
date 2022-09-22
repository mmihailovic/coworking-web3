import "../style/Header.css";
import logo from '../assets/beoseats.svg';
import arrow from '../assets/arrow.svg';

const Header = ({walletAddress}) => {
  return (
    <div className="header">  
        <img src={logo} id="beoseats"></img>
        <span id="whiteCircle"></span>
        <span id="blueCircle"></span>
        <p id="wallet">{walletAddress.substring(0,13) + "..."}</p>
        <img src={arrow} id="arrow"></img>
    </div>
  )
}

export default Header