export default class Api{
  constructor(config){
    this.url = config.url
    this.authorization= config.authorization
    this.searchForm = config.searchForm
  }

  _getResponseData(res){
    console.log(res)
    if(res.ok){
      return res.json()
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  newUser=(mail, password, name)=>{
    return fetch(`${this.url}/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: mail,
        password: password,
        name: name,
      })
    })
    .then(this._getResponseData)

  }

  signIn=(mail, password)=>{
    return fetch(`${this.url}/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: mail,
        password: password,
      })
    })
    .then(this._getResponseData)

  }

  getUserInfo=(token)=>{
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._getResponseData)
  };


  saveNews=(cardData)=>{

    return fetch(`${this.url}/articles`, {
      method: 'post',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "keyword": `${this.searchForm.elements.searchBox.value}`,
        "title": `${cardData.title}`,
        "text": `${cardData.description}`,
        "date": `${cardData.publishedAt}`,
        "source": `${cardData.source.name}`,
        "link": `${cardData.url}`,
        "image": `${cardData.urlToImage}`
      })
    })
      .then(this._getResponseData)
  }


  getSavedNews=()=>{
    return fetch(`${this.url}/articles`, {
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(this._getResponseData)
  }

  deleteNews=(id)=>{
    return fetch(`${this.url}/articles/${id}`,{
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(this._getResponseData)


  }

}