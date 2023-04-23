import React from "react";
import {observer} from "mobx-react-lite";
import Label from "./label";
import NoItems from "../../shared/noItems";
// import {toJS} from "mobx";


const SnippetLabels = observer((
  {
    store: {snippetStore}
  }) => {

  const handleOnClickCallback = (labelIndex, labelObject) => snippetStore.handleLabelClick(labelIndex, labelObject)
  const handleOnDeleteCallback = (labelIndex) => snippetStore.handleLabelDelete(labelIndex)

  // creates list of labels to be displayed
  const labels = snippetStore.labels && snippetStore.labels.map((i, index) => (
    <Label
      key={i.id}
      labelObject={i}
      labelIndex={index}
      is_active={index === snippetStore.activeLabelIndex}
      handleOnClickCallback={handleOnClickCallback}
      handleOnDeleteCallback={handleOnDeleteCallback}
    />
  ))

  return (
    <>
      <div className="pt-2">
        {snippetStore.labels.length > 0 ? labels : <NoItems label={"No Snippets"}/>}
      </div>
    </>
  )
})

export default SnippetLabels
