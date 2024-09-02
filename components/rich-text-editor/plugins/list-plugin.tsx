'use'

import React from 'react'

import { IconButton } from '@chakra-ui/react'
import { ListOl, ListUl } from 'react-bootstrap-icons'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'

import { getSelectedBtnProps } from '@/components/utils'

interface ListPluginProps {
  blockType: string
}

export default function ListPlugin() {
  const [editor] = useLexicalComposerContext()

  return (
    <>
      <IconButton
        icon={<ListOl />}
        aria-label="Add Ordered list"
        size="sm"
        variant="ghost"
        onClick={() => {
          console.log(
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          )
        }}
      />

      <IconButton
        icon={<ListUl />}
        aria-label="Add Unordered List"
        size="sm"
        variant="ghost"
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }}
      />
    </>
  )
}
