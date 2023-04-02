import React, {useState} from "react";
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in';
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import SnippsAPI from "../helpers/network"
import CategoryItem from "../linqs/components/categoryItem";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/ext-language_tools";


import '../../css/snippets.css'


function App(props) {
  const [editorValue, setEditorValue] = useState(JSON.parse(props.initSelectedSnippet[0].snippet_value))

  function onChange(newValue) {
    setEditorValue(newValue)
  }

  function handleClick() {
    const data = {
      snippet_value: JSON.stringify(editorValue)
    }

    SnippsAPI.saveUpdateSnippet(data, (data) => {
      setEditorValue(JSON.parse(data.codeSnippet))
    })
  }

  function handleAddCategory() {
    console.log("Super!!!!!")
  }

  // creates list of categories to be displayed
  const categoryItems = props.categories && props.categories.map((i, index) => (
    <CategoryItem
      key={i.id}
      item={i}
      itemIndex={index}
      active={false}
      makeCategoryActiveFunc={() => null}
      deleteCategoryFunc={() => null}
      loadLinqItemsFunc={() => null}
    />
  ))

  const snippetLabels = props.initSelectedSnippet && props.initSelectedSnippet.map((i, index) => (
    <CategoryItem
      key={i.id}
      item={i}
      itemIndex={index}
      active={false}
      makeCategoryActiveFunc={() => null}
      deleteCategoryFunc={() => null}
      loadLinqItemsFunc={() => null}
    />
  ))

  return (
    <>
      <FadeIn>
        <MDBRow>
          <MDBCol sm={12} md={2} lg={2}>
            <div>
              <MDBInputGroup size={"sm"}>
                <input className='form-control' type='text'/>
                <MDBBtn onClick={handleAddCategory}><i className="fas fa-plus"/></MDBBtn>
              </MDBInputGroup>
            </div>
            <div className="pt-2">
              {categoryItems}
            </div>
          </MDBCol>

          <MDBCol sm={12} md={2} lg={2}>
            <div>
              <MDBInputGroup size={"sm"}>
                <input className='form-control' type='text'/>
                <MDBBtn onClick={handleAddCategory}><i className="fas fa-plus"/></MDBBtn>
              </MDBInputGroup>
            </div>
            <div className="pt-2">
              {snippetLabels}
            </div>
          </MDBCol>

          <MDBCol sm={12} md={8} lg={8}>

            <MDBRow>
              <MDBCol>
                <div className={"pb-2"}>
                  <select className="select">
                    <option value="1">Text</option>
                    <option value="2">Python</option>
                    <option value="3">JavaScript</option>
                  </select>
                </div>
              </MDBCol>
              <MDBCol className={"text-end"}>
                <MDBBtn size='sm' color='primary' onClick={handleClick}>Save</MDBBtn>
              </MDBCol>
            </MDBRow>

            <AceEditor
              mode="python"
              theme="github"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              width={"100%"}
              height={"1000px"}
              onChange={onChange}
              // onBlur={handleBlur}
              value={editorValue}
            />

          </MDBCol>
        </MDBRow>
        <br/>
        <br/>
      </FadeIn>
    </>
  )
}

// component mounts in snippets.html
ReactDOM.render(
  <App {...window.JS_DATA} />,
  document.getElementById('snippets-root')
);
