import { $createTableNodeWithDimensions } from '@lexical/table'
import { $insertNodeToNearestRoot } from '@lexical/utils'
import { LexicalEditor } from 'lexical'

export function tablePlugin(
  editor: LexicalEditor,
  rows: number,
  columns: number
) {
  editor.update(() => {
    const tableNode = $createTableNodeWithDimensions(rows, columns, true)
    $insertNodeToNearestRoot(tableNode)
  })
}
