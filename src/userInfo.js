export default class UserInfo{
  constructor(userButton, savedNewsButton, signinButton){
    this.userButton = userButton
    this.savedNewsButton = savedNewsButton
    this.signinButton = signinButton
  }

  setUserInfo(){
    this.userButton.textContent=JSON.parse(localStorage.getItem('user')).name
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
