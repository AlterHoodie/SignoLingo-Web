import React, { createContext, useState } from 'react';

export const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
    const [gameState, setGameState] = useState({
        letter: '',
        input: '',
        size: 10,
        mode:false
    })   
    return (
        <GameContext.Provider value={{gameState,setGameState}}>
            { children}</GameContext.Provider>
    )
}
