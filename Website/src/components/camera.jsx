
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import React, { useRef, useState, useEffect, useContext } from "react";
import { GameContext } from "../context/gameContext";

export default function Camera() {
    const webcamRef = useRef(null);
    const { gameState,setGameState} = useContext(GameContext)

  // Main function(Used to send prediction requests to DL Model running on Flask server)
    const runCoco = async () => {
    setInterval(() => {
        detect();
        },800);
    };

    const detect = async () => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
    // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Detect and Make Predictions
    const img = tf.browser.fromPixels(video)
    const casted = img.cast('int32')
    const expanded = casted.expandDims(0)
    
    expanded.data().then(data => {
    // Convert tensor data to JSON
        const tensorData = Array.from(data);
        const shape = expanded.shape;
    // Send tensor data to Flask API
    sendTensorData(tensorData,shape);
    });

        
    //To recieve Prediction
    function sendTensorData(tensorData,shape) {
        fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tensor: tensorData ,tensorShape:shape})
    })
    .then(response => response.json())
    .then(data => {
        // console.log('Success:', data);
        setGameState(prevState => ({
            ...prevState,
            input:data.toLowerCase()
        }))
    })
    .catch((error) => {
        console.error('Error:', error);
    });
        }
        //done to reduce memory consumption by tensorflow
        tf.dispose(img)
        tf.dispose(casted)
        tf.dispose(expanded)
    }
};
    //run camera
    useEffect(()=>{runCoco()},[]);
    return (
        <div className="Camera">
            
            <div className="Webcam">
                <div style={{zindex:0}}>
                    </div>
                <div style={{ zindex: 2 }}>
            <Webcam
                ref={webcamRef}
                muted={true} 
                style={{
                    
                    borderRadius: "10px"
                }}
                        />
                        </div>
                </div>
        </div>
    );
}