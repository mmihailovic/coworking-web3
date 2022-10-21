import React, {useEffect, useState} from 'react'
import Pagination from './PaginationNotification';

const PassNotification = ({ lista,setCardInNotificationPopup,setNotificationInNotificationPopup,setShowCardPopup,numberOfUnreadNotifications,setNumberOfUnreadNotifications})=>{
  const [passengersData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [numOfPages , setnumOfPages]=useState(10);
  const [numOfButtons,setNumOfButtons]=useState(0);
  
  useEffect(()=>{setData(lista); setnumOfPages(Math.ceil(lista.length/5)); setCurrentPage(1); setMinPageLimit(0); setMaxPageLimit(Math.min(5,Math.ceil(lista.length/5))); setNumOfButtons(Math.min(5,Math.ceil(lista.length/5)));},[lista]);
  
  const onPageChange= (pageNumber)=>{
    
    if(pageNumber > maxPageLimit - numOfButtons/2)
    {
      if(pageNumber+numOfButtons/2>numOfPages)
      {
        setMaxPageLimit(numOfPages);
        setMinPageLimit(numOfPages-numOfButtons);
      }
      else
      {
        setMaxPageLimit(pageNumber+numOfButtons/2);
        setMinPageLimit(pageNumber-numOfButtons/2);
      }
    }

    if(pageNumber < minPageLimit + numOfButtons/2)
    {
      if(pageNumber-numOfButtons/2 < 0 )
      {
        setMaxPageLimit(numOfButtons);
        setMinPageLimit(0);
      }
      else
      {
        setMaxPageLimit(pageNumber+numOfButtons/2);
        setMinPageLimit(pageNumber-numOfButtons/2);
      }
    }

    setCurrentPage(pageNumber);
  }

  const onPrevClick = ()=>{
      if(currentPage -1 < minPageLimit+numOfButtons/2)
      {
        if(currentPage-1 >= numOfButtons/2)
        {
        setMaxPageLimit(maxPageLimit - 1);
        setMinPageLimit(minPageLimit - 1);
        }
      }
      if(currentPage-1>=0)
        setCurrentPage(currentPage-1);
   }
  
  const onNextClick = ()=>{

       if(currentPage > maxPageLimit-numOfButtons/2  ){
          if(currentPage +numOfButtons/2 <=numOfPages)
          {
            setMaxPageLimit(maxPageLimit + 1);
            setMinPageLimit(minPageLimit + 1);
          }
       }

       if(currentPage<numOfPages){
        setCurrentPage(currentPage+1);
       }
    }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: passengersData,
  };

  return(
    <div style={{width:"100%", height:"100%"}}>
        <Pagination {...paginationAttributes} 
                          lista={lista}
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}
                          setCardInNotificationPopup={setCardInNotificationPopup}
                          setNotificationInNotificationPopup={setNotificationInNotificationPopup}
                          setShowCardPopup={setShowCardPopup}
                          numberOfUnreadNotifications={numberOfUnreadNotifications}
                          setNumberOfUnreadNotifications={setNumberOfUnreadNotifications}
                          />
        
        
    </div>
)
      
 }
export default PassNotification;