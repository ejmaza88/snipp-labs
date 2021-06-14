import CategoryStore from "./category";
import LabelStore from "./label";

export default class RootStore {
  constructor() {
    this.categoryStore = new CategoryStore(this)
    this.labelStore = new LabelStore(this)
  }
}