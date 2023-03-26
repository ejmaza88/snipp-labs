import {makeObservable, observable, action} from "mobx"

export default class UpdateLinqStore {
  linqIndex = null
  linq = {}
  urlList = []
  idListToArchive = []  // ID's in this list will get archived

  constructor() {
    makeObservable(this, {
      // observables
      linqIndex: observable,
      linq: observable,
      urlList: observable,
      idListToArchive: observable,

      // actions
      loadLinq: action,
      loadUrlList: action,
      addUrlToList: action,
      addIdToArchive: action,
      // removeUrlFromList: action
    })
  }

  loadLinq = (index, linq) => {
    this.linqIndex = index;
    this.linq = linq;
    this.loadUrlList(linq.urls)
  }

  loadUrlList = urlList => this.urlList = urlList

  addUrlToList = (url) => this.urlList.push(url)

  addIdToArchive = (id) => this.idListToArchive.push(id)

  // removeUrlFromList = (linkIndex) => {
  //   this.urlList.splice(linkIndex, 1)
  // }

}