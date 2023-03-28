import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import FadeIn from 'react-fade-in';
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import SnippsAPI from "../helpers/network"

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/ext-language_tools";


import '../../css/snippets.css'


function App(props) {
  const [editorValue, setEditorValue] = useState("")

  useEffect(() => {
    setEditorValue(JSON.parse('"import React, {useState, useEffect} from \\"react\\";\\nimport ReactDOM from \'react-dom\';\\nimport FadeIn from \'react-fade-in\';\\nimport {\\n  MDBCol,\\n  MDBRow,\\n  MDBBtn,\\n  MDBCard,\\n  MDBCardBody\\n} from \'mdb-react-ui-kit\';\\nimport SnippsAPI from \\"../helpers/network\\"\\n\\nimport AceEditor from \\"react-ace\\";\\n\\nimport \\"ace-builds/src-noconflict/mode-java\\";\\nimport \\"ace-builds/src-noconflict/theme-github\\";\\nimport \\"ace-builds/src-noconflict/ext-language_tools\\";\\n\\n\\nimport \'../../css/snippets.css\'\\n\\n\\nfunction App(props) {\\n  const [editorValue, setEditorValue] = useState(\\"\\")\\n\\n  useEffect(() =>{\\n    setEditorValue(JSON.parse(\'\\"function onLoad(editor) {\\\\\\\\n    console.log(\\\\\\\\\\"i\\\\\'ve loaded\\\\\\\\\\");\\\\\\\\n}\\"\'))\\n  }, [])\\n\\n  function onChange(newValue) {\\n    setEditorValue(newValue)\\n  }\\n\\n  function handleClick() {\\n    const data = {\\n      snippet_value: JSON.stringify(editorValue)\\n    }\\n\\n    SnippsAPI.saveUpdateSnippet(data, (data) => {\\n      console.log(data)\\n    })\\n  }\\n\\n  // function handleBlur() {\\n  //   console.log(editorValue)\\n  // }\\n\\n  return (\\n    <>\\n      <FadeIn>\\n        <MDBRow>\\n          <MDBCol sm={12} md={2} lg={2}>\\n            <MDBCard shadow=\'1\'>\\n              <MDBCardBody>\\n                <MDBBtn rounded size=\'sm\' color=\'primary\' onClick={handleClick}>Show</MDBBtn>\\n              </MDBCardBody>\\n            </MDBCard>\\n          </MDBCol>\\n\\n          <MDBCol sm={12} md={2} lg={2}>\\n            <MDBCard shadow=\'1\'>\\n              <MDBCardBody>\\n                Placeholder\\n              </MDBCardBody>\\n            </MDBCard>\\n          </MDBCol>\\n\\n          <MDBCol sm={12} md={8} lg={8}>\\n            <AceEditor\\n              mode=\\"java\\"\\n              theme=\\"github\\"\\n              name=\\"UNIQUE_ID_OF_DIV\\"\\n              editorProps={{$blockScrolling: true}}\\n              width={\\"100%\\"}\\n              height={\\"1000px\\"}\\n              onChange={onChange}\\n              // onBlur={handleBlur}\\n              value={editorValue}\\n            />\\n          </MDBCol>\\n        </MDBRow>\\n      </FadeIn>\\n    </>\\n  )\\n}\\n\\n// component mounts in snippets.html\\nReactDOM.render(\\n  <App {...window.JS_DATA} />,\\n  document.getElementById(\'snippets-root\')\\n);\\n"'))
  }, [])

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
            <div>
              Fimed
            </div>
            <div>
              Django
            </div>
            <div>
              Python
            </div>
            <div>
              Postgres
            </div>
            <div>
              Terminal
            </div>
            <div>
              Linux
            </div>
          </MDBCol>

          <MDBCol sm={12} md={2} lg={2}>
            <div>
              <MDBInputGroup size={"sm"}>
                <input className='form-control' type='text'/>
                <MDBBtn onClick={handleAddCategory}><i className="fas fa-plus"/></MDBBtn>
              </MDBInputGroup>
            </div>
            <div>
              Servers
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
              mode="javascript"
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
