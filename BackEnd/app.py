from flask import Flask, jsonify, session, request
from flask_cors import CORS
from captcha.image import ImageCaptcha
import string,random,base64

app = Flask(__name__)
app.secret_key = 'wehaveahulk'
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:3000"])

@app.route('/api/captcha', methods = ['GET'])
def generate_captcha(): 
   image = ImageCaptcha(width = 300, height = 100)
   word_1=str(''.join(random.choices(string.hexdigits + string.digits, k = 4)))
   word_2=str(''.join(random.choices(string.hexdigits + string.digits, k = 4)))
   captcha_text =word_1+' '+word_2
   session['captcha']=captcha_text 
   img_data = image.generate(captcha_text)
   img_str = "data:image/png;base64," + base64.b64encode(img_data.getvalue()).decode()   
   return (jsonify({'img':img_str}),200,{'Content-Type': 'application/json'})
 
@app.route('/api/check', methods = ['POST'])
def check_captcha():
   data=request.get_json()
   if data['txt'].lower()==session["captcha"].lower():
      return(jsonify({'catchaAnswer':True}),200,{'Content-Type': 'application/json'})
   else:
      return(jsonify({'catchaAnswer':False}),200,{'Content-Type': 'application/json'})
   
if __name__ == '__main__':
   app.run()