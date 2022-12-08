import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [src, setSrc] = useState("");
  let [text, setText] = useState("");
  let [CaptchaAnswer, setCaptchaAnswer] = useState({
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
    setSrc(data.img);
  });
  setText("")
}
  useEffect(() => {
    reloadCaptcha()
  }, []);

  const captchaFormHandler = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/api/check", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ txt: text }),
      headers: {
        'Content-Type': 'application/json'
      
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       console.log(data)
       if(data.catchaAnswer===false){
        setCaptchaAnswer({answered:true,answer:"Wrong captcha answer",textClass:"wrong-captcha-paragraph",inputClass:"wrong-captcha"})
        reloadCaptcha()
       }else{
        setCaptchaAnswer({answered:true,answer:"Right captcha answer",textClass:"right-captcha-paragraph",inputClass:""})
       }
      });
  };
  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <img src={src} alt="Logo" />
      <form onSubmit={captchaFormHandler}>
        <label>
          Captcha:
          <input
          className={CaptchaAnswer.answered?CaptchaAnswer.inputClass:null}
            onChange={textChangeHandler}
            value={text}
            type="text"
            name="captcha"
          required/>
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={reloadCaptcha}>refresh</button>
      {CaptchaAnswer.answered?<p className={CaptchaAnswer.textClass}>{CaptchaAnswer.answer}</p>:null}
    </div>
  );
}

export default App;
