import React, { useState } from 'react';
import "../css/header.css"

function Header(props) {
  const [toggle,setToggle]= props.toggle //To toggle help button

  return (
      <header className='Headerbg'>
          <img id="logoimg"src="../../images/logo.jpg" alt="" height={100} width={100}/>
    <div className='Header'>
      <div id="logo">SignoLingo</div>
      <nav>
        <ul className='Nav'>
            <li className='helpcon'><div className='title' onClick={(e) => { setToggle(!toggle) }} style={{userSelect:"none"}}>Help</div>
              
            </li>
        </ul>
              </nav>
      </div>
      {toggle && <div className="content" >
                <div id="close" onClick={(e)=>{setToggle(!toggle)}}>X</div>
                <div id="contenttext">
          <ul >
            <li className='helpli'>
              Use Your Left Hand to Sign Alphabets
              
            </li>
            
            <li className='helpli'>
              Align Your Camera Such that Your Left Hand is the Focus of the Camera
            </li>
            <li className='helpli'>
              Position Your Left Hand Sufficiently Close to the Camera {`(Not too Close Not too Far)`}
            </li>
          </ul>
          <div style={{ color: "#323437" ,fontSize:"30px", fontWeight:"bold"}}>
            SignoLingo
          </div>
        </div>
        
      <style>
        {
          `
          .Header,.App,#logoimg{
            filter:blur(5px);
          }
          #close{
            height:40px;
            width:40px;
            left:95%;
            font-size:30px;
            font-weight:bold;
            position:relative;
            color:#323437;
            user-select:none;
          }
          #contenttext{

    font-size: 25px;
    font-family: 'JetBrains Mono';
    color:#323437;
    filter:none;
    
}
.helpli{
  padding:5px;
}
          `
        }
      </style>
              </div>
      }
      </header>
      
  );
}


export default Header;
