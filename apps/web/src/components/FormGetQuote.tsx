'use client'

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn"
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { NEXT_PUBLIC_DANGER_HARDCODE_TO_JS_STRAPI_API_TOKEN } from "@/utils/env";
import { withLocalePath } from "@/utils";

const ACCEPTED_FORMATS = '.zip,.rar,.7z,.tar,.gz,.bz2,.xz'
const MAX_FILE_SIZE = 10 * 1024 * 1024

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded bg-accent px-6 py-3 text-sm text-white shadow-lg animate-[fadeIn_0.3s_ease-out]">
      {message}
    </div>
  )
}

export function FormGetQuote({ section, siteData }: CmpProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [invalidFile, setInvalidFile] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [toast, setToast] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const displayText = siteData?.display_text?.form
  const title = displayText?.title ?? section.payload?.title ?? "Start Your Injection Mold Project with a Free Quote"
  const emailInvalid = form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const isArchive = (f: File) => ACCEPTED_FORMATS.split(',').some(ext => f.name.toLowerCase().endsWith(ext.slice(1)))

  const setValidFile = (f: File | null) => {
    if (f && !isArchive(f)) {
      setInvalidFile('Only archive files are allowed (zip, rar, 7z, tar, gz, bz2, xz)')
      return
    }
    if (f && f.size > MAX_FILE_SIZE) {
      setInvalidFile('File size must be under 10MB')
      return
    }
    setInvalidFile(null)
    setFile(f)
  }

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (status === 'error') setStatus('idle')
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0] ?? null
    setValidFile(dropped)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setValidFile(selected)
    e.target.value = ''
  }

  const removeFile = () => {
    setFile(null)
    setInvalidFile(null)
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      return
    }
    if (emailInvalid) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      let fileId: number | undefined

      if (file) {
        const fd = new FormData()
        fd.append('files', file)
        const uploadRes = await fetch('/proxy-via-next/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${NEXT_PUBLIC_DANGER_HARDCODE_TO_JS_STRAPI_API_TOKEN}` },
          body: fd,
        })
        if (!uploadRes.ok) throw new Error('File upload failed')
        const [uploaded] = await uploadRes.json()
        fileId = uploaded.id
      }

      const res = await fetch('/proxy-via-next/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NEXT_PUBLIC_DANGER_HARDCODE_TO_JS_STRAPI_API_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            name: form.name,
            email: form.email,
            message: form.message,
            relevant_drawings: fileId,
          },
        }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error?.message || `Request failed (${res.status})`);
      }

      setForm({ name: '', email: '', message: '' })
      setFile(null)
      router.push(withLocalePath(siteData.locale ?? "en", "/get-quote/success"))
    } catch (err: unknown) {
      const msg = (err as { data?: { error?: { message?: string } } })?.data?.error?.message
      setToast(msg || displayText?.fail_tips || 'Submission failed, please try again.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="w-full py-10 xl:py-0">
      <div className="mx-auto w-full bg-white px-5 py-10 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.04)] xl:px-[60px] xl:py-10">
        <h3 className="max-w-[310px] text-[24px] leading-none font-semibold text-primary xl:max-w-[593px] xl:text-[32px]">
          {title}
        </h3>

        <div className="mt-12 grid grid-cols-1 gap-y-5 xl:mt-11 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-0">
          <div>
            <label htmlFor="name" className="sr-only">{displayText?.name ?? 'Name'}</label>
            <input
              id="name"
              type="text"
              placeholder={displayText?.name ?? 'Name'}
              className={cn(
                "h-12 w-full rounded-sm bg-[#f5f5f5] px-5 text-base text-primary outline-none placeholder:text-secondary",
                status === 'error' && !form.name.trim() && "ring-1 ring-red-400"
              )}
              value={form.name}
              onChange={e => updateField('name', e.target.value)}
            />
            <div className="h-4 pt-1">
              {status === 'error' && !form.name.trim() ? <p className="text-xs text-red-500">{displayText?.required_tips}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">{displayText?.email ?? 'Email'}</label>
            <input
              id="email"
              type="email"
              placeholder={displayText?.email ?? 'Email'}
              className={cn(
                "h-12 w-full rounded-sm bg-[#f5f5f5] px-5 text-base text-primary outline-none placeholder:text-secondary",
                status === 'error' && (!form.email.trim() || emailInvalid) && "ring-1 ring-red-400"
              )}
              value={form.email}
              onChange={e => updateField('email', e.target.value)}
            />
            <div className="h-4 pt-1">
              {status === 'error' && (!form.email.trim() || emailInvalid) ? (
                <p className="text-xs text-red-500">
                  {!form.email.trim() ? displayText?.required_tips : displayText?.invalid_tips}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-1 xl:mt-5">
          <label htmlFor="message" className="sr-only">{displayText?.message ?? 'Tell Us'}</label>
          <textarea
            id="message"
            placeholder={displayText?.message ?? 'Tell Us'}
            className={cn(
              "h-24 w-full resize-none rounded-sm bg-[#f5f5f5] px-5 py-3.5 text-base leading-5 text-primary outline-none placeholder:text-secondary",
              status === 'error' && !form.message.trim() && "ring-1 ring-red-400"
            )}
            value={form.message}
            onChange={e => updateField('message', e.target.value)}
          />
          <div className="h-4 pt-1">
            {status === 'error' && !form.message.trim() ? <p className="text-xs text-red-500">{displayText?.required_tips}</p> : null}
          </div>
        </div>

        <div className="mt-4 xl:mt-1">
          <label htmlFor="quote-file" className="sr-only">{displayText?.relevant_drawings ?? 'Relevant Drawings'}</label>
          <input
            id="quote-file"
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FORMATS}
            className="hidden"
            onChange={handleFileSelect}
          />

          {file ? (
            <div className="flex min-h-[96px] flex-col justify-center rounded-sm border border-dashed border-[#dfdfdf] px-5 py-4">
              <p className="truncate text-center text-sm leading-5 text-primary">{file.name}</p>
              <p className="mt-1 text-center text-xs text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="text-sm text-accent transition-opacity hover:opacity-80"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {displayText?.change ?? "Change"}
                </button>
                <button
                  type="button"
                  className="text-sm text-primary transition-opacity hover:opacity-70"
                  onClick={removeFile}
                >
                  {displayText?.remove ?? "Remove"}
                </button>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed bg-white px-5 py-6 transition-colors xl:min-h-[96px] xl:py-5",
                invalidFile ? "border-red-400" : dragOver ? "border-accent bg-accent/5" : "border-[#dfdfdf] hover:border-accent"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <p className="text-center text-sm leading-none text-primary">
                {displayText?.drap_drop_tips ?? 'Drag & Drop Your Files Here'}
              </p>
              <button
                type="button"
                className="mt-4 h-6 w-[120px] rounded-sm border border-accent text-sm leading-5 text-accent transition-colors hover:bg-accent/5"
                onClick={e => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
              >
                {displayText?.browse_files ?? 'Browse Files'}
              </button>
            </div>
          )}

          <div className="h-4 pt-1">
            {invalidFile ? <p className="text-xs text-red-500">{invalidFile}</p> : null}
          </div>
        </div>

        <div className="mt-2 xl:mt-5">
          <button
            className="h-[60px] w-full rounded-sm bg-accent text-base font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
            disabled={status === 'loading'}
            onClick={handleSubmit}
          >
            {status === 'loading' ? '...' : (displayText?.submit ?? 'Submit')}
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
