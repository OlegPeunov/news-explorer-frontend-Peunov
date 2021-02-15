export default class Api{
  constructor(config){
    this.url = config.url
    this.authorization= config.authorization

  }

  _getResponseData(res){
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
        mail: mail,
        password: password,
        name: name,
      })
    })
    .then(this._getResponseData)

  }


}