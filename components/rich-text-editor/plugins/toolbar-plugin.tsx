import { ChevronDown, Table } from 'react-bootstrap-icons'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { mergeRegister } from '@lexical/utils'
import {
  HeadingTagType,
  $createHeadingNode,
  $isHeadingNode,
} from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'

import {
  Divider,
  HEADINGS,
  LOW_PRIORIRTY,
  RICH_TEXT_OPTIONS,
  RichTextAction,
} from '@/components/constants'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useBindingKey } from '@/hooks/useKeyBindings'
import ColorPickerPlugin from './color-picker-pkugin'
import { useModal } from '@/hooks/use-modal-store'
import ListPlugin from './list-plugin'
import { CircuitBoardIcon, Image as ImageIcon } from 'lucide-react'
import { $createKanbanNode } from '../nodes/blcokNode'

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [disabledMap, setDisabledMap] = useState<{ [id: string]: boolean }>({
    [RichTextAction.Undo]: true,
    [RichTextAction.Redo]: true,
  })
  const [headingFormat, setHeadingFormat] = useState<HeadingTagType | null>(
    null
  )

  const [selectiondMap, setSelectionMap] = useState<{ [id: string]: boolean }>(
    {}
  )

  const updateToolbar = () => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const newSelectionMap = {
        [RichTextAction.Bold]: selection.hasFormat('bold'),
        [RichTextAction.Italics]: selection.hasFormat('italic'),
        [RichTextAction.Underline]: selection.hasFormat('underline'),
        [RichTextAction.Strikethrough]: selection.hasFormat('strikethrough'),
        [RichTextAction.Subscript]: selection.hasFormat('subscript'),
        [RichTextAction.Superscript]: selection.hasFormat('superscript'),
        [RichTextAction.Code]: selection.hasFormat('code'),
        [RichTextAction.Highlight]: selection.hasFormat('highlight'),
      }
      setSelectionMap(newSelectionMap)
      const headingNode = selection.getNodes()
      const HeadingType = headingNode.forEach((node) => $isHeadingNode(node))
    }
  }

  const debouncedSave = useDebouncedCallback((content) => {
    //console.log(content)
  }, 500)

  useEffect(() => {
    // event listeners of lexical
    return mergeRegister(
      editor.registerUpdateListener(
        ({ editorState, dirtyElements, dirtyLeaves }) => {
          editorState.read(() => {
            updateToolbar()
          })
          if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
            return
          }
          //debouncedSave(JSON.stringify(editorState))
        }
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (payload) => {
          updateToolbar()
          return false
        },
        LOW_PRIORIRTY
      ),

      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setDisabledMap((prevMap) => ({
            ...prevMap,
            undo: !payload,
          }))
          return false
        },
        LOW_PRIORIRTY // if there are multiple event listeners for same commands  , we can configure which  one to run first
      ),

      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setDisabledMap((prevMap) => ({
            ...prevMap,
            undo: !payload,
          }))
          return false
        },
        LOW_PRIORIRTY
      )
    )
  }, [editor, debouncedSave])

  const onAction = (id: RichTextAction) => {
    switch (id) {
      case RichTextAction.Bold: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        break
      }
      case RichTextAction.Italics: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        break
      }
      case RichTextAction.Underline: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        break
      }
      case RichTextAction.Strikethrough: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        break
      }
      case RichTextAction.Superscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')
        break
      }
      case RichTextAction.Subscript: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
        break
      }
      case RichTextAction.Highlight: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')
        break
      }
      case RichTextAction.Code: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
        break
      }
      case RichTextAction.LeftAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
        break
      }
      case RichTextAction.RightAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
        break
      }
      case RichTextAction.CenterAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
        break
      }
      case RichTextAction.JustifyAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
        break
      }
      case RichTextAction.Undo: {
        editor.dispatchCommand(UNDO_COMMAND, undefined)
        break
      }
      case RichTextAction.Redo: {
        editor.dispatchCommand(REDO_COMMAND, undefined)
        break
      }
    }
  }

  useBindingKey({ onAction })

  const getSelectedBtnProps = (isSelected: boolean) =>
    isSelected ? 'bg-gray-200' : ''

  const updateHeading = (heading: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        //update text format
        $setBlocksType(selection, () => $createHeadingNode(heading))
      }
    })
  }

  const { onOpen } = useModal()

  return (
    <div className="flex items-center  overflow-x-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <span className="flex items-center justify-center gap-x-2 text-xs text-muted-foreground ">
              Heading
              <ChevronDown size={12} className="text-muted-foreground" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          <DropdownMenuGroup>
            {HEADINGS.map((heading) => (
              <DropdownMenuItem
                key={heading}
                onClick={() => {
                  updateHeading(heading as HeadingTagType)
                }}
              >
                {heading}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {RICH_TEXT_OPTIONS.map(({ id, icon, label }) =>
        id === RichTextAction.Divider ||
        id === RichTextAction.Divider2 ||
        id === RichTextAction.Divider3 ? (
          <Divider key={id} />
        ) : (
          <Button
            className={`relative group ${getSelectedBtnProps(
              selectiondMap[id]
            )}`}
            variant={'ghost'}
            key={id}
            disabled={disabledMap[id]}
            onClick={() => onAction(id)}
          >
            {icon}

            {/* TODO : Fix tooltip causing by parent div o erflow-x-auto */}
            <span className="fixed -top-5 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-xs text-muted-foreground uppercase z-[99999]">
              {label}
            </span>
          </Button>
        )
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <span className="flex items-center justify-center gap-x-2">
              Insert <ChevronDown size={20} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" onClick={() => {}}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => onOpen('createTable', { activeEditor })}
            >
              <span className="flex gap-x-4">
                <Table size={20} />
                Insert Table
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('insertImage', { activeEditor })}
            >
              <span className="flex gap-x-4">
                <ImageIcon size={20} />
                Insert Image
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.update(() => {
                  const kanbaNode = $createKanbanNode()
                  $insertNodes([kanbaNode])
                })
              }}
            >
              <span className="flex gap-x-4">
                <CircuitBoardIcon size={20} />
                Insert Board
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ColorPickerPlugin />
      <ListPlugin />
    </div>
  )
}

export default ToolbarPlugin
