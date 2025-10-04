'use client'

import Link from 'next/link'

import type { Tool } from '~/app/dashboard/page'

import Button from '~/app/components/_elements/button'

export default function ToolGrid(props: { tool: Tool }) {
  const { tool } = props

  return (
    <div className="flex flex-col gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)]  hover:shadow-lg transition-shadow duration-300">
      <div
        id={tool.id}
        className={
          'px-2 py-1 border-b border-gray-300  font-bold' +
          (tool.active ? ' text-orange-500' : '')
        }
      >
        {tool.active ? (
          <Link href={tool.trainingLink}>{tool.name}</Link>
        ) : (
          tool.name
        )}
      </div>
      <div className="p-2 text-sm">
        <p>{tool.description[0]}</p>
      </div>
      <div className="flex flex-col gap-2 p-2 mt-auto items-center">
        {tool.active ? (
          <Link href={tool.trainingLink}>
            <Button variant="primary">{tool.buttonText}</Button>
          </Link>
        ) : (
          <Button variant="secondary" disabled={true}>
            Coming Soon
          </Button>
        )}
        {tool.learnMoreLink && (
          <Link href={tool.learnMoreLink}>
            <Button variant="secondary">Learn More</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
