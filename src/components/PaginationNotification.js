import React, { useState } from 'react'
import '../style/pagination.css'

import grayArrow from '../assets/grayArrow.svg';
import blackArrow from '../assets/blackArrow.svg';
import Notification from './Notification';

const Pagination = (props) => {

  const {  currentPage,maxPageLimit,minPageLimit} = props;
  const data = props.lista;
  const totalCards = data.length;
  var numOfPages=Math.ceil(totalCards/5);
  const sliceArray = data.slice((currentPage-1)*5, (currentPage-1)*5 + 5)
  let curr_notification_date = new Date();
  let today = new Date();
  let firstDate = true;
  let lista = [];
  let index = 0;

    

    const pages = [];
    for(let i=1 ; i<=numOfPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
        console.log(maxPageLimit);
        console.log()
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li>
        <button  key={page} id={page} onClick={handlePageClick} 
            className={currentPage===page ? 'active' : 'buttonNum'}>
            {page}
        </button>
        </li>
            );
        }else{
            return null;
        }
    }
   
 );
 function areDatesEqual(date1, date2) {
    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth()
      && date1.getFullYear() == date2.getFullYear();
  }
    return (
        <div className="main" style={{height:"100%", width:"100%"}}>
            <div className="mainData" style={{height:"90%", width:"100%"}}>
              {
              sliceArray.map((item) => {
                if(typeof item === 'object')return (
                    // <>
                    <Notification setCardInNotificationPopup={props.setCardInNotificationPopup} setNotificationInNotificationPopup={props.setNotificationInNotificationPopup}
                    setShowCardPopup={props.setShowCardPopup} key={item.id} notification={item} numberOfUnreadNotifications={props.numberOfUnreadNotifications}
                    setNumberOfUnreadNotifications={props.setNumberOfUnreadNotifications}>
                    </Notification>
                    // </>
                );
                // else return(<p>{item}</p>);
                })}
            </div>
            <div style={{position:"absolute",left:"75%", top:"95%", width:"100%", height:"4.5%"}}>
                {totalCards > 2?
                <ul className="pageNumbers">
                <li>
                    {numOfPages>0?<button className='buttonNextPrev' id="prev" onClick={handlePrevClick} disabled={currentPage === pages[0]}><img className={currentPage === pages[0]?null:"leftArrow"} src={currentPage === pages[0]?grayArrow:blackArrow}/></button>:null}
                </li>
                    {pageNumbers}
                    <li>
                    {numOfPages>0?<button className='buttonNextPrev' id = "next" onClick={handleNextClick} disabled={currentPage === numOfPages}><img className={currentPage === numOfPages?"rightArrow":null} src={currentPage === numOfPages?grayArrow:blackArrow}/></button>:null}
                </li>
                </ul>:null}
            </div>
        </div>
    )
}

export default Pagination