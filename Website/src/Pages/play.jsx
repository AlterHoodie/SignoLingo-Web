import React, { useContext, useState} from "react";
import { GameContext } from "../context/gameContext";
import Camera from "../components/camera";
import Words from "../components/words";
import Hint from "../components/hint";
import Time from "../components/time"
import Filler from "../components/flller";
import "../css/play.css"
import Word from "../components/word";
export default function Play() {
    const { gameState, setGameState } = useContext(GameContext);
    const [start, setStart] = useState(false)
    return (
        <div className="Play">
            {!start ? <Filler></Filler> : <div style={{width:"40%",height:60,marginTop:15}}></div>} 
        <div className="Game">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
            </style>
            
            <div id="Left">
                    {gameState.mode ? <Time className='Typer' start={start} setStart={ setStart}></Time>:<Words className='Typer'></Words>}
                    
                </div>        
                <div id="Right">
                    <div style={{fontSize:30
                        ,color:"#fff",paddingBottom:10}}>Hey It's You</div>
                    <Camera className='Camera'></Camera>
            </div>
            </div>
            </div>
    )
}