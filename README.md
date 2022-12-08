-Flask : 
    The first step was to check how flask oparates and how to implement simple API urls and run it after achiveneg that i started looking for a library that create a captcha image from text and return the image as data(base64) becuase we dont need to save any images because it will be temporrary and before finding captcha library i came a cross annother library taht uses to verify captch and store the question in database and wait fro reply from the user but that will unuseful addion so i went with CAPTCHA library and save the answer in session.

    The BackEnd consists of 2 routes
        1-generate_captcha(GET)
        2-validate_captcha(POST)

Libraries Used :
        1-Flask
        2-flask_cors
        3-captcha
    flask-cors library was used because of the Cross-origin Resource sharing because the BackeEnd and the FrontEnd are developed on differen url(domain) and the browser blocks connections(fetch in our case)from react-app to the Flask API.

-React :  
react was used as the front end library wehre we used statet to manage input and img captcha sources and to handle the input form and fetch to request data from the API.

Other Information :
-To run the react app please use this link(http://127.0.0.1:3000/) because localhost is still being blocked to make request by CORS policy on the website.

references :
https://www.geeksforgeeks.org/generate-captcha-using-python/

![architecture](https://user-images.githubusercontent.com/33245901/206473928-83d380a9-3734-4f2e-a69f-a4e3f197914f.png)