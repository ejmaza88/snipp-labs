import {
  makeObservable,
  observable,
  action
} from "mobx"


export default class SnippetStore {
  items = []
  activeLabelIndex = 0
  activeLabelId = -1
  selectedLabel = {}

  constructor() {
    makeObservable(this, {
      // observables
      items: observable,
      activeLabelIndex: observable,
      activeLabelId: observable,
      selectedLabel: observable,

      // actions
      // labels
      loadFromObj: action,
      newItem: action,
      updateActiveItem: action,
      updateActiveItemId: action,
      deleteItem: action,
      handleLabelClick: action,
      handleLabelDelete: action,
      handleNewLabelFromServer: action,
      updateStoreLabels: action,
      handleUpdateLabelSnippet: action,

      // snippets
      loadSelectedLabelObject: action
    })
  }

  // Labels
  loadFromObj = (data) => this.items = data

  handleLabelClick = (labelIndex, labelObject) => {
    this.updateActiveItem(labelIndex)
    this.updateActiveItemId(labelObject.id)
    this.loadSelectedLabelObject(labelObject)
  }

  handleLabelDelete = (labelIndex) => {
    this.deleteItem(labelIndex)
    const defaultLabel = this.items.length > 0 ? this.items[0] : null
    this.items.length > 0 ? this.handleLabelClick(0, defaultLabel) : null
    this.loadSelectedLabelObject(defaultLabel || {})
  }

  handleNewLabelFromServer = (labelObject) => {
    this.newItem(labelObject)
    this.loadSelectedLabelObject(labelObject)
    this.updateActiveItemId(labelObject.id)
    this.updateActiveItem(0)
  }

  handleUpdateLabelSnippet = (labelObject) => {
    this.loadSelectedLabelObject(labelObject)
    this.updateStoreLabels(this.activeLabelIndex, labelObject)
  }

  updateStoreLabels = (labelIndex, labelObject) => this.items.splice(labelIndex, 1, labelObject)

  newItem = (labelObject) => this.items.splice(0, 0, labelObject)

  updateActiveItem = (labelIndex) => {
    const {new_item, ...others} = this.items[labelIndex]
    if (new_item) this.items.splice(labelIndex, 1, {new_item: false, ...others})  // remove css
    this.activeLabelIndex = labelIndex // update active (selected category)
  }

  updateActiveItemId = (labelId) => this.activeLabelId = labelId

  deleteItem = (itemIndex) => this.items.splice(itemIndex, 1)


  // Code Snippets
  loadSelectedLabelObject = (labelObject) => this.selectedLabel = labelObject
}