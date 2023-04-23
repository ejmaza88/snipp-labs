import {
  makeObservable,
  observable,
  action
} from "mobx"


export default class CategoryStore {
  items = []
  activeItem = 0
  activeItemId = -1

  constructor() {
    makeObservable(this, {
      // observables
      items: observable,
      activeItem: observable,
      activeItemId: observable,

      // actions
      loadFromObj: action,
      newItem: action,
      updateActiveItem: action,
      updateActiveItemId: action,
      deleteItem: action,
    })
  }

  updateActiveItem = (itemIndex) => {
    const {new_item, ...others} = this.items[itemIndex]
    if (new_item) this.items.splice(itemIndex, 1, {new_item: false, ...others})  // remove css
    this.activeItem = itemIndex // update active (selected category)
  }

  loadFromObj = (data) => this.items = data

  newItem = (index, item) => this.items.splice(index, 0, item)

  updateActiveItemId = (itemId) => this.activeItemId = itemId

  deleteItem = (itemIndex) => this.items.splice(itemIndex, 1)
}