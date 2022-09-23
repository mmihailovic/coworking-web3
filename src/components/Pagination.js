import React, { useState } from 'react'
import '../style/pagination.css'
import Card from './Card'

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
        <div className="main">
            <div className="mainData">
              {
              cardSliceArray.map((item) => {
                return (
                    <div >
                        <Card key={item.id} card = {item}/> 
                    </div>
                );
                })}
            </div>
            <ul className="pageNumbers"> 
               <li>
                   {numOfPages>0?<button className='buttonNextPrev' onClick={handlePrevClick} disabled={currentPage === pages[0]}>&lt;</button>:null}
               </li>
                {pageNumbers}
                <li>
                   {numOfPages>0?<button className='buttonNextPrev' onClick={handleNextClick} disabled={currentPage === numOfPages}>&gt;</button>:null}
               </li>
            </ul>
        </div>
    )
}

export default Pagination