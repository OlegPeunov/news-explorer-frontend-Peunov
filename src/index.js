import "./pages/index.css";
import Popup from "./popup";
import FormValidator from './formValidator';
import Api from './api';

(function(){

const container = document.querySelector('.root');
const autoristaionButton = container.querySelector('.header__link_type_border');
const signInForm = container.querySelector('#signin');
const signUpForm = container.querySelector('#signup');
const registrationButton = container.querySelector('#registration');
const enterButton = container.querySelector('#enter');


const newSignIn = new Popup(signInForm)
const newSignUP = new Popup(signUpForm)
const ignInValidator = new FormValidator(signInForm);
const signUValidator = new FormValidator(signUpForm);

const newApi = new Api({
  url: `${(NODE_ENV==='development') ? 'http://diplompeunov.students.nomoreparties.space' : 'https://diplompeunov.students.nomoreparties.space'}`,
  authorization: '61bfbbef-2f0f-4ba0-a4c0-c034d01c7f11' /* исправить перед отпарвкой!*/
})





signUpForm.addEventListener('submit', function(){
  event.preventDefault()

  const email = signUpForm.elements.email.value
  const password = signUpForm.elements.password.value
  const name = signUpForm.elements.name.value

  newApi.newUser(email, password, name)
  .then((res)=>{
    console.log(res)
    // userInfo.setUserInfo(res.name, res.about, res.avatar)
  })
  .catch((err)=>{
    console.log(err)
  })
  console.log(email, password, name)
});


enterButton.addEventListener('click', function(){
  newSignUP.close()
  newSignIn.open()
});

registrationButton.addEventListener('click', function(){
  newSignIn.close()
  newSignUP.open()
});

autoristaionButton.addEventListener('click', function(){
  newSignIn.open()
});


ignInValidator.setEventListeners();
signUValidator.setEventListeners();

}());
