from flask import Flask, jsonify, session, request
from flask_cors import CORS
from captcha.image import ImageCaptcha
import string
import random
import base64

app = Flask(__name__)
app.secret_key = 'wehaveahulk'
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:3000"])

@app.route('/api/captcha', methods=['GET'])
def generate_captcha():
    image = ImageCaptcha(width=300, height=100)
    captcha_text = generate_random_captcha_text()
    session['captcha'] = captcha_text
    img_data = image.generate(captcha_text)
    img_str = get_base64_image_string(img_data)
    return jsonify({'img': img_str})

@app.route('/api/check', methods=['POST'])
def check_captcha():
    data = request.get_json()
    if data['txt'].lower() == session['captcha'].lower():
        return jsonify({'captchaAnswer': True})
    else:
        return jsonify({'captchaAnswer': False})

def generate_random_captcha_text():
    return ' '.join(''.join(random.choices(string.hexdigits + string.digits, k=4)) for _ in range(2))

def get_base64_image_string(img_data):
    return "data:image/png;base64," + base64.b64encode(img_data.getvalue()).decode()

if __name__ == '__main__':
    app.run()
