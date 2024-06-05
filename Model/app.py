from flask import Flask,request,jsonify
from SignoLingo import predict_alpha
import numpy as np
import tensorflow as tf
from flask_cors import CORS
# Create flask app

app = Flask(__name__)
CORS(app)
@app.route("/predict",methods = ["POST"])
def predict():
    # print(request.json)
    data = request.json
    shape = tuple(data['tensorShape'])
    np_data = np.array(data['tensor']).reshape(shape)
    print(np_data[0].shape)
    # print(np_data)
    alpha = predict_alpha(np_data[0].astype('uint8'))
    print(alpha)
    return jsonify(alpha)

if __name__ == "__main__":
    app.run()