import "./pages/index.css";
import Popup from "./popup";
import FormValidator from './formValidator';
import Api from './api';
import NewsApi from './newsApi';
import UserInfo from './userInfo';
import Results from './results';
import Card from './card';
import NewsList from './newsList';

(function(){

const container = document.querySelector('.root');
const autoristaionButton = container.querySelector('.header__link_type_border');
const signInForm = container.querySelector('#signin');
const signUpForm = container.querySelector('#signup');
const newUserForm = container.querySelector('#new');
const searchForm = container.querySelector('#searchForm');
const registrationButton = container.querySelector('#registration');
const enterButton = container.querySelector('#enter');
const enterNewUserButton = container.querySelector('#newUserEnster');
const userButton = container.querySelector('#userButton');
const savedNewsButton = container.querySelector('#savedButton');
const signinButton = container.querySelector('#signinButton');
const eroorServerSignIn = signInForm.querySelector('#error-server-signIn')
const eroorServer = signUpForm.querySelector('#error-server')
const noResults = container.querySelector('.results__no-reults')
const preload = container.querySelector('.results__loading')
const searhErr = container.querySelector('.results__search-error')
const resultsNews = container.querySelector('.results__news')
const newsList = container.querySelector('.news-list')
const moreNewsButton = container.querySelector('.results__button-more-news')
const cnt = {nmFirsrt:0, nmSec:3}

const newSignIn = new Popup(signInForm)
const newSignUP = new Popup(signUpForm)
const newUser = new Popup(newUserForm)
const ignInValidator = new FormValidator(signInForm);
const signUValidator = new FormValidator(signUpForm);
const userInfo = new UserInfo(userButton, savedNewsButton, signinButton);
const resultsSection = new Results(noResults, preload, searhErr, resultsNews);
const newNewsList = new NewsList(newsList, moreNewsButton);


const newApi = new Api({
  url: 'https://diplompeunov.students.nomoreparties.space',
  authorization: `Bearer ${localStorage.getItem('token')}`,
  searchForm
})



const dateNow = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
const sevenDaysAgo = new Date(Date.parse(dateNow) - (7*24*60*60*1000))
const dateAgotoSend = `${sevenDaysAgo.getFullYear()}-${sevenDaysAgo.getMonth()+1}-${sevenDaysAgo.getDate()}`



const newNewsApi = new NewsApi({
  url: 'https://nomoreparties.co/news/v2/everything?',
  apiKey: '63a3c44da2324836ac31b831238b249e',
  from: dateNow,
  to: dateAgotoSend,
  pageSize: 100
})



if( localStorage.getItem('user')!== null){
  userInfo.setUserInfo()
  userInfo.savedNewsButtonOpen()
  userInfo.userButtonOpen()
}else{
  localStorage.clear()
  userInfo.signinButtonOpen()
  userInfo.userButtonClose()
}


signInForm.addEventListener('submit', function(){
  event.preventDefault()
  const email = signInForm.elements.email.value
  const password = signInForm.elements.password.value
  eroorServerSignIn.textContent = ''

  newApi.signIn(email, password)
  .then((res)=>{
    newSignIn.close()
    localStorage.setItem('token', res.token);

    newApi.getUserInfo(res.token)
      .then((res)=>{
        localStorage.setItem('user', JSON.stringify({
          name: res.name,
          email: res.email
        }));
        userInfo.setUserInfo()
        userInfo.userButtonOpen()
        userInfo.savedNewsButtonOpen()
        userInfo.signinButtonClose()
        location.reload()
      })
      .catch((err)=>{
        console.log(err)
      })
  })
  .catch((err)=>{
    eroorServerSignIn.textContent = err
  })
});


signUpForm.addEventListener('submit', function(){
  event.preventDefault()
  const email = signUpForm.elements.email.value
  const password = signUpForm.elements.password.value
  const name = signUpForm.elements.name.value
  eroorServer.textContent = ''

  newApi.newUser(email, password, name)
  .then((res)=>{
    newSignUP.close()
    newUser.open()
  })
  .catch((err)=>{
    eroorServer.textContent = err
  })
});







searchForm.addEventListener('submit', function(){
  event.preventDefault()
  resultsSection.preLoadOn()
  resultsSection.noResultsClose()
  resultsSection.searhErrClose()
  resultsSection.resultsNewsClose()
  newNewsList.showMoreRemove()
  while (newsList.firstChild) {
    newsList.removeChild(newsList.firstChild);
  }
  const reruest = searchForm.elements.searchBox.value
  cnt.nmFirsrt=0
  cnt.nmSec=3

  newNewsApi.getNews(reruest)
    .then((res)=>{
      console.log(res.articles)
      if(res.articles.length === 0){
        resultsSection.noResultsOpen()
      } else {
        resultsSection.preLoadOff()
        resultsSection.resultsNewsOpen()
        const articles = res.articles
        localStorage.setItem('articles', JSON.stringify({articles}));
        showThree()
      }

    })
    .catch((err)=>{
      console.log(err)
      resultsSection.preLoadOff()
      resultsSection.searhErrOpen()
    })


});


const createCard = cardData => {
  const newCard = new Card(cardData, newApi);
  return newCard.create();
}






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

enterNewUserButton.addEventListener('click', function(){
  newUser.close()
  newSignIn.open()
});

userButton.addEventListener('click', function(){
  localStorage.clear()
  location.reload()
});






function showThree(){
  const articles = JSON.parse(localStorage.getItem('articles'))
  const thThreeArt = articles.articles.slice(cnt.nmFirsrt, cnt.nmSec)
  const cards = thThreeArt.map(cardData =>createCard(cardData));
  newNewsList.render(cards)
  cnt.nmFirsrt+=3
  cnt.nmSec+=3
  if(articles.articles.length <= cnt.nmFirsrt){
    newNewsList.showMoreAdd()
  }
}


moreNewsButton.addEventListener('click', function(){
  showThree()

});


ignInValidator.setEventListeners();
signUValidator.setEventListeners();

}());
