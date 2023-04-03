import CategoryStore from "./categoryStore";
import SnippetStore from "./snippetStore";


export default class RootStore {
  constructor() {
    this.categoryStore = new CategoryStore(this)
    this.snippetStore = new SnippetStore(this)
  }
}
