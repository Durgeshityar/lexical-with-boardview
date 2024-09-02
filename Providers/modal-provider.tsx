'use client'

import CreateTableModal from '@/components/rich-text-editor/_components/modals/create-table-modal'
import InsertImageModal from '@/components/rich-text-editor/_components/modals/insert-image-modal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // use client -> causes render both on server and client -> mismatch of renders causes hydratin error
  // prevents hydrartion error
  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateTableModal />
      <InsertImageModal />
    </>
  )
}
