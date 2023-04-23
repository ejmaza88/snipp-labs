import {
  makeObservable,
  observable,
  action
} from "mobx"


export default class CategoryStore {
  categories = []
  activeCategory = 0
  activeCategoryId = -1

  constructor() {
    makeObservable(this, {
      // observables
      categories: observable,
      activeCategory: observable,
      activeCategoryId: observable,

      // actions
      loadCategoriesArray: action,
      newSnippetCategory: action,
      updateActiveSnippetCategory: action,
      updateActiveSnippetCategoryId: action,
      removeCategoryByIndex: action,
    })
  }

  updateActiveSnippetCategory = (snippetCategoryIndex) => {
    const {new_item, ...others} = this.categories[snippetCategoryIndex]
    if (new_item) this.categories.splice(snippetCategoryIndex, 1, {new_item: false, ...others})  // remove css
    this.activeCategory = snippetCategoryIndex // update active (selected category)
  }

  loadCategoriesArray = allCategories => this.categories = allCategories

  newSnippetCategory = (index, item) => this.categories.splice(index, 0, item)

  updateActiveSnippetCategoryId = snippetCategoryId => this.activeCategoryId = snippetCategoryId

  removeCategoryByIndex = snippetCategoryIndex => this.categories.splice(snippetCategoryIndex, 1)
}