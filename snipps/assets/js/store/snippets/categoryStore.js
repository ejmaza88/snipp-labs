import {
  makeObservable,
  observable,
  action,
  // toJS,
} from "mobx"


export default class CategoryStore {
  categories = []
  activeCategoryIndex = 0
  activeCategoryId = -1
  selectedCategory = {}

  constructor() {
    makeObservable(this, {
      // observables
      categories: observable,
      activeCategoryIndex: observable,
      activeCategoryId: observable,

      // actions
      loadCategoriesArray: action,
      newSnippetCategory: action,
      updateActiveSnippetCategory: action,
      updateActiveSnippetCategoryId: action,
      removeCategoryByIndex: action,
      updateSelectedCategory: action,
      handleCategoryClick: action,
    })
  }

  updateActiveSnippetCategory = (snippetCategoryIndex) => {
    const {new_item, ...others} = this.categories[snippetCategoryIndex]
    if (new_item) this.categories.splice(snippetCategoryIndex, 1, {new_item: false, ...others})  // remove css
    this.activeCategoryIndex = snippetCategoryIndex // update active (selected category)
  }

  handleCategoryClick = (categoryIndex, categoryId) => {
    this.updateActiveSnippetCategory(categoryIndex)
    this.updateActiveSnippetCategoryId(categoryId)
    this.updateSelectedCategory(this.categories[categoryIndex])
  }

  loadCategoriesArray = allCategories => this.categories = allCategories

  newSnippetCategory = (index, item) => this.categories.splice(index, 0, item)

  updateActiveSnippetCategoryId = snippetCategoryId => this.activeCategoryId = snippetCategoryId

  removeCategoryByIndex = snippetCategoryIndex => this.categories.splice(snippetCategoryIndex, 1)

  updateSelectedCategory = categoryObject => this.selectedCategory = categoryObject
}