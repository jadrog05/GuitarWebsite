'use client'

import { Toaster } from 'sonner'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster className='bg-popover text-popover-foreground' richColors position="bottom-right"/>
      </>
  )
}