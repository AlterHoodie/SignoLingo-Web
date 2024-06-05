import React from "react"
import Letter from "./letter"
    

function Word(props) {
        const { wordState,word,sum,letterState } = props
        return (
            <div className={"Word" + (wordState === 1 ? 'Active' : '')}>
                {word.split('').map((letter, index) => { 
                    // console.log(sum+index)
                    return <Letter key={sum + index} letter={letter} letterState={ letterState[sum+index]}></Letter>
                })} </div>
        )
}
    
Word = React.memo(Word)
export default Word