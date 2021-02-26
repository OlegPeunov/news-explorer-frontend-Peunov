export default class Results{
  constructor(noResults, preload, searhErr, resultsNews){
    this.noResults = noResults
    this.preload = preload
    this.searhErr= searhErr
    this.resultsNews = resultsNews

  }
  noResultsOpen=()=>{
    this.noResults.classList.add('results_is-opened')
  }

  noResultsClose=()=>{
    this.noResults.classList.remove('results_is-opened')
  }

  preLoadOn=()=>{
    this.preload.classList.add('results_is-opened')
  }

  preLoadOff=()=>{
    this.preload.classList.remove('results_is-opened')
  }

  searhErrOpen=()=>{
    this.searhErr.classList.add('results_is-opened')
  }

  searhErrClose=()=>{
    this.searhErr.classList.remove('results_is-opened')
  }

  resultsNewsOpen=()=>{
    this.resultsNews.classList.add('results_is-opened')
  }

  resultsNewsClose=()=>{
    this.resultsNews.classList.remove('results_is-opened')
  }


}