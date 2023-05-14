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


const SnippetEditor = observer((
  {
    store: {snippetStore}
  }) => {

  const [editorValue, setEditorValue] = useState(null)
  const [editorMode, setEditorMode] = useState("text")
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    setEditorValue(snippetStore?.selectedLabel && JSON.parse(snippetStore?.selectedLabel?.snippet_value || '""'))
    setEditorMode(snippetStore?.selectedLabel && snippetStore?.selectedLabel?.snippet_type || "text")


    // reset the save button when a new label is clicked
    setEditing(false)
    setSaving(false)
    setSaved(true)
  }, [snippetStore.selectedLabel])

  const onEditorValueChange = (newValue) => {
    setEditorValue(newValue)
    setEditing(true)
    setSaved(false)
  }

  function handleSaveSnippet() {
    setSaving(true)
    setEditing(false)

    const data = {
      snippet_id: snippetStore?.selectedLabel.snippet,
      snippet_value: JSON.stringify(editorValue),
      snippet_type: editorMode,
    }

    SnippsAPI.updateSnippet(data, () => {
      snippetStore.handleUpdateLabelSnippet(
        {
          ...snippetStore.selectedLabel,
          snippet_value: data.snippet_value,
          snippet_type: data.snippet_type,
        }
      )
      setSaving(false)
      setSaved(true)
    })
  }

  const handleChangeEditorMode = (e) => {
    setEditorMode(e.target.value)
    setEditing(true)
    setSaved(false)

    // const data = {snippet_id: snippetStore?.selectedLabel.snippet, snippet_type: e.target.value}
    //
    // SnippsAPI.updateSnippet(data, () => {
    //   setEditorMode(data.snippet_type)
    //   snippetStore.handleUpdateLabelSnippet(
    //     {
    //       ...snippetStore.selectedLabel,
    //       snippet_type: data.snippet_type,
    //     }
    //   )
    // })
  }


  return (
    <>
      {snippetStore?.labels?.length > 0 ?
        <>
          <EditorHeader
            handleChangeEditorMode={handleChangeEditorMode}
            editorMode={editorMode}
            snippetName={snippetStore?.selectedLabel?.name}
            handleSaveSnippet={handleSaveSnippet}
            editing={editing}
            saving={saving}
            saved={saved}
          />

          <AceEditor
            mode={editorMode}
            theme="tomorrow"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            width={"100%"}
            height={"1000px"}
            onChange={onEditorValueChange}
            // onBlur={handleOnEditorBlur}
            value={editorValue}
            setOptions={{useWorker: false}}  // https://github.com/ajaxorg/ace/issues/4060#issuecomment-1217133879
          />
        </>
        :
        null
      }
    </>
  )
})


const EditorHeader = (
  {
    handleChangeEditorMode,
    editorMode,
    snippetName,
    handleSaveSnippet,
    editing,
    saving,
    saved,
  }) => {

  // maybe get this from backend??
  const modeOptions = [
    {label: "Text", value: "text"},
    {label: "Python", value: "python"},
    {label: "JavaScript", value: "javascript"},
  ]

  return (
    <>
      <MDBRow>
        <MDBCol>
          <div className={"pb-2"}>
            <select className="select" onChange={handleChangeEditorMode} value={editorMode}>
              {modeOptions.map((i, index) => (
                <option key={index} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>
        </MDBCol>
        <MDBCol className={"text-center fw-bold"}>
          {snippetName}
        </MDBCol>
        <MDBCol className={"text-end"}>
          <MDBBtn size='sm' color='primary' onClick={handleSaveSnippet} disabled={!editing}>
            {saving ? "saving..." : saved ? "saved" : "save"}
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default SnippetEditor
