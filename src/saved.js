import "./pages/index.css";
import UserInfo from './userInfo';
import Api from './api';
import Card from './card';
import NewsList from './newsList';
import MobileMenu from './mobileMenu';


(function(){
const container = document.querySelector('.root');
const userButton = container.querySelector('#userButton');
const newsList = container.querySelector('#news-list-saved');
const artclesAmount = container.querySelector('#news-amount');
const keywords = container.querySelector('#keywords');
const changeName = container.querySelector('#changename');
const menuButton = container.querySelector('.header__mobile-menu')
const header = container.querySelector('.header-saved')
const headerNav = container.querySelector('.header__navigation')
const headerMenu = container.querySelector('.header__menu')



const mobileMenu = new MobileMenu(menuButton, header, headerNav, headerMenu);
const userInfo = new UserInfo(userButton, changeName);
const newNewsList = new NewsList(newsList);
const newApi = new Api({
  url: 'https://diplompeunov.students.nomoreparties.space',
  authorization: `Bearer ${localStorage.getItem('token')}`
})


if( localStorage.getItem('user')!== null){
  userInfo.setUserInfo()
  newApi.getSavedNews()
  .then((res)=>{
    const userName =JSON.parse(localStorage.getItem('user')).name
    findKeyWords(res)
    artclesAmount.textContent= `${userName}, у вас ${res.data.length}`

  })
  .catch((err)=>{
    console.log(err)
  })
}else{
  window.location.href = './index.html'
}


function findKeyWords(res){
  const allwords = res.data.map(element => {
    return element.keyword
  });
  const objWords={}
  allwords.forEach(element => {
    if(!objWords[element]){
      objWords[element] = +1
    }else{
      objWords[element] +=1
    }
  });

  const keysToShow = []

  for (var key in objWords) {
    keysToShow.push([key, objWords[key]]);
  }

  keysToShow.sort(function(a, b) {
    return  b[1]-a[1];
  });

  if (keysToShow.length>3){
    keywords.textContent=`${keysToShow[0][0]}, ${keysToShow[1][0]} и ${keysToShow.length - 2}-м другим`
  }else{
    const words = keysToShow.map(cardData =>{return cardData[0]});
    keywords.textContent=words
  }


}





newApi.getSavedNews()
  .then((res)=>{
    const cards = res.data.map(cardData =>createCard(cardData));
    newNewsList.render(cards)

  })
  .catch((err)=>{
    console.log(err)
  })


const createCard = cardData => {
  const newCard = new Card(cardData, newApi);
  return newCard.createSavedCard();
}


menuButton.addEventListener('click', function(){
  mobileMenu.mobleMenuOpenToggle()
})

userButton.addEventListener('click', function(){
  localStorage.clear()
  location.reload()
});

}());