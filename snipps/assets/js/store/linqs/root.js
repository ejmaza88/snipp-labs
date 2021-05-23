import CategoryStore from "./category";

export default class RootStore {
  constructor() {
    this.categoryStore = new CategoryStore(this)
  }
}