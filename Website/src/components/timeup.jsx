import React from "react";
import "../css/timeup.css"
function findUniqueItems(str) {
    return Array.from(new Set(str));
}
export default function TimeUp(props) {

    console.log("result",props.result)
    const handleClose = () => {

        props.setTimeUp(time=>!time)
    }
    return (
        <div id="resultcon">
                

                <div id="resulttext">
            <div onClick={() => {
                handleClose()
            }} id="resultClose">X</div>
            <div>
                    <div className="ResultHolder">
                        <div className="ResultName">
                            words signed
                        </div>
                        <div className="Result">
                            {props.result.words+1}
                        </div>
                    </div>
                    <div className="ResultHolder">
                        <div className="ResultName">
                            time taken
                        </div>
                        <div className="Result">
                            {props.result.time}
                        </div>
                    </div>
                    <div className="ResultHolder">
                        <div className="ResultName">
                            letters signed
                        </div>
                        <div className="Result">
                            {props.result.words >= 0 ? findUniqueItems(props.result.str.slice(0,props.result.words+1).join('')).map((letter) => {
                                return <span>{letter} </span>
                            }):""}
                        </div>
                    </div>
          <div style={{ color: "#323437" ,fontSize:"30px", fontWeight:"bold"}}>
            SignoLingo
          </div>
        </div>
                
            </div>
            </div>
    )
}