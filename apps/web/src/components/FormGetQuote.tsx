'use client'

import { useState, useRef, useCallback, useEffect, type ComponentProps } from "react"
import { cn } from "@/utils/cn"

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

function UploadIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8v32M32 8L22 18M32 8l10 10" stroke="#0076ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 40v12a4 4 0 004 4h40a4 4 0 004-4V40" stroke="#0076ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type FormGetQuoteProps = ComponentProps<"div"> & {
  title?: string
}

export function FormGetQuote({ className, title }: FormGetQuoteProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [toast, setToast] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED_FORMATS = '.stp,.step,.stl,.igs,.iges,.prt,.sldprt,.sat,.x_t,.jpg,.png,.pdf,.jpeg,.zip,.rar'

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
    const dropped = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...dropped])
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)])
    }
    e.target.value = ''
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      // TODO: submit to API
      setToast('Submitted successfully!')
      setForm({ name: '', email: '', company: '', phone: '', message: '' })
      setFiles([])
    } catch {
      setToast('Submission failed, please try again.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className={cn("bg-[#f6f8fa]", className)}>
      <div className="xl:w-7xl xl:mx-auto px-5 xl:px-0 pb-20">
        <p className="font-medium text-lg/15 text-primary">{title ?? "Get a Free Quote"}</p>

        <div className="bg-white rounded-xl px-5 py-10 xl:px-10">
          {/* Row 1: Name & Company */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10">
            <div>
              <label className="flex items-center gap-1 text-primary text-base mb-3">
                <span className="text-red-500">*</span>
                Name
              </label>
              <input
                className={cn(
                  "w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none",
                  status === 'error' && !form.name.trim() && 'border-red-400'
                )}
                placeholder="Your name"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-primary text-base mb-3">Company</label>
              <input
                className="w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none"
                placeholder="Your company"
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
                Email
              </label>
              <input
                className={cn(
                  "w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none",
                  status === 'error' && (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) && 'border-red-400'
                )}
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-primary text-base mb-3">Phone</label>
              <input
                className="w-full h-12 border border-[#dfdfdf] rounded px-3 text-primary placeholder:text-secondary outline-none"
                type="tel"
                placeholder="Your phone number"
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="mt-5">
            <label className="flex items-center gap-1 text-primary text-base mb-3">
              <span className="text-red-500">*</span>
              Message
            </label>
            <textarea
              className={cn(
                "w-full border border-[#dfdfdf] rounded px-3 py-3 text-primary placeholder:text-secondary outline-none resize-none",
                "h-24 xl:h-12",
                status === 'error' && !form.message.trim() && 'border-red-400'
              )}
              placeholder="Your message"
              value={form.message}
              onChange={e => updateField('message', e.target.value)}
            />
          </div>

          {/* Row 4: File Upload */}
          <div className="mt-5">
            <p className="text-primary text-base mb-3">Relevant Drawings (Optional):</p>

            <div
              className={cn(
                "border border-dashed border-[#dfdfdf] rounded flex flex-col items-center justify-center cursor-pointer transition-colors",
                dragOver && 'border-accent bg-blue-50/50',
                'min-h-50 xl:min-h-85 p-5',
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_FORMATS}
                className="hidden"
                onChange={handleFileSelect}
              />

              {
                files.length > 0
                  ? (
                    <div className="flex flex-wrap gap-2 px-4 w-full">
                      {files.map((file, i) => (
                        <div key={`${file.name}-${i}`} className="flex items-center gap-2 bg-[#f6f8fa] rounded px-3 py-1.5 text-sm text-primary">
                          <span className="max-w-[180px] truncate">{file.name}</span>
                          <button
                            type="button"
                            className="text-secondary hover:text-primary text-lg leading-none"
                            onClick={e => { e.stopPropagation(); removeFile(i) }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-accent text-sm underline"
                        onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}
                      >
                        Add more
                      </button>
                    </div>)
                  : (
                    <div className="flex flex-col items-center justify-center">
                      <UploadIcon />
                      <p className="text-primary text-xl xl:text-2xl mt-4 text-center">
                        Drag & Drop Your Files Here
                      </p>
                      <p className="text-secondary text-sm xl:text-base text-center mt-2 px-4">
                        Available file formats: stp, step, stl, igs, iges, prt, sldprt, sat, x_t, jpg, png, pdf, jpeg, zip, rar
                      </p>

                      <div className="flex justify-center mt-13.5">
                        <button
                          type="button"
                          className="border border-accent text-accent h-12 w-[200px] rounded text-base font-medium hover:bg-accent/5 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Browse Files
                        </button>
                      </div>
                    </div>)
              }
            </div>

          </div>

          {/* Submit */}
          <div className="mt-6 xl:mt-8">
            <button
              className="bg-accent text-white w-full h-14 rounded font-semibold text-lg disabled:opacity-50 hover:bg-accent/90 transition-colors"
              disabled={status === 'loading'}
              onClick={handleSubmit}
            >
              {status === 'loading' ? '...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
