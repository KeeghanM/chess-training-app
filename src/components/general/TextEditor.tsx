'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function TextEditor(props: {
  value: string
  onChange: (value: string) => void
}) {
  const [length, setLength] = useState(0)
  const [value, setValue] = useState(props.value)

  const handleChange = (value: string) => {
    setValue(value)
    setLength(value.length)
    props.onChange(value)
  }

  const formats = [
    // inline
    'background',
    'bold',
    'color',
    'italic',
    'link',
    'size',
    'strike',
    'underline',
    // block
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    // embed
    // 'image', // TODO: add image upload
  ]
  const modules = {
    toolbar: [
      // inline
      [{ header: [2, 3, 4, 5, 6, false] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      ['link'],
      // block
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote'],
      // embed
      //   ['image'],
    ],
  }

  return (
    <div className="relative">
      <ReactQuill
        className="bg-white text-black"
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
      />
      {length > 40000 && (
        <p className="text-red-500 absolute bottom-0 right-0 p-2">
          Warning: This text is too long.
        </p>
      )}
    </div>
  )
}
