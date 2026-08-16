'use client'

import { useState, useRef, useCallback, useEffect, type ComponentProps } from "react"
import { cn } from "@/utils/cn"
import { Assets } from "@/assets";
import Image from "next/image";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { NEXT_PUBLIC_DANGER_HARDCODE_TO_JS_STRAPI_API_TOKEN } from "@/utils/env";

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

export function FormGetQuote({ section, siteData }: CmpProps) {
  const [pageType, setPageType] = useState<'form' | 'done'>('form')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })

  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [invalidFile, setInvalidFile] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [toast, setToast] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED_FORMATS = '.zip,.rar,.7z,.tar,.gz,.bz2,.xz'
  const MAX_FILE_SIZE = 10 * 1024 * 1024
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

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (status === 'error') setStatus('idle')
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0] ?? null
    setValidFile(dropped)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setValidFile(selected)
    e.target.value = ''
  }, [])

  const removeFile = useCallback(() => {
    setFile(null)
    setInvalidFile(null)
  }, [])

  const displayText = siteData?.display_text?.form

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
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
            company: form.company || undefined,
            phone: form.phone || undefined,
            message: form.message,
            relevant_drawings: fileId,
          },
        }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error?.message || `Request failed (${res.status})`);
      }

      setToast(displayText?.success_tips ?? 'Submitted successfully!')
      setForm({ name: '', email: '', company: '', phone: '', message: '' })
      setFile(null)
      setPageType('done')
    } catch (err: unknown) {
      const msg = (err as { data?: { error?: { message?: string } } })?.data?.error?.message
      setToast(msg || displayText?.fail_tips || 'Submission failed, please try again.')
    } finally {
      setStatus('idle')
    }
  }

  if (pageType === 'done') {
    return (
      <div className={cn("bg-[#f6f8fa] min-h-[calc(100vh-100px)]")}>
        <div className="xl:w-7xl xl:mx-auto px-5 xl:px-0 pb-20">
          <div className="flex-col items-center justify-center mt-45">
            <Image src={Assets.SuccessPageIcon} alt="done" className="w-70 mx-auto aspect-28/15" />
            <h1 className="text-black text-2xl mt-15 mb-5 text-center" >{displayText?.success_page_title}</h1>
            <p className="text-[#666] text-base my-0 text-center">{displayText?.success_page_tips}</p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className={cn("bg-[#f6f8fa] min-h-[calc(100vh-100px)]")}>
      <div className="xl:w-7xl xl:mx-auto px-5 xl:px-0 pb-20">
        <h1 className="font-medium text-lg/15 text-primary">{section.payload?.title}</h1>

        <div className="bg-white rounded-xl px-5 py-10 xl:px-10">
          {/* Row 1: Name & Company */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10">
            <div>
              <label className="flex items-center gap-1 text-primary text-base mb-3">
                <span className="text-red-500">*</span>
                {displayText?.name ?? "x"}
              </label>
              <input
                className={cn(
                  "w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none",
                  status === 'error' && !form.name.trim() && 'border-red-400'
                )}
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
              />
              <div className="h-4">
                {status === 'error' && !form.name.trim() && <p className="text-red-500 text-xs mt-1">{displayText?.required_tips}</p>}
              </div>
            </div>
            <div>
              <label className="block text-primary text-base mb-3">{displayText?.company ?? 'Company'}</label>
              <input
                className="w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none"
                value={form.company}
                onChange={e => updateField('company', e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10 mt-5">
            <div>
              <label className="flex items-center gap-1 text-primary text-base mb-3">
                <span className="text-red-500">*</span>
                {displayText?.email ?? "Email"}
              </label>
              <input
                className={cn(
                  "w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none",
                  status === 'error' && (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) && 'border-red-400'
                )}
                type="email"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
              />
              <div className="h-4">
                {status === 'error' && (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) && (
                  <p className="text-red-500 text-xs mt-1">{!form.email.trim() ? displayText?.required_tips : displayText?.invalid_tips}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-primary text-base mb-3">{displayText?.phone}</label>
              <input
                className="w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none"
                type="tel"
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="mt-5">
            <label className="flex items-center gap-1 text-primary text-base mb-3">
              <span className="text-red-500">*</span>
              {displayText?.message ?? "Message"}
            </label>
            <textarea
              className={cn(
                "w-full border border-[#dfdfdf] rounded px-3 py-3 text-primary placeholder:text-secondary outline-none resize-none",
                "h-24 xl:h-12",
                status === 'error' && !form.message.trim() && 'border-red-400'
              )}
              value={form.message}
              onChange={e => updateField('message', e.target.value)}
            />
            <div className="h-4">
              {status === 'error' && !form.message.trim() && <p className="text-red-500 text-xs mt-1">{displayText?.required_tips}</p>}
            </div>
          </div>

          {/* Row 4: File Upload */}
          <div className="mt-5">
            <p className="text-primary text-base mb-3">{displayText?.relevant_drawings ?? 'Relevant Drawings (Optional):'}</p>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_FORMATS}
              className="hidden"
              onChange={handleFileSelect}
            />

            {file ? (
              <div className="flex items-center gap-4 border border-[#dfdfdf] rounded-lg px-4 py-3">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="shrink-0">
                  <rect width="40" height="40" rx="8" fill="#EBF2FF" />
                  <path d="M13 26V20C13 17.2 15.2 15 18 15H20M20 15L17 18M20 15L23 18" stroke="#0076ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="14" y="20" width="12" height="9" rx="2" stroke="#0076ee" strokeWidth="1.5" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-primary text-sm font-medium truncate">{file.name}</p>
                  <p className="text-secondary text-xs mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="text-accent text-sm hover:underline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {displayText?.change ?? "Change"}
                  </button>
                  <span className="text-[#dfdfdf]">|</span>
                  <button
                    type="button"
                    className="text-red-400 text-sm hover:text-red-500"
                    onClick={removeFile}
                  >
                    {displayText?.remove ?? "Remove"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "border border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors",
                  !!invalidFile ? 'border-red-400' : dragOver ? 'border-accent bg-blue-50/50' : 'border-[#dfdfdf] hover:border-accent',
                  'min-h-50 xl:min-h-85 p-5',
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Image src={Assets.Upload} alt="upload" width={64} height={64} className="w-16 h-16 object-cover" />
                <p className="text-primary text-xl xl:text-2xl mt-4 text-center">
                  {displayText?.drap_drop_tips ?? 'Drag & Drop Your Files Here'}
                </p>
                <p className="text-secondary text-sm xl:text-base text-center mt-2 px-4">
                  {displayText?.files_format_tips ?? 'Available file formats'}: zip, rar, 7z, tar, gz, bz2, xz
                </p>

                <div className="flex justify-center mt-13.5">
                  <button
                    type="button"
                    className="border border-accent text-accent h-12 w-50 rounded text-base font-medium hover:bg-accent/5 transition-colors"
                    onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}>
                    {displayText?.browse_files}
                  </button>
                </div>
              </div>
            )}
            <div className="h-4">
              {invalidFile && <p className="text-red-500 text-xs mt-1">{invalidFile}</p>}
            </div>

            {/* Submit */}
            <div className="mt-6 xl:mt-8">
              <button
                className="bg-accent text-white w-full h-14 rounded font-semibold text-lg disabled:opacity-50 hover:bg-accent/90 transition-colors"
                disabled={status === 'loading'}
                onClick={handleSubmit}
              >
                {status === 'loading' ? '...' : (displayText?.submit ?? 'Submit')}
              </button>
            </div>
          </div>
        </div>

        {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      </div>
    </div>
  )
}
