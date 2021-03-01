export default class FormValidator{
  constructor(formEvent) {
    this.formEvent = formEvent;

  }

  checkInputValidity(inputField){
    const errorElement = document.querySelector(`#error-${event.target.id}`);
    if (!inputField.checkValidity()){
      if(inputField.validity.typeMismatch){
        errorElement.textContent = 'Здесь должен быть имейл';

      } else if (inputField.value.length===0&& inputField.name == 'password'){
        console.log(inputField.name)
        errorElement.textContent = 'Это обязательное поле';


      } else if ( inputField.value.length<8 && inputField.name == 'password'){
        errorElement.textContent = 'Должно быть не менее 8 символов'

      }else if(inputField.value.length<2 && inputField.name == 'name'){
        errorElement.textContent = 'Должно быть от 2 до 30 символов'
      }

      return false;
    };

    if (inputField.checkValidity){
      errorElement.textContent = ''
      return true;
    }
  }
  setSubmitButtonState(submitButton, isValid){
    if (!isValid) {
      submitButton.classList.remove('button-active')
      submitButton.setAttribute('disabled', 'true')
    } else {
      submitButton.classList.add('button-active')
      submitButton.removeAttribute('disabled')
    }
  }
  validateForm(event, submitButton){
    const inputs = Array.from(event.currentTarget.querySelectorAll('input'))
    const isValid = inputs.every((input) => input.validity.valid);
    this.checkInputValidity(event.target);
    this.setSubmitButtonState(submitButton, isValid);
  }

  setEventListeners(){
    const submitButton = this.formEvent.querySelector('button');

    this.formEvent.addEventListener('input', (evt) => {
      this.validateForm(evt, submitButton);
    });
  }


}
