import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React, { useEffect } from 'react'

const text = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello I'm Durgesh Chandrakar, I'm a ","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"color: #33bcee;","text":"TS","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" full stack ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Developer","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 👋","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":"color: #33bcee;"},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This text-editor is made using ","type":"text","version":1},{"detail":0,"format":8,"mode":"normal","style":"","text":"Lexical","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" an Open source library for creating a rich ","type":"text","version":1},{"detail":0,"format":128,"mode":"normal","style":"","text":"text editor","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"  ✨","type":"text","version":1}],"direction":"ltr","format":"justify","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":"ltr","format":"justify","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":" I created a board view just like Notion's, Try it  ","type":"text","version":1},{"detail":0,"format":16,"mode":"normal","style":"","text":"Insert> Insert Board","type":"text","version":1}],"direction":"ltr","format":"justify","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"My main focus was creating this board, so some features may be buggy. Just undo ","type":"text","version":1},{"detail":0,"format":17,"mode":"normal","style":"color: #9013fe;","text":"ctrl + z","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

export default function LoadState() {
  const [editor] = useLexicalComposerContext()
  //
  useEffect(() => {
    const newState = editor.parseEditorState(text)
    editor.setEditorState(newState)
    editor.setEditable(true)
  }, [editor])

  return <></>
}
