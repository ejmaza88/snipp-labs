// import { makeObservable, observable, computed, action, flow, toJS } from "mobx"
import { makeObservable, observable, action } from "mobx"

export default class LinqStore {
    items = []

    constructor() {
        makeObservable(this, {
            // observables
            items: observable,

            // actions
            loadFromArray: action,
            newItem: action,
            deleteItem: action,

            // double: computed,
            // increment: action,
            // fetch: flow
        })
    }

    loadFromArray = (data) => this.items = data

    newItem = (item) => this.items.splice(0, 0, item)

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