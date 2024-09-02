import {
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  NodeKey,
} from 'lexical'
import { CustomKanban } from '../_components/kanban'

// Helper function to create a new KanbanNode
export const $createKanbanNode = () => {
  return new KanbanNode()
}

// Conversion function to convert a DOM element into a KanbanNode (optional)
const convertKanbanElement = (domNode: Node): DOMConversionOutput | null => {
  if (
    domNode instanceof HTMLElement &&
    domNode.classList.contains('kanban-board')
  ) {
    return { node: $createKanbanNode() }
  }
  return null
}

// Custom KanbanNode class
export class KanbanNode extends DecoratorNode<JSX.Element> {
  constructor(key?: NodeKey) {
    super(key)
  }

  static getType(): string {
    return 'kanban'
  }

  static clone(node: KanbanNode): KanbanNode {
    return new KanbanNode(node.__key)
  }

  // Renders the Kanban component
  decorate(): JSX.Element {
    return <CustomKanban />
  }

  // Creates an empty span element for the node
  createDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = 'kanban-board'
    return span
  }

  // Exports the node to a DOM element
  exportDOM(): DOMExportOutput {
    const div = document.createElement('div')
    div.className = 'kanban-board'
    return { element: div }
  }

  // Handles importing the node from a DOM element
  static importDOM(): DOMConversionMap | null {
    return {
      div: (node: Node) => {
        if (
          node instanceof HTMLElement &&
          node.classList.contains('kanban-board')
        ) {
          return { conversion: convertKanbanElement, priority: 0 }
        }
        return null
      },
    }
  }
}
