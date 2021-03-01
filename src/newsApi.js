export default class NewsApi{
  constructor(config){
    this.url = config.url
    this.apiKey = config.apiKey
    this.from = config.from
    this.to = config.to
    this.pageSize = config.pageSize
  }

  _getResponseData(res){
    if(res.ok){
      return res.json()
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }


  getNews=(q)=>{
    return fetch(`${this.url}q=${q}&from=${this.from}$to=${this.to}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`, {
      headers: {
        method: 'get',
        'Content-Type': 'application/json'
      }
    })
    .then(this._getResponseData)
  }

}