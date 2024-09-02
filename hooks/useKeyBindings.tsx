import { useEffect } from 'react'

import { LOW_PRIORIRTY, RichTextAction } from '@/components/constants'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { KEY_ENTER_COMMAND } from 'lexical'

export const useBindingKey = ({
  onAction,
}: {
  onAction: (id: RichTextAction) => void
}) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (event?.key === 'B' && event?.ctrlKey) {
          onAction(RichTextAction.Bold)
        }
        if (event?.key === 'I' && event?.ctrlKey) {
          onAction(RichTextAction.Italics)
        }
        if (event?.key === 'U' && event?.ctrlKey) {
          onAction(RichTextAction.Underline)
        }
        if (event?.key === 'Z' && event?.ctrlKey) {
          onAction(RichTextAction.Undo)
        }
        if (event?.key === 'Y' && event?.ctrlKey) {
          onAction(RichTextAction.Redo)
        }
        return false
      },
      LOW_PRIORIRTY
    )
  })
}
