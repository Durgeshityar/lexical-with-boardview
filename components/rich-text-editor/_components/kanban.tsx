'use client'

import React, {
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  useEffect,
} from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { Plus, Trash } from 'lucide-react'
import { FaFire } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { motion } from 'framer-motion'

type ColumnType = 'backlog' | 'todo' | 'doing' | 'done'

type CardType = {
  title: string
  id: string
  column: ColumnType
}

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: 'Implement user authentication flow', id: '1', column: 'backlog' },
  { title: 'Design new landing page', id: '2', column: 'backlog' },
  { title: '[SPIKE] Evaluate new API integration', id: '3', column: 'backlog' },
  { title: 'Update API documentation', id: '4', column: 'backlog' },
  // TODO
  { title: 'Research cloud storage solutions', id: '5', column: 'todo' },
  { title: 'Prepare for product demo next week', id: '6', column: 'todo' },
  { title: 'Draft marketing strategy for Q4', id: '7', column: 'todo' },
  // DOING
  { title: 'Develop new feature for user profiles', id: '8', column: 'doing' },
  { title: 'Fix bug in payment gateway integration', id: '9', column: 'doing' },
  // DONE
  {
    title: 'Complete security audit for API endpoints',
    id: '10',
    column: 'done',
  },
]

const initialColumnsData = [
  { title: 'BACKLOG', column: 'backlog', headingColor: 'text-neutral-800' },
  { title: 'TODO', column: 'todo', headingColor: 'text-violet-900' },
  { title: 'IN-PROGRESS ', column: 'doing', headingColor: 'text-blue-800' },
  { title: 'COMPLETE', column: 'done', headingColor: 'text-emerald-800/60' },
]

export const CustomKanban = () => {
  return (
    <div className="h-full w-full text-neutral-50">
      <Board />
    </div>
  )
}

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS)
  const [columns, setColumns] = useState(initialColumnsData)

  // For persistent data
  //   const [hasChecked, setHasChecked] = useState(false)

  //   useEffect(() => {
  //     hasChecked && localStorage.setItem('cards', JSON.stringify(cards))
  //   }, [cards])

  //   useEffect(() => {
  //     const cardData = localStorage.getItem('cards')
  //     setCards(cardData ? JSON.parse(cardData) : DEFAULT_CARDS)
  //     setHasChecked(true)
  //   })

  const addColumn = () => {
    if (columns.length < 4) {
      const newColumn = {
        title: `New Column ${columns.length + 1}`,
        column: `newColumn${columns.length + 1}`,
        headingColor: 'text-gray-700',
      }
      setColumns([...columns, newColumn])
    }
  }

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index))
  }

  return (
    <div className="h-full w-full">
      <Button
        variant={'default'}
        className=""
        disabled={columns.length >= 4}
        onClick={addColumn}
      >
        <span className="flex gap-2 items-center justify-center">
          Column <Plus size={15} />
        </span>
      </Button>

      <div className="flex h-full w-full gap-3 overflow-scroll mt-2">
        {columns.map((colData, i) => (
          <Column
            key={colData.column}
            title={colData.title}
            column={colData.column as ColumnType}
            headingColor={colData.headingColor}
            cards={cards}
            setCards={setCards}
            removeColumn={removeColumn} // Fixed typo
            index={i}
          />
        ))}
        <DeleteBanner setCards={setCards} />
      </div>
    </div>
  )
}

const DeleteBanner = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>
}) => {
  const [active, setActive] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setActive(true)
  }

  const handleDragLeave = () => {
    setActive(false)
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData('cardId')
    setCards((pv) => pv.filter((c) => c.id !== cardId))
    setActive(false)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-neutral-500 bg-neutral-500/20 text bg-neutral-500'
      }`}
    >
      {active ? (
        <FaFire className="animate-bounce text-red-400/40" />
      ) : (
        <Trash className="text-red-400/40" />
      )}
    </div>
  )
}

type ColumnProps = {
  title: string
  headingColor: string
  cards: CardType[]
  column: ColumnType
  setCards: Dispatch<SetStateAction<CardType[]>>
  removeColumn: (i: number) => void
  index: number
}

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  removeColumn,
  index,
}: ColumnProps) => {
  const [active, setActive] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editableTitle, setEditableTitle] = useState(title)

  const handleDrag = (e: DragEvent, card: CardType) => {
    e.dataTransfer?.setData('cardId', card.id)
  }

  const filterdCards = cards.filter((c) => c.column === column)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value)
  }

  const handleTitleSave = () => {
    setIsEditingTitle(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSave()
    }
  }
  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators()
    clearHighlights(indicators)
    const el = getNearestIndicator(e, indicators)
    el.element.style.opacity = '1'
  }

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators()

    indicators.forEach((i) => {
      i.style.opacity = '0'
    })
  }

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = e.clientY - (box.top + DISTANCE_OFFSET)

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    )

    return el
  }

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    )
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    highlightIndicator(e)
    setActive(true)
  }

  const handleDragLeave = () => {
    setActive(false)
    clearHighlights()
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false)
    clearHighlights()

    const cardId = e.dataTransfer.getData('cardId')
    const indicator = getIndicators()
    const { element } = getNearestIndicator(e, indicator)

    const before = element.dataset.before || '-1'

    if (before !== cardId) {
      let copy = [...cards]

      let cardToTransfer = copy.find((c) => c.id === cardId)
      if (!cardToTransfer) return

      cardToTransfer = { ...cardToTransfer, column }
      copy = copy.filter((c) => c.id !== cardId)

      const moveToback = before === '-1'

      if (moveToback) {
        copy.push(cardToTransfer)
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before)

        if (insertAtIndex === undefined) return

        copy.splice(insertAtIndex, 0, cardToTransfer)
      }

      setCards(copy)
    }
  }

  return (
    <div className="w-56 shrink-0 p-0.5">
      <div className="mb-3 flex items-center justify-between">
        {isEditingTitle ? (
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            className={`font-medium ${headingColor}`}
            autoFocus
          />
        ) : (
          <h3
            className={`font-medium ${headingColor}`}
            onClick={() => setIsEditingTitle(true)}
          >
            <span className="flex items-center gap-2">
              {editableTitle}
              <span className="text-slate-400 hover:cursor-pointer">
                <BiEdit size={18} />
              </span>
            </span>
          </h3>
        )}
        <span className="rounded text-sm text-neutral-400">
          {filterdCards.length}
        </span>
        <span>
          <button onClick={() => removeColumn(index)}>
            <BiTrash size={18} className="text-red-500/70 mt-1" />
          </button>
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? 'bg-slate-300/30' : 'bg-slate-300/0'
        }`}
      >
        {filterdCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDrag} />
        ))}
        <DropIndicator beforeId={'-1'} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  )
}

type AddCardProps = {
  column: ColumnType
  setCards: Dispatch<SetStateAction<CardType[]>>
}

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState('')
  const [adding, setAdding] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text.trim().length) return

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    }
    setCards((prevCards) => [...prevCards, newCard])
    setText('')
    setAdding(false)
  }

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add a new task"
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-500 placeholder-violet-300 focus:outline-0"
          ></textarea>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              className="px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:text-stone-400"
              onClick={() => setAdding(false)}
            >
              Close
            </button>

            <motion.button
              layout
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-400"
        >
          <span>Add card</span>
          <FiPlus />
        </button>
      )}
    </>
  )
}

type DropIndicatorProps = {
  beforeId: string | null
  column: string
}

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  )
}

type CardProps = CardType & {
  handleDragStart: Function
}

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="rounded border border-neutral-500/40 bg-neutral-500/20 p-2 text-sm text-neutral-900"
      >
        {title}
      </motion.div>
    </>
  )
}
