import React, {useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {MDBBtn, MDBCol, MDBRow} from "mdb-react-ui-kit";
import AceEditor from "react-ace";
import SnippsAPI from "../../helpers/network";


import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";


const SnippetEditor = observer(({store}) => {

  const {snippetStore} = store

  const [editorValue, setEditorValue] = useState(null)
  const [editorMode, setEditorMode] = useState("text")

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

  const handleChangeEditorMode = (e) => {
    setEditorMode(e.target.value)
  }

  return (
    <>
      <MDBRow>
        <MDBCol>
          <div className={"pb-2"}>
            <select className="select" onChange={handleChangeEditorMode} defaultValue={editorMode}>
              <option value="text">Text</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
        </MDBCol>
        <MDBCol className={"text-center"}>
          {snippetStore?.snippet?.name}
        </MDBCol>
        <MDBCol className={"text-end"}>
          <MDBBtn size='sm' color='primary' onClick={handleClick}>Save</MDBBtn>
        </MDBCol>
      </MDBRow>

      <AceEditor
        mode={editorMode}
        theme="tomorrow"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
        width={"100%"}
        height={"1000px"}
        onChange={onChange}
        // onBlur={handleBlur}
        value={editorValue}
        setOptions={{useWorker: false}}  // https://github.com/ajaxorg/ace/issues/4060#issuecomment-1217133879
      />
    </>
  )
})

export default SnippetEditor
