export default class NewsList{
  constructor(newsList, moreNewsButton){
    this.newsList= newsList
    this.moreNewsButton = moreNewsButton
  }

  addCard(cardElement){
    this.newsList.appendChild(cardElement)
  }

  render=(cards)=>{

    this.cards = cards
    this.cards.forEach(card=>{
    this.addCard(card)
    })
  }

  showMoreAdd=()=>{
    this.moreNewsButton.classList.add('results__button-more-news_hidden')
  }


  showMoreRemove=()=>{
    this.moreNewsButton.classList.remove('results__button-more-news_hidden')
  }
}