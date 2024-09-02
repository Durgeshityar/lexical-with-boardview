/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { DraggableBlockPlugin_EXPERIMENTAL } from '@lexical/react/LexicalDraggableBlockPlugin'
import { useRef } from 'react'

function isOnMenu(element: HTMLElement): boolean {
  return !!element.closest('[data-draggable-menu]')
}

export default function DraggableBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement
}): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null)
  const targetLineRef = useRef<HTMLDivElement>(null)

  return (
    <DraggableBlockPlugin_EXPERIMENTAL
      anchorElem={anchorElem}
      menuRef={menuRef}
      targetLineRef={targetLineRef}
      menuComponent={
        <div
          ref={menuRef}
          data-draggable-menu // We add a custom attribute to allow the `isOnMenu` function to work
          className="absolute left-0 top-0 rounded-md p-0.5 cursor-grab opacity-0 will-change-transform hover:bg-gray-200 active:cursor-grabbing"
        >
          <div
            className="w-4 h-4 opacity-30"
            style={{
              backgroundImage: 'url(/draggable-block-menu.svg)',
            }}
          />
        </div>
      }
      targetLineComponent={
        <div
          ref={targetLineRef}
          className="pointer-events-none bg-sky-400 h-1 absolute left-0 top-0 opacity-0 will-change-transform"
        />
      }
      isOnMenu={isOnMenu}
    />
  )
}
