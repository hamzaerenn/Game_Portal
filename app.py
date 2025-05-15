from flask import Flask, render_template, send_from_directory
import os
import webbrowser
from threading import Timer
import threading
import time

app = Flask(__name__, 
    static_folder='static',
    template_folder='templates'
)


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route("/")
def home():
    return render_template("index.html")

def open_browser():
    time.sleep(1.5)  
    webbrowser.open('http://127.0.0.1:5000')

if __name__ == "__main__":
    
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    threading.Thread(target=open_browser).start()
    
    app.run(debug=True)
