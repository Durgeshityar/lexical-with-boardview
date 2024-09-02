import { Box } from '@chakra-ui/react'

export const Divider = () => (
  <Box width="1px" bg="#aaa" margin="0 6px" h={4}></Box>
)

import {
  ArrowClockwise,
  ArrowCounterclockwise,
  Code,
  Highlighter,
  Justify,
  JustifyLeft,
  JustifyRight,
  Subscript,
  Superscript,
  TextCenter,
  TypeBold,
  TypeItalic,
  TypeStrikethrough,
  TypeUnderline,
} from 'react-bootstrap-icons'

export enum RichTextAction {
  Bold = 'bold',
  Italics = 'italics',
  Underline = 'underline',
  Strikethrough = 'strikethrough',
  Superscript = 'superscript',
  Subscript = 'subscript',
  Highlight = 'highlight',
  Code = 'code',
  LeftAlign = 'leftAlign',
  CenterAlign = 'centerAlign',
  RightAlign = 'rightAlign',
  JustifyAlign = 'justifyAlign',
  Divider = 'divider',
  Divider2 = 'divider2',
  Divider3 = 'divider3',
  Undo = 'undo',
  Redo = 'redo',
}

export const RICH_TEXT_OPTIONS = [
  { id: RichTextAction.Bold, icon: <TypeBold />, label: 'Bold' },
  { id: RichTextAction.Italics, icon: <TypeItalic />, label: 'Italics' },
  { id: RichTextAction.Underline, icon: <TypeUnderline />, label: 'Underline' },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Highlight,
    icon: <Highlighter />,
    label: 'Highlight',
    fontSize: 10,
  },
  {
    id: RichTextAction.Strikethrough,
    icon: <TypeStrikethrough />,
    label: 'Strikethrough',
  },
  {
    id: RichTextAction.Superscript,
    icon: <Superscript />,
    label: 'Superscript',
  },
  {
    id: RichTextAction.Subscript,
    icon: <Subscript />,
    label: 'Subscript',
  },
  {
    id: RichTextAction.Code,
    icon: <Code />,
    label: 'Code',
  },
  { id: RichTextAction.Divider3 },
  {
    id: RichTextAction.LeftAlign,
    icon: <JustifyLeft />,
    label: 'Align Left',
  },
  {
    id: RichTextAction.CenterAlign,
    icon: <TextCenter />,
    label: 'Align Center',
  },
  {
    id: RichTextAction.RightAlign,
    icon: <JustifyRight />,
    label: 'Align Right',
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: <Justify />,
    label: 'Align Justify',
  },

  { id: RichTextAction.Divider2 },
  {
    id: RichTextAction.Undo,
    icon: <ArrowCounterclockwise />,
    label: 'Undo',
  },
  {
    id: RichTextAction.Redo,
    icon: <ArrowClockwise />,
    label: 'Redo',
  },
]

export const LOW_PRIORIRTY = 1
export const HEADINGS = ['h1', 'h2', 'h3']
