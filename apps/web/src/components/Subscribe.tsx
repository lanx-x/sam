'use client';

import { useState, useEffect, type ComponentProps } from "react";
import { cn } from "@/utils/cn"
import { fetchStrapi } from "@/utils/strapi";

type Props = ComponentProps<"div"> & { label?: string, placeholder?: string };

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-accent text-white text-sm px-6 py-3 rounded shadow-lg animate-[fadeIn_0.3s_ease-out]">
      {message}
    </div>
  )
}

export function Subscribe({ className, label, placeholder }: Props) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [toast, setToast] = useState<string | null>(null)

  const handleSubmit = async () => {
    const email = value.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      await fetchStrapi('/subscribers', {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_FORM_TOKEN}` },
        method: 'POST',
        body: JSON.stringify({ data: { email } }),
      })
      setStatus('success')
      setValue('')
      setToast('Subscribed successfully!')
    } catch (err: unknown) {
      setStatus('error')
      const msg = (err as { data?: { error?: { message?: string } } })?.data?.error?.message
      setToast(msg ?? 'Subscription failed, please try again.')
    }
  }

  return (
    <>
      <div className={cn("relative bg-bg w-full h-12 rounded-sm overflow-hidden flex flex-row justify-start", className)}>
        <input
          className={cn(
            "flex-1 text-sm h-full border-none text-primary px-4 placeholder:text-secondary outline-none",
            status === 'error' && 'bg-red-100'
          )}
          type="email"
          placeholder={placeholder ?? "Enter your business email"}
          value={value}
          onChange={e => { setValue(e.target.value); setStatus('idle') }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button
          className="bg-accent h-full w-30 text-white disabled:opacity-50"
          disabled={status === 'loading'}
          onClick={handleSubmit}
        >
          {status === 'loading' ? '...' : label ?? 'subscribe'}
        </button>
      </div>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  )
}
