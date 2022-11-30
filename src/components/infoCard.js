import React from 'react'
import '../style/infoCardStyle.css';


const infoCard = ({ icon, text_color }) => {
  return (
    <div className='infoDivs'>
      <div className='infoDivsLeftDiv'>
        <div className='infoDivsLeftDivPart'></div>
        <div className='infoDivsLeftDivPart UpDiv'><p>5 Desks</p></div>
        <div className='infoDivsLeftDivPart DownDiv' style={{ color: { text_color } }}><p>expires in a month</p></div>
        <div className='infoDivsLeftDivPart'></div>
      </div>
      <div className='infoDivsRightDiv'>
        <img className='Icon' src={icon}></img>
      </div>
    </div>
  )
}

export default infoCard
