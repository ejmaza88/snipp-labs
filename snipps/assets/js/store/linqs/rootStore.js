import CategoryStore from "./categoryStore";
import LinqStore from "./linqStore";
import UpdateLinqStore from "./updateLinqStore";


export default class RootStore {
  constructor() {
    this.categoryStore = new CategoryStore(this)
    this.linqStore = new LinqStore(this)
    this.updateLinqStore = new UpdateLinqStore(this)
  }
}
