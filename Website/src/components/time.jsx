import React, { useState, useRef, useEffect, useContext } from "react";
import Word from "./word";
import TimeUp from "./timeup";
import Hint from "./hint";
import "../css/words.css";


import { GameContext } from "../context/gameContext";
const str = "Baby Wheel Focus Chair Bird Cat Dive Zebra House".toLowerCase()


function Timer(props) {//Timer responsible to start,display and end time countdown appropriately
    
    const { gameState, setGameState } = useContext(GameContext)
    const [time, setTimer] = useState(gameState.size)

    useEffect(() => {
        setTimer(gameState.size)
    },[gameState.size])
    useEffect(() => {
        
        let clock;
        if (props.start) {
            clock = setInterval(() => {
                setTimer(time=> time - 1)
            },1000)
        }

        return () => {
            console.log('cleanedup')
            clearInterval(clock)
        }
    }, [props.start])
    
    useEffect(() => {
        console.log("timeUP",   props.timeUp)
        if (time == 0) {
                props.setResult({ words:props.wordIndex-1,time:gameState.size-time,str:props.str})   
            
            props.setReset(reset => reset + 1)
            return props.setTimeUp(true)
            
        }
        else {
            if (props.letterIndex == 0) {
                props.setResult({ words:props.wordIndex - 1 ,time:gameState.size-time , str:props.str})
            }
            else {
                props.setResult({ words:props.wordIndex,time:gameState.size-time,str:props.str})   
            }
        }
    },[time])
    return <div className="Timer" >{props.start ? time : ""}</div>
}
function Time(props) {
    const [userInput, setUserInput] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [letterIndex, setLetterIndex] = useState(0)
    const [wordState, setWordState] = useState([])
    const [letterState, setLetterState] = useState([])
    const [reset, setReset] = useState(0)
    const [words, setWords] = useState([])
    const { gameState, setGameState } = useContext(GameContext)
    const start = props.start
    const setStart = props.setStart
    const [timeUp,setTimeUp] = useState(false)
    const [result, setResult] = useState({})
    const getCloud = () => {
        return str.split(' ').sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 10)
    }

    //on page load or reset of game
    useEffect(() => {
        //Resetting Use Input and Words
        const words = getCloud()
        setUserInput('')
        setWords(words)

        // Resetting Word State
        const firstState = new Array(getCloud().length).fill(0)
        firstState[0] = 1
        setWordState(firstState)
        setWordIndex(0)

        //Resetting Letter State
        const firstLetterState = new Array(getCloud().join(' ').length).fill(0)
        firstLetterState[0] = 0
        setLetterState(firstLetterState)
        setLetterIndex(0)

        setGameState(prevState => ({
            ...prevState,
            size:gameState.size,
            letter: words.join(' ')[0],
            mode:true
        }))
        setStart(false)

    }, [reset, gameState.size])
    
    const startGame = (e) => {
        setStart(true)
    }
    const resetGame = (e) => {
        setReset(reset=>reset+1)
    }
    // when game starts and user starts giving input
    useEffect(() => {
            
        if (start) {
            const input = gameState.input
            //Type Overflow
            console.log(words.join(' ')[letterIndex])
            if (letterIndex >= words.join(' ').length) {
                setStart(false)
                setTimeUp(true)
                setReset(reset => reset + 1)
                return
            }
            else if (words.join(' ')[letterIndex] === ' ') {//If Space is pressed pushes the cursor to the next word
                //Space Overflow
                console.log('Space')
                if ((wordIndex + 1) >= words.length) {
                    setStart(false)
                    setReset(reset => reset + 1)
                    return
                }
                //temporary reset of user input 
                setUserInput('')

                //Setting next word as Active
                const newWordState = [...wordState]
                newWordState[wordIndex] = 0
                setWordIndex(wordIndex => wordIndex + 1)
                newWordState[wordIndex + 1] = 1

                //Setting LetterIndex to the first letter of the next word
                const sum = words.slice(0, wordIndex + 1 + 1).join(' ').length - words[wordIndex + 1].length
                setWordState(newWordState)
                setLetterIndex(letterIndex => sum)
                setGameState(prevState => ({
                    ...prevState,
                    letter: words.join(' ')[sum]
                }))
            } else {//compares two letters

                if (words.join(' ')[letterIndex] == input[input.length - 1]) {
                    //correct Input
                    const newLetterState = [...letterState]
                    newLetterState[letterIndex] = 1
                    setLetterState(newLetterState)
                    setUserInput(input)
                    setLetterIndex(letterIndex => letterIndex + 1)
                    setGameState(prevState => ({
                        ...prevState,
                        letter: words.join(' ')[letterIndex + 1]
                    }))
                }
        
            }
        }
        }, [gameState]
        )
    return (
        <div className="Typer">
            {!timeUp && 
            <div className="Words">
                    <Timer start={start} setReset={setReset} setTimeUp={setTimeUp} time={gameState.size}
                        setResult={setResult} wordIndex={wordIndex} letterIndex={letterIndex} timeUp={timeUp} str={ words}></Timer>
                <div className="Sentence">
                {words.map((word, index) => {
                    const sum = words.slice(0, index + 1).join(' ').length - words[index].length
                    return <Word key={index} wordState={wordState[index]} word={word} sum={sum}
                        letterState={ letterState}></Word>
                })}
                </div>
                    {!start && <div id="startButton" onClick={(e) => { startGame(e) }}>start</div>}
                    {start && <div id="startButton" onClick={(e) => { resetGame(e) }}>reset</div>}
                    <Hint className='Hint'></Hint>
            </div>
            }
            {
                timeUp && <div className="Words">
                    <div className="Timer" ></div>
                    <TimeUp timeUp={timeUp} setTimeUp={setTimeUp} result={result} ></TimeUp>
                </div>
            }
        </div>
    )

}


export default Time = React.memo(Time)