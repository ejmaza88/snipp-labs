import CategoryStore from "./categoryStore";
import LinqStore from "./linqStore";

export default class RootStore {
  constructor() {
    this.categoryStore = new CategoryStore(this)
    this.linqStore = new LinqStore(this)
  }
}