export default class UserInfo{
  constructor(userButton, changeName, savedNewsButton, signinButton){
    this.userButton = userButton
    this.changeName = changeName
    this.savedNewsButton = savedNewsButton
    this.signinButton = signinButton

  }

  setUserInfo(){
    this.changeName.textContent=JSON.parse(localStorage.getItem('user')).name
  }

  savedNewsButtonOpen(){
    this.savedNewsButton.classList.add('header__link_is-opened')
  }

  userButtonOpen(){
    this.userButton.classList.add('header__link_is-opened')
  }

  userButtonClose(){
    this.userButton.classList.remove('header__link_is-opened')
  }

  signinButtonOpen(){
    this.signinButton.classList.add('header__link_is-opened')
  }

  signinButtonClose(){
    this.signinButton.classList.remove('header__link_is-opened')
  }

}
