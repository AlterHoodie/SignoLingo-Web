import numpy as np 
import pandas as pd 
import tensorflow as tf 
import cv2
import mediapipe as mp
from util import get_mainPredictions,get_subPredictions,get_model_group

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()
mp_drawing = mp.solutions.drawing_utils
extra = 20

# OpenCV Text Attributes 
org = (50, 100)
fontFace = cv2.FONT_HERSHEY_SIMPLEX
fontScale = 1
color = (255, 255, 255)  # White color
thickness = 2

# Initializing Camera
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert the BGR image to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process the frame to get hand landmarks
    results = hands.process(rgb_frame)

    # If Landmarks are captured by the mediapipe model
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:

            # Draw landmarks on the frame
            landmark_list = np.array([])

            # Collect Landmarks
            for landmark in hand_landmarks.landmark:

                landmark_list = np.append(landmark_list,[landmark.x,landmark.y,landmark.z])
                h, w, c = frame.shape
                x, y = int(landmark.x * w), int(landmark.y * h)
                cv2.circle(frame, (x, y), 5, (0, 255, 0), -1)

            # Make Main and Sub predictions
            prediction_alpha = get_mainPredictions(landmark_list)
            model,grp = get_model_group(prediction_alpha)
            prediction_alpha = get_subPredictions(model,landmark_list,grp)
            
            # Put text on the image 
            cv2.putText(frame, prediction_alpha, org, fontFace, fontScale, color, thickness)
            # Draw Landmarks on Hand
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
    cv2.imshow('Image',frame)

    # Press q to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object
cap.release()
cv2.destroyAllWindows()
