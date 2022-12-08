import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [iamgeSrc, setImageSrc] = useState("");
  let [enteredText, setEnteredText] = useState("");
  let [captchaAnswer, setCaptchaAnswer] = useState({
answered:false,
answer:"",
text:"",
textClass:"",
inputClass:""
});

const reloadCaptcha=()=>{
  fetch("http://127.0.0.1:5000/api/captcha",{credentials: "include"})
  .then((response) => response.json())
  .then((data) => {
    setImageSrc(data.img);
  });
  setEnteredText("")
}
  useEffect(() => {
    reloadCaptcha()
  }, []);

  const captchaFormHandler = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/api/check", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ txt: enteredText }),
      headers: {
        'Content-Type': 'application/json'
      
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       if(data.catchaAnswer===false){
        setCaptchaAnswer({answered:true,answer:"Wrong captcha answer",textClass:"wrong-captcha-paragraph",inputClass:"wrong-captcha"})
        reloadCaptcha()
       }else{
        setCaptchaAnswer({answered:true,answer:"Right captcha answer",textClass:"right-captcha-paragraph",inputClass:""})
       }
      });
  };
  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  return (
    <div className="App">
      <p>Prove you are not a Robot</p>
      <img src={iamgeSrc} alt="Logo" />
      <p>Enter the 2 pieces of text</p>
      <form onSubmit={captchaFormHandler}>
        <label>
          Captcha:
          <input
          className={captchaAnswer.answered?captchaAnswer.inputClass:null}
            onChange={textChangeHandler}
            value={enteredText}
            type="text"
            name="captcha"
          required/>
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={reloadCaptcha}>refresh</button>
      {captchaAnswer.answered?<p className={captchaAnswer.textClass}>{captchaAnswer.answer}</p>:null}
    </div>
  );
}

export default App;
