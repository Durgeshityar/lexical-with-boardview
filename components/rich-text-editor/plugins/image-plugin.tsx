import { $insertNodes, LexicalEditor } from 'lexical'
import { $createImageNode } from '../nodes/ImageNode'

export function imagePlugin(
  editor: LexicalEditor,
  src: string,
  altText?: string
) {
  editor.update(() => {
    const customImageNode = $createImageNode({
      src,
      altText: altText || 'Dummy text',
    })
    $insertNodes([customImageNode])
  })
}
