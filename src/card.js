export default class Card{
  constructor(cardData, newApi){
    this.cardData = cardData;
    this.newApi = newApi
  }

  like=(evt)=> {
    evt.target.classList.toggle('news-card__bookmark-icon_added')
    this.newApi.saveNews(this.cardData)
  }


  create=()=>{

    const date = new Date(this.cardData.publishedAt).toLocaleString('ru',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
    <div class="news-card">
      <div class="news-card__image">
        <button class="news-card__bookmark-icon" data-title="Войдите, чтобы сохранять статьи"></button>
      </div>
      <div class="news-card__description">
        <div class="news-card__text-container">
          <p class="news-card__date"> ${date} </p>
          <h4 class="news-card__title"> ${this.cardData.title}</h4>
          <p class="news-card__text"> ${this.cardData.description} </p>
        </div>
        <p class="news-card__source">${this.cardData.source.name}</p>
      </div>
    </div>`);
    const placeCard = template.firstElementChild;
    placeCard.querySelector(".news-card__image").style.backgroundImage = `url(${this.cardData.urlToImage})`;

    if(!localStorage.getItem('user')){
      placeCard.querySelector(".news-card__bookmark-icon").classList.add('news-card__bookmark-icon_type_message');
    } else{
      placeCard.querySelector(".news-card__bookmark-icon").addEventListener('click', this.like);
    }

    placeCard.addEventListener('click', this.openLink);
    return placeCard
  }

  openLink=()=>{
    if(event.target.className !== "news-card__bookmark-icon news-card__bookmark-icon_added" && event.target.className !== "news-card__bookmark-icon"){
      console.log(this.cardData.url)
      window.open(`${this.cardData.url}`, '_blank')
    }

  }



  createSavedCard=()=>{
    const date = new Date(this.cardData.date).toLocaleString('ru',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
    <div class="news-card" id="${this.cardData._id}">
      <div class="news-card__image">
        <p class="news-card__category"> ${this.cardData.keyword} </p>
        <button class="news-card__delete-icon" data-title="Убрать из сохранённых"></button>
      </div>
      <div class="news-card__description">
        <div class="news-card__text-container">
          <p class="news-card__date"> ${date} </p>
          <h4 class="news-card__title"> ${this.cardData.title}</h4>
          <p class="news-card__text"> ${this.cardData.text} </p>
        </div>
        <p class="news-card__source">${this.cardData.source}</p>
      </div>
    </div>`);
    const placeCard = template.firstElementChild;
    placeCard.querySelector(".news-card__image").style.backgroundImage = `url(${this.cardData.image})`;


    placeCard.querySelector(".news-card__delete-icon").addEventListener('click', this.deleteCard);


    placeCard.addEventListener('click', this.openLinkSaved);
    return placeCard
  }

  openLinkSaved=()=>{
    if(event.target.className !== "news-card__bookmark-icon news-card__bookmark-icon_added" && event.target.className !== "news-card__bookmark-icon" && event.target.className !== "news-card__delete-icon"){
      window.open(`${this.cardData.link}`, '_blank')
    }

  }

  _removeEventListeners=(card)=>{
    card.querySelector('.news-card__delete-icon').removeEventListener('click', this.deleteCard)
    card.removeEventListener('click', this.openLinkSaved)
  }


  deleteCard=()=>{
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      const card = event.target.closest('.news-card');

      this.newApi.deleteNews(card.id)
        .then(()=>{

          card.parentElement.removeChild(card);
          this._removeEventListeners(card)

        })
        .catch((err)=>{
          console.log(err)
        })
    }

  }


}