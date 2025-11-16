'use client'

import { useEffect, useRef } from 'react'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const quillRef = useRef<Quill | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)
  const length = useRef(0)
  const warningRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div'),
    )

    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [2, 3, 4, 5, 6, false] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          ['link'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['blockquote'],
        ],
      },
      formats: [
        'background',
        'bold',
        'color',
        'italic',
        'link',
        'size',
        'strike',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
      ],
    })

    quillRef.current = quill

    // Set initial value
    if (value) {
      const delta = quill.clipboard.convert({ html: value })
      quill.setContents(delta, 'silent')
    }

    // Handle text changes
    quill.on('text-change', () => {
      const html = quill.root.innerHTML
      length.current = quill.getLength()

      // Update warning visibility
      if (warningRef.current) {
        warningRef.current.style.display =
          length.current > 40000 ? 'block' : 'none'
      }

      onChange(html)
    })

    isInitialMount.current = false

    return () => {
      quillRef.current = null
      container.innerHTML = ''
    }
  }, []) // Only run once on mount

  // Update content when value prop changes externally
  useEffect(() => {
    if (isInitialMount.current || !quillRef.current) return

    const quill = quillRef.current
    const currentHtml = quill.root.innerHTML

    // Only update if the value is different to avoid cursor issues
    if (currentHtml !== value) {
      const selection = quill.getSelection()
      const delta = quill.clipboard.convert({ html: value })
      quill.setContents(delta, 'silent')

      // Restore selection if possible
      if (selection) {
        quill.setSelection(selection)
      }
    }
  }, [value])

  return (
    <div className="relative">
      <div ref={containerRef} className="bg-white text-black" />
      <p
        ref={warningRef}
        className="text-red-500 absolute bottom-0 right-0 p-2"
        style={{ display: 'none' }}
      >
        Warning: This text is too long.
      </p>
    </div>
  )
}
