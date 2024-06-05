import React, { useState, useRef, useEffect, useContext } from "react";
import Word from "./word";
import "../css/words.css";
import { GameContext } from "../context/gameContext";
import Hint from "./hint";
const str = 'Baby Wheel Focus Chair Bird Cat Dive Zebra House'.toLowerCase()

function Words() {
    
    const [userInput, setUserInput] = useState('')
    const [wordIndex,setWordIndex] = useState(0)
    const [letterIndex, setLetterIndex] = useState(0)    
    const [wordState,setWordState] = useState([])
    const [letterState, setLetterState] = useState([]) 
    const [reset, setReset] = useState(0)
    const [words, setWords] = useState([])
    const { gameState, setGameState } = useContext(GameContext)
    
    const getCloud = () => {
        return str.split(' ').sort(()=> Math.random() > 0.5? 1:-1).slice(0,gameState.size)
    }
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
                    letter: words.join(' ')[0]
                }))
    }, [reset,gameState.size])
    

    useEffect( ()=>{
        const input = gameState.input
        //Type Overflow
        console.log(words.join(' ')[letterIndex])
        if (letterIndex >= words.join(' ').length) {
            setReset(reset => reset + 1)
            return
        }
        else if (words.join(' ')[letterIndex]===' ') {//If Space is pressed pushes the cursor to the next word
            //Space Overflow
            console.log('Space')
            if ((wordIndex+1) >= words.length) {
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
            const sum = words.slice(0, wordIndex +1 + 1).join(' ').length - words[wordIndex+ 1].length
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
                    letter: words.join(' ')[letterIndex+1]
                }))
            }
        
        }
    },[gameState]
)
    return (
        <div className="Typer">
            <div className="Words">
                <div className="Timer" ></div>
                <div className="Sentence">
                {words.map((word, index) => {
                    const sum = words.slice(0, index + 1).join(' ').length - words[index].length
                    return <Word key={index} wordState={wordState[index]} word={word} sum={sum}
                        letterState={ letterState}></Word>
                })}
                </div>
                <div id="startButton"></div>
                <div id="hintcon">
                    <Hint className='Hint'></Hint>
                </div>
            </div>
        </div>
    )

}

export default Words = React.memo(Words)