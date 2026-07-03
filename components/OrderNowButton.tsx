'use client'

import { useState } from 'react'
import OrderOnlineModal from '@/components/OrderOnlineModal'

export default function OrderNowButton({
  className,
  children,
  onClick,
}: {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onClick?.()
          setIsOpen(true)
        }}
        className={className}
      >
        {children ?? '🛵 Order Now'}
      </button>
      <OrderOnlineModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
