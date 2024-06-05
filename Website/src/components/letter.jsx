import React, { useRef,useEffect} from "react";

function Letter(props) {
    const rerender = useRef(0)
    useEffect(() => {
        rerender.current += 1 
    })
        const { letter, letterState } = props
    return <span className={letterState === 1 ? 'correct' : letterState === -1 ? 'incorrect' : ''}>{letter}</span>
    
}
    
Letter = React.memo(Letter)
export default Letter