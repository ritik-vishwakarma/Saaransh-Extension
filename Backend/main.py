from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app, support_credentials=True)

def getText():
    url=request.json["url"]
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    text_elements = soup.find_all(['p','pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
    extracted_text = ' '.join([element.get_text() for element in text_elements])
    return extracted_text[:4000] if len(extracted_text) > 4000 else extracted_text


@app.route("/")
def welcome():
    return "Welcome to Saaransh backend!!!"


@app.route("/getsummary",methods=['POST','GET'])
def get_summary():
    text=getText()
    openai_api_key = "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"
    URL = "https://api.openai.com/v1/chat/completions"
    payload = {"model": "gpt-3.5-turbo", "temperature" : 1.0, "messages" : [{"role": "user", "content": f"Summarize the following text give answer in maximum 50 words: {text}"}]}
    headers = {"Content-Type": "application/json","Authorization": f"Bearer {openai_api_key}"}
    response = requests.post(URL, json=payload, headers=headers)
    response = response.json()
    summary= jsonify({
        "summary":response['choices'][0]['message']['content']
        })
    summary.headers.add("Access-Control-Allow-Origin","*")
    return summary


@app.route("/getmajorpoints",methods=['POST','GET'])
def get_major_points():
    text=getText()
    openai_api_key = "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"
    URL = "https://api.openai.com/v1/chat/completions"
    payload = {"model": "gpt-3.5-turbo", "temperature" : 1.0, "messages" : [{"role": "user", "content": f"Provide major points around 4-5 for the following text and each point should be around 15 to 20 words: {text}"}]}
    headers = {"Content-Type": "application/json","Authorization": f"Bearer {openai_api_key}"}
    response = requests.post(URL, headers=headers, json=payload)
    response = response.json()
    majorPoints=jsonify({
        "majorPoints":response['choices'][0]['message']['content']
        })
    majorPoints.headers.add("Access-Control-Allow-Origin","*")
    return majorPoints
    


if __name__=="__main__":
    app.run(host='0.0.0.0',debug=True,port=3000)
