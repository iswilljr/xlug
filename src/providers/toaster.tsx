'use client'

import { Toaster as ToastProvider } from 'sonner'

const toastClassName = `
!border-neutral-300 !bg-white
data-[type="error"]:!border-red-300
data-[type="success"]:!border-green-300
data-[type="error"]:!bg-red-100
data-[type="success"]:!bg-green-100
data-[type="error"]:!text-red-700
data-[type="success"]:!text-green-700
dark:!border-neutral-800 dark:!bg-neutral-950
dark:!text-neutral-100 dark:data-[type="error"]:!border-red-800
dark:data-[type="success"]:!border-green-800
dark:data-[type="error"]:!bg-red-950
dark:data-[type="success"]:!bg-green-950
dark:data-[type="error"]:!text-red-300
dark:data-[type="success"]:!text-green-300
`

export function Toaster() {
  return <ToastProvider theme='light' toastOptions={{ className: toastClassName }} />
}
