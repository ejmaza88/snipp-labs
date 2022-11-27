import React from 'react';
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { CategoryList } from "./components/categoryList";
import LinqSearch from "./components/linqSearch";
import AddCategory from "./components/addCategory";
import RootStore from "../store/linqs/rootStore";
import { LinqList } from "./components/linqList";
import { useComponentWillMount } from "../helpers/helpers";
import { AddLinq } from "./components/addLinq";
import {LinqUpdate} from "./components/linqUpdateModal";


import '../../css/linqs.css'


const store = new RootStore();


function App(props) {

  const { categories, initSelectedLinqs } = props

  useComponentWillMount(() => {
    // load categories to store
    store.categoryStore.loadFromObj(categories)

    // update the 'active' category item if categories array is Not empty
    if (categories.length > 0) store.categoryStore.updateActiveItemId(categories[0].id)

    // load the linq store
    store.linqStore.loadFromArray(initSelectedLinqs ? initSelectedLinqs : [])
  })

  return (
    <>
      <FadeIn>
        <MDBRow>
          <MDBCol sm={12} md={2} lg={2}>
            <LinqSearch store={store} />
            <CategoryList store={store} />
            <AddCategory store={store} />
          </MDBCol>

          <MDBCol sm={12} md={10} lg={10}>
            <AddLinq store={store} />
            <LinqList store={store} />
            <div className="p-4"/>
            <div className="p-4"/>
          </MDBCol>
        </MDBRow>
        <LinqUpdate />
      </FadeIn>
    </>
  )
}


// component mounts in linqs.html
ReactDOM.render(
  <App {...window.JS_DATA} />,
  document.getElementById('linqs-root')
);
