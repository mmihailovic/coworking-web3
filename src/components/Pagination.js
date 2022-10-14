import React, { useState } from 'react'
import '../style/pagination.css'
import Card from './Card'
import grayArrow from '../assets/grayArrow.svg';
import blackArrow from '../assets/blackArrow.svg';

const Pagination = (props) => {

  const {  currentPage,maxPageLimit,minPageLimit} = props;
  const data = props.listaKarata;
  const totalCards = data.length;
  var numOfPages=Math.ceil(totalCards/2);
  const cardSliceArray = data.slice((currentPage-1)*2, (currentPage-1)*2 + 2)
    
    

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
    return (
        <div className="main" style={{height:"100%", width:"100%"}}>
            <div className="mainData" style={{height:"90%", width:"100%", marginTop:"3%"}}>
              {
              cardSliceArray.map((item) => {
                return (
                    // <div style={{height:"46%", width:"100%", marginBottom:"2%"}}>
                        <Card onCardClick={props.onCardClick} key={item.id} card = {item} redeemd={props.redeemed} expired={props.expired}/> 
                    // </div>
                );
                })}
            </div>
            <div style={{position:"absolute",left:"81%", top:"95%", width:"100%", height:"4.5%"}}>
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