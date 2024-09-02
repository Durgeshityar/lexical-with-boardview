import { $insertNodes, LexicalEditor } from 'lexical'
import { $createBlockNode } from '../nodes/blcokNode'

export function boardPlugin(
  editor: LexicalEditor,
  rows: number,
  columns: number
) {
  console.log(`Inserting table with ${rows} rows and ${columns} columns`)
  editor.update(() => {
    const customTableNode = $createBlockNode({
      rows,
      columns,
    })
    $insertNodes([customTableNode])
  })
}
