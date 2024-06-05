import numpy as np 
import tensorflow as tf

# Sub groups of alphabets
g1 = ['L','S','X']
g2 = ['A','E','T']
g3 = ['H','K','W']
g4 = ['R','U','V']
g5 = ['C','D','O']
g6 = ['G','H','P']
alpha_set = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
       'N', 'O', 'P', 'Q', 'R', 'S', 'Space', 'T', 'U', 'V', 'W', 'X',
       'Y', 'Z']

# Model Paths
model_path_main = './ASL_Models/ASL_model_1'
model_path_g1 = './ASL_Models/ASL_g1_model'
model_path_g2 = './ASL_Models/ASL_g2_model'
model_path_g3 = './ASL_Models/ASL_g3_model'
model_path_g4 = './ASL_Models/ASL_g4_model'
model_path_g5 = './ASL_Models/ASL_g5_model'
model_path_g6 = './ASL_Models/ASL_g6_model'

# Loading and Initializing Models
model_main  = tf.saved_model.load(model_path_main)
model_g1 = tf.saved_model.load(model_path_g1)
model_g2 = tf.saved_model.load(model_path_g2)
model_g3 = tf.saved_model.load(model_path_g3)
model_g4 = tf.saved_model.load(model_path_g4)
model_g5 = tf.saved_model.load(model_path_g5)
model_g6 = tf.saved_model.load(model_path_g6)

# Model and Alphabet Groups
model_grp = [model_g1,model_g2,model_g3,model_g4,model_g5,model_g6]
list_grp = [g1,g2,g3,g4,g5,g6]

model_list = zip(model_grp,list_grp)

# To Make First Vague Prediction 
def get_mainPredictions(landmark_data):
    prediction = model_main(tf.constant(landmark_data.reshape(1,21,3),dtype =tf.float32 ))
    prediction_ind = np.argmax(prediction)
    prediction_alpha = alpha_set[prediction_ind]
    return prediction_alpha

# To Make second Strong Prediction
def get_subPredictions(model,landmark_data,alpha_grp):
    prediction = model(tf.constant(landmark_data.reshape(1,21,3),dtype =tf.float32 ))
    prediction_ind = np.argmax(prediction)
    prediction_alpha = alpha_grp[prediction_ind]
    return prediction_alpha

# Returns corresponding model and alphabet group the alphabet belongs to
def get_model_group(prediction_alpha):
    for model,grp in model_list:
        if prediction_alpha in grp:
            return (model,grp)
    return (model_main,alpha_set)