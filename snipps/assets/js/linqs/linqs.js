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


import '../../css/linqs.css'


const store = new RootStore();


function App(props) {

  const { categories, initSelectedLinqs } = props

  useComponentWillMount(() => {
    store.categoryStore.loadFromObj(categories)
    store.categoryStore.updateActiveItemId(categories[0].id)
    store.linqStore.loadFromArray(initSelectedLinqs)
  })

  return (
    <>
      <FadeIn>
        <MDBRow>

          <MDBCol sm={12} md={2} lg={2}>
            <LinqSearch />
            <CategoryList store={store} />
            <AddCategory store={store} />
          </MDBCol>

          <MDBCol sm={12} md={10} lg={10}>
            <AddLinq store={store} />
            <LinqList store={store} />
          </MDBCol>

        </MDBRow>
      </FadeIn>
    </>
  )
}


// component mounts in linqs.html
ReactDOM.render(
  <App {...window.JS_DATA} />,
  document.getElementById('linqs-root')
);
