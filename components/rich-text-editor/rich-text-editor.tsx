'use client'

import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { LexicalComposer } from '@lexical/react/LexicalComposer'

import { HeadingNode } from '@lexical/rich-text'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { CAN_USE_DOM } from '@lexical/utils'

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { EditorThemeClasses } from 'lexical'
import { ListNode, ListItemNode } from '@lexical/list'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'

import ToolbarPlugin from './plugins/toolbar-plugin'
import LoadState from './_components/load-state'
import DraggableBlockPlugin from './plugins/dragable-block-plugin'
import { ImageNode } from './nodes/ImageNode'
import { CustomBlockNode, KanbanNode } from './nodes/blcokNode'

const theme: EditorThemeClasses = {
  text: {
    bold: 'font-bold',
    italic: 'editor-textItalic',
    strikethrough: 'line-through',
    subscript: 'editor-textSubscript',
    superscript: 'editor-textSuperscript',
    underline: 'underline',
    underlineStrikethrough: 'editor-textUnderlineStrikethrough',
    code: 'text-black p-2 bg-[#eee] border border-[#ccc]',
  },
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-xl uppercase font-bold',
    h3: 'text-muted-foreground font-bold text-lg',
  },
  list: {
    nested: {
      listitem: 'ml-4',
    },
    ol: 'list-decimal list-inside',
    ul: 'list-disc list-inside',
    listitem: 'mb-2',
    listitemChecked: 'mb-2 line-through',
    listitemUnchecked: 'mb-2',
  },

  table: 'mt-1',
  tableCell: 'w-20 border border-gray-400 pl-2',
  tableCellHeader: 'bg-gray-100',
  image: 'w-full h-auto',
}

interface RichTextEditorProps {}

const RichTextEditor = ({}: RichTextEditorProps) => {
  const initialConfig = {
    namespace: 'name',
    theme,
    onError: () => {},
    nodes: [
      HeadingNode,
      CodeNode,
      CodeHighlightNode,
      ListNode,
      ListItemNode,
      TableCellNode,
      TableNode,
      TableRowNode,
      ImageNode,
      KanbanNode,
    ],
  }

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport)
      }
    }
    updateViewPortWidth()
    window.addEventListener('resize', updateViewPortWidth)

    return () => {
      window.removeEventListener('resize', updateViewPortWidth)
    }
  }, [isSmallWidthViewport])

  return (
    <Box>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <LoadState />
        <Box className="relative">
          <RichTextPlugin
            contentEditable={
              <div ref={onRef}>
                <ContentEditable
                  className="h-[500px] p-2  lg:pl-5 text overflow-auto outline-none focus:outline-none border border-black rounded-sm "
                  ref={onRef}
                />
              </div>
            }
            placeholder={
              <Box className="absolute text-slate-600 top-2.5 left-2 lg:left-5">
                {'Enter text'}
              </Box>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          {floatingAnchorElem && !isSmallWidthViewport && (
            <>
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            </>
          )}
        </Box>

        <AutoFocusPlugin />
        <HistoryPlugin />
        <ListPlugin />
      </LexicalComposer>
    </Box>
  )
}

export default RichTextEditor
