// import { makeObservable, observable, computed, action, flow, toJS } from "mobx"
import {makeObservable, observable, action} from "mobx"

export default class LinqStore {
  items = []

  constructor() {
    makeObservable(this, {
      // observables
      items: observable,

      // actions
      loadFromArray: action,
      newItem: action,
      deleteItem: action,
      updateItems: action,

      // double: computed,
      // increment: action,
      // fetch: flow
    })
  }

  loadFromArray = (data) => this.items = data

  newItem = (item) => this.items.splice(0, 0, item)

  deleteItem = (itemIndex) => this.items.splice(itemIndex, 1)

  updateItems = (itemIndex, linq) => {
    // At "stuffIndex" position add "updatedStuff" and remove 1 item
    this.items.splice(itemIndex, 1, linq)
  }

  // get double() {
  //     return this.value * 2
  // }
  //
  // increment() {
  //     this.value++
  // }
  //
  // *fetch() {
  //     const response = yield fetch("/api/value")
  //     this.value = response.json()
  // }
}