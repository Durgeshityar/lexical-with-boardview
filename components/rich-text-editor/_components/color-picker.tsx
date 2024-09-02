import React, { useEffect, useRef, useState } from 'react'
import { SketchPicker } from 'react-color'

import { Box, IconButton, useOutsideClick } from '@chakra-ui/react'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  icon: React.ReactElement
}

const ColorPicker = ({ color, onChange, icon }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useOutsideClick({ ref, handler: () => setIsOpen(false) })

  useEffect(() => {
    const adjustPosition = () => {
      if (buttonRef.current && ref.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const pickerRect = ref.current.getBoundingClientRect()

        const top = buttonRect.bottom + window.scrollY
        const left = buttonRect.left + window.scrollX

        ref.current.style.top = `${top}px`
        ref.current.style.left = `${left}px`

        // Check if the picker is going out of the viewport and adjust
        if (pickerRect.right > window.innerWidth) {
          ref.current.style.left = `${
            window.innerWidth - pickerRect.width - 10
          }px`
        }

        if (pickerRect.bottom > window.innerHeight) {
          ref.current.style.top = `${
            window.innerHeight - pickerRect.height - 10
          }px`
        }
      }
    }

    adjustPosition()

    window.addEventListener('resize', adjustPosition)
    return () => window.removeEventListener('resize', adjustPosition)
  }, [isOpen])

  return (
    <Box pos={'relative'}>
      <IconButton
        ref={buttonRef}
        icon={icon}
        aria-label="change color"
        size="sm"
        variant="ghost"
        color="#333"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
      />
      {isOpen && (
        <Box
          pos={'fixed'}
          top={'80px'}
          zIndex={9999}
          ref={ref}
          userSelect={'none'}
        >
          <SketchPicker
            color={color}
            onChangeComplete={(color) => {
              onChange(color.hex)
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default ColorPicker
