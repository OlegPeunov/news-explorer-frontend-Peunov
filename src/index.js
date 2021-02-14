import "./pages/index.css";
import Popup from "./popup";
import FormValidator from './formValidator';

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
