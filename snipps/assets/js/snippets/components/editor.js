import React, {useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {MDBBtn, MDBCol, MDBRow} from "mdb-react-ui-kit";
import AceEditor from "react-ace";
import SnippsAPI from "../../helpers/network";


import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/ext-language_tools";


const SnippetEditor = observer(({store}) => {

  const {snippetStore} = store

  const [editorValue, setEditorValue] = useState(null)

  useEffect(() => {
    setEditorValue(snippetStore?.snippet && JSON.parse(snippetStore?.snippet?.snippet_value))
  }, [snippetStore.snippet])

  const onChange = (newValue) => {
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

  return (
    <>
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
    </>
  )
})

export default SnippetEditor
