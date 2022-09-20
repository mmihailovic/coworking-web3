import "../style/Header.css";
import beoseats from '../assets/Vector.svg';
import green from '../assets/green.svg';
import blue from '../assets/blue.svg';
import yellow from '../assets/yellow.svg';
import arrow from '../assets/arrow.svg';

const Header = ({walletAddress}) => {
  return (
    <div className="header">  
        <img src={beoseats} id="beoseats"></img>
        <img src={green} id="greenIcon"></img>
        <img src={blue} id="blueIcon"></img>
        <img src={yellow} id="yellowIcon"></img>
        <span id="whiteCircle"></span>
        <span id="blueCircle"></span>
        <p id="wallet">{walletAddress.substring(0,13) + "..."}</p>
        <img src={arrow} id="arrow"></img>
    </div>
  )
}

export default Header