import { makeObservable, observable, computed, action, flow, toJS } from "mobx"

export default class CategoryStore {
    items = []
    activeItem = 0

    constructor() {
        makeObservable(this, {
            // observables
            items: observable,
            activeItem: observable,

            // actions
            loadFromObj: action,
            newItem: action,
            updateActiveItem: action,
            deleteItem: action,
            // double: computed,
            // increment: action,
            // fetch: flow
        })
    }

    loadFromObj = (data) => this.items = data

    newItem = (index, item) => this.items.splice(index, 0, item)

    updateActiveItem = (itemIndex) => {
        const { new_item, ...others} = this.items[itemIndex]
        if (new_item) this.items.splice(itemIndex, 1, {new_item: false, ...others})  // remove css
        this.activeItem = itemIndex // update active (selected category)
    }

    deleteItem = (itemIndex) => this.items.splice(itemIndex, 1)

    // get double() {
    //     return this.value * 2
    // }
    //
    // increment() {
    //     this.value++
    // }
    //
    // *fetch() {
    //     const response = yield fetch("/api/value")
    //     this.value = response.json()
    // }
}