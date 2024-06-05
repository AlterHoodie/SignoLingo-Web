import React, { useContext } from "react";
import { GameContext } from "../context/gameContext";

 function Hint() {
    
    const { gameState,setGameState} = useContext(GameContext)
    return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div id="Hintbg" style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        
        <img className='Hint' src={`../../images/${gameState.letter}.jpg`}  alt=""  />
            </div>
            <div style={{fontSize:"2rem"
                            , color: "#fff", paddingTop: 10
                        }}>Here's a Hint for You</div>
            </div>
    )
}

export default Hint = React.memo(Hint)