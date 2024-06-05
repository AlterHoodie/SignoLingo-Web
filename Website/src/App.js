// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import {drawRect} from "./utilities"
import Camera from "./components/camera";
import Words from "./components/words";
import Play from "./Pages/play";
import Header from "./components/header";
import Filler from "./components/flller";
import { GameContextProvider } from "./context/gameContext";
function App() {
  
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <Header toggle={[toggle,setToggle]}></Header>
      <GameContextProvider>
      <div className="App">
              
          <Play></Play>
          {toggle && <style>
            {
              `
              .App{
                filtur:blur(5px);
              }
              `
            }
          </style>
          }
      </div>
        </GameContextProvider>
    </div>
  );
}

export default App;
