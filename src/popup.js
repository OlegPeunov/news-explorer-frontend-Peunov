
export default class Popup{
  constructor(element){

    this.element = element.closest('.popup');
    const closeButton = this.element.querySelector('.popup__close');

    closeButton.addEventListener('click', this.close)
    this.element.addEventListener('click', (event)=>{
      if(event.target.classList[0]==='popup'){
        this.close()
      }
    })
  }


  open(){
    this.element.classList.add('popup_is-opened')
    window.addEventListener('keydown', this.keypress);
  }


  close=()=>{
    this.element.classList.remove('popup_is-opened')
    window.removeEventListener('keydown', this.keypress)
    this.reset()
  }

  keypress=(event)=>{
    if(event.key==='Escape'){

      this.close()
    }
  }

  reset=()=>{
    const inputs = this.element.querySelectorAll('.popup__input')
    const errorSpans = this.element.querySelectorAll('.error-message')

    errorSpans.forEach(error => {
      error.textContent = ''
    });

    inputs.forEach(input => {
      input.value=''
    });
  }

}