'use client'

import Link from 'next/link'

import { DynamicIcon } from 'lucide-react/dynamic'
import type { Tool } from '~/app/dashboard/page'

import Button from '~/app/components/_elements/button'

type ToolCardProps = {
  tool: Tool
}
export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-lg p-6 ${tool.active ? 'bg-card-light shadow' : 'bg-card-dark'}`}
    >
      <div id={tool.id} className="font-bold text-xl flex items-center gap-2">
        {tool.icon && <DynamicIcon name={tool.icon} />}
        {tool.active ? (
          <Link href={tool.trainingLink}>{tool.name}</Link>
        ) : (
          tool.name
        )}
      </div>
      <div className="text-sm">
        <p>{tool.description[0]}</p>
      </div>
      <div className="flex gap-2 mt-auto pt-6 items-center">
        {tool.active ? (
          <Link href={tool.trainingLink} className="flex-1">
            <Button variant="primary" className="w-full">
              {tool.buttonText}
            </Button>
          </Link>
        ) : (
          <Button disabled={true}>Coming Soon</Button>
        )}
        {tool.learnMoreLink && (
          <Link href={tool.learnMoreLink} className="flex-1">
            <Button className="w-full">Learn More</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
