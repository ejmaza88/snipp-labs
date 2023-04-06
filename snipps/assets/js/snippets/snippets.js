import React from "react";
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in';
import RootStore from "../store/snippets/rootStore";
import {useComponentWillMount} from "../helpers/helpers";
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import SnippetCategories from "./components/categories";
import SnippetLabels from "./components/labels";
import SnippetEditor from "./components/editor";
import AddSnippetCategory from "./components/addCategory";


import '../../css/snippets.css'


const store = new RootStore();



function App({categories, initSelectedSnippets}) {

  const {categoryStore, snippetStore} = store

  useComponentWillMount(() => {
    // load stores
    categoryStore.loadFromObj(categories)
    snippetStore.loadFromObj(initSelectedSnippets)
    snippetStore.loadCodeSnippet(initSelectedSnippets[0])

    // update the 'active' items if array is Not empty
    if (categories.length > 0) categoryStore.updateActiveItemId(categories[0].id)
    if (initSelectedSnippets.length > 0) snippetStore.updateActiveItemId(initSelectedSnippets[0].id)
  })

  return (
    <>
      <FadeIn>
        <MDBRow>
          <MDBCol sm={12} md={2} lg={2}>
            <AddSnippetCategory store={store}/>
            <SnippetCategories store={store}/>
          </MDBCol>

          <MDBCol sm={12} md={2} lg={2}>
            <SnippetLabels store={store}/>
          </MDBCol>

          <MDBCol sm={12} md={8} lg={8}>
            <SnippetEditor store={store}/>
          </MDBCol>
        </MDBRow>

        <div className="p-4"/>
      </FadeIn>
    </>
  )
}

// component mounts in snippets.html
ReactDOM.render(
  <App {...window.JS_DATA} />,
  document.getElementById('snippets-root')
);
