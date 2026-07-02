'use client'

import { useState } from 'react'
import OrderOnlineModal from '@/components/OrderOnlineModal'

export default function OrderNowButton({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children ?? '🛵 Order Now'}
      </button>
      <OrderOnlineModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
