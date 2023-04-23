import {
  makeObservable,
  observable,
  action
} from "mobx"


export default class SnippetStore {
  labels = []
  activeLabelIndex = 0
  activeLabelId = -1
  selectedLabel = {}

  constructor() {
    makeObservable(this, {
      // observables
      labels: observable,
      activeLabelIndex: observable,
      activeLabelId: observable,
      selectedLabel: observable,

      // actions
      loadLabelsArray: action,
      newItem: action,
      updateActiveLabel: action,
      updateActiveLabelId: action,
      deleteItem: action,
      handleLabelClick: action,
      handleLabelDelete: action,
      handleNewLabelFromServer: action,
      updateStoreLabels: action,
      handleUpdateLabelSnippet: action,
      loadSelectedLabelObject: action,
      loadLabelsAndSelectedObject: action,
    })
  }

  handleLabelClick = (labelIndex, labelObject) => {
    this.updateActiveLabel(labelIndex)
    this.updateActiveLabelId(labelObject.id)
    this.loadSelectedLabelObject(labelObject)
  }

  handleLabelDelete = (labelIndex) => {
    this.deleteItem(labelIndex)
    const defaultLabel = this.labels.length > 0 ? this.labels[0] : null
    this.labels.length > 0 ? this.handleLabelClick(0, defaultLabel) : null
    this.loadSelectedLabelObject(defaultLabel || {})
  }

  handleNewLabelFromServer = (labelObject) => {
    this.newItem(labelObject)
    this.loadSelectedLabelObject(labelObject)
    this.updateActiveLabelId(labelObject.id)
    this.updateActiveLabel(0)
  }

  handleUpdateLabelSnippet = (labelObject) => {
    this.loadSelectedLabelObject(labelObject)
    this.updateStoreLabels(this.activeLabelIndex, labelObject)
  }

  updateActiveLabel = (labelIndex) => {
    const {new_item, ...others} = this.labels[labelIndex]
    if (new_item) this.labels.splice(labelIndex, 1, {new_item: false, ...others})  // remove css
    this.activeLabelIndex = labelIndex // update active (selected category)
  }

  loadLabelsAndSelectedObject = (allLabelObjects) => {
    this.loadLabelsArray(allLabelObjects)
    this.loadSelectedLabelObject(allLabelObjects[0] || {})
  }

  updateActiveLabelId = (labelId) => this.activeLabelId = labelId

  deleteItem = (itemIndex) => this.labels.splice(itemIndex, 1)

  // the object that is currently being viewed or clicked or selected :p
  loadSelectedLabelObject = (labelObject) => this.selectedLabel = labelObject

  updateStoreLabels = (labelIndex, labelObject) => this.labels.splice(labelIndex, 1, labelObject)

  newItem = (labelObject) => this.labels.splice(0, 0, labelObject)

  // loads the labels store from the server
  // an array for objects [{...}, {...}, {...}]
  loadLabelsArray = (allLabelObjects) => this.labels = allLabelObjects
}