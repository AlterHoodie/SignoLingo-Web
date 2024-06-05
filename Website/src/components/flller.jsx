import React, { useContext,useEffect,useState } from "react";
import '../css/filler.css';
import { GameContext } from "../context/gameContext";

export default function Filler() {
    const { gameState, setGameState } = useContext(GameContext);
    const [gameMode, setGameMode] = useState(false)// hold which gamemode is being played currently (time-true,words-false)
    
    const wordList = [5, 10, 15]
    const timeList = [30, 60, 100]

    const [modeList,setModeList] = useState(wordList)
    
    useEffect(() => {// runs on page load
        if (gameState.mode == true) {
            setModeList(timeList)
        }
        else {
            setModeList(wordList)
        }
    }, [])
    
    // Radio changes of GameMode and Its respective settings
    const handleRadioChange = (e) => {
        const newValue = e.target.value;
        setGameState(prevState => ({
            ...prevState,
            size: Number(newValue)
        }));
    };

    const handleTimeMode = (e) => {
        if (gameState.mode == false) {
            setGameState(prevState => ({
            ...prevState,
                size: 30,
            mode:true
        }));
            setGameMode(true)
            setModeList(timeList)
        }
    }

    const handleWordMode = (e) => {
        if (gameState.mode == true) {
            setGameState(prevState => ({
            ...prevState,
                size: 10,
            mode:false
        }));
            setGameMode(false)
            setModeList(wordList)
        }
    }

    return (
        <div id="filler" style={{ color: "#646669", padding: 10 ,fontSize:"2.5rem", fontWeight:"normal"}}>
            <div className="custom-radio">
                    <input 
                    type="radio" 
                        id={"optionText1"} 
                    name="radio-text" 
                        onChange={(e) => { handleTimeMode(e)}} 
                    value={true} // Ensure value is a string
                    checked={gameState.mode === true} 
                    style={{zIndex:3}}
                    />
                    <label htmlFor={"optionText1"} style={{zIndex:2}}>time</label>
            </div>
            <div id="spacer"></div>
            <div className="custom-radio">
                    <input 
                    type="radio" 
                        id={"optionText2"} 
                    name="radio-text" 
                        onChange={(e) => { handleWordMode(e)}} 
                    value={false} // Ensure value is a string
                    checked={gameState.mode === false} 
                    style={{zIndex:3}}
                    />
                    <label htmlFor={"optionText2"} style={{zIndex:2}}>word</label>
            </div>
            <div id="spacer"></div>
            <div id="radiocon">   
                {modeList.map((key,index) => {
                return <div className="custom-radio">
                            <input 
                                key={key}
                                type="radio" 
                                    id={"option"+index} 
                                name="radio-group" 
                                    onChange={(e) => { handleRadioChange(e)}} 
                                value={key} // Ensure value is a string
                                checked={gameState.size === key} 
                                style={{zIndex:3}}
                            />
                            <label htmlFor={"option"+index} style={{zIndex:2}}>{key}</label>
                        </div>
                    })}
            </div>
        </div>
    );
}
