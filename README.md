# Login-and-Singup-using-React-Redux-ForntEnd-BackEnd
Login and Signup using React / Redux with google authentication  
In this project a react js and Redux front-end and back-end are used to implement the Login and Signup for any system. I n this project a business email can be used to send the confirmation (Activation code) and reset password. 

Front end: JavaScript, React js, Redux js, HTML, CSS, Bootstrap.

Signup: -

        1- User can be registered by using his/her Email and name to create and account.

        2-An email can be registered for one time.

        3-user has an ability to login by using login with google. (Facebook and GitHub can be use in future)

        4-User will receive a confirmation email with the registered email.

        5-The user can’t login to the system if he/she doesn’t activate the email. Because her the status will change from pending to Active/.

        6-The input field is validated by using a designed validator if it is not the create account bottom will not work until the validation is achieved.


Login:

    The login can be done by two methods: 

        a-	Using Login with google authentication. 
 
        b-	By the registering user name and password.

Forgot password:
This operation is done on two steps 
        a-	Sent a rest email to the user email.

        b-	The user can open the link from his email after open it.


Back-end: Node js 
	
        a-	google login API’s is used 

        b-	signup API is designed with two steps:

        c	save data in mongoDB and send confirmation or activation email.

        f	After activation of account the status changed from pending to Active

        c-	login and API designed  

        d-	send a confirmation code 

        e-	send rest password API 

DataBase 

        •	Cluster mongoDB is used 

