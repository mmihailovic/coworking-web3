import React, { useState } from 'react'
import '../style/LoadingScreen.css';

const LoadingScreen = ({showLoadingScreen}) => {
  const [done,setDone] = useState(0);
  setTimeout(()=>{
    if(done < 100)setDone(done + 1);
  },10);
  return (showLoadingScreen)?(<div className='loadingBackground'>
        <div className='progress'>
            <div className='progressDone' style={{width:`${done}%`,height:"100%", background:"#0568FD"}}>
            </div>
        </div>
    </div>
  ): null
}

export default LoadingScreen