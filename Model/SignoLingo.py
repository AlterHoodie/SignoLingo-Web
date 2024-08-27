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

def predict_alpha(frame):
    rgb_frame = frame
    # Process the frame to get hand landmarks
    results = hands.process(rgb_frame)
    # If Landmarks are captured by the mediapipe model
    prediction_alpha = ''
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Draw landmarks on the frame
            landmark_list = np.array([])
            # Collect Landmarks
            for landmark in hand_landmarks.landmark:
                landmark_list = np.append(landmark_list,[landmark.x,landmark.y,landmark.z])
                h, w, c = frame.shape
                x, y = int(landmark.x * w), int(landmark.y * h)
            # Make Main and Sub predictions
            prediction_alpha = get_mainPredictions(landmark_list)
            model,grp = get_model_group(prediction_alpha)
            prediction_alpha = get_subPredictions(model,landmark_list,grp)
    return prediction_alpha
