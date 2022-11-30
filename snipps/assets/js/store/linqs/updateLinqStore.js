import {makeObservable, observable, action} from "mobx"

export default class UpdateLinqStore {
  linqIndex = null
  linq = {}
  urlList = []

  constructor() {
    makeObservable(this, {
      // observables
      linqIndex: observable,
      linq: observable,
      urlList: observable,

      // actions
      loadLinq: action,
      loadUrlList: action,
      removeUrl: action,
      addUrl: action,
    })
  }

  loadLinq = (index, linq) => {
    this.linqIndex = index;
    this.linq = linq;
    this.loadUrlList(linq.urls)
  }

  loadUrlList = (linkList) => {
    this.urlList = linkList
  }

  removeUrl = (linkIndex) => {
    this.urlList.splice(linkIndex, 1)
  }

  addUrl = (url) => {
    this.urlList.push(url)
  }

}