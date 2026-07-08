'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const OrderOnlineModal = dynamic(() => import('@/components/OrderOnlineModal'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
    </div>
  ),
})

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
      {isOpen && <OrderOnlineModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  )
}
