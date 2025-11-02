'use client'

import { useContext } from 'react'
import Button from '../../_elements/button'
import Container from '../../_elements/container'
import Heading from '../../_elements/heading'
import { CuratedSetBrowserContext } from './CuratedSetsBrowser'
import SetCreator from './SetCreator'

export default function SetSelector() {
  const { sets, setSelectedSet } = useContext(CuratedSetBrowserContext)

  return (
    <div>
      <Container>
        <div className="flex flex-col gap-2">
          <Heading as="h1">Select a set</Heading>
          <div>
            <SetCreator onCreate={(set) => setSelectedSet(set)} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sets.map((set) => (
              <div
                key={set.id}
                className="flex flex-col gap-0 border border-gray-300  shadow-md bg-[rgba(0,0,0,0.03)] hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedSet(set)}
              >
                <div className="px-2 py-1 border-b border-gray-300 font-bold  text-orange-500 flex items-center flex-wrap justify-between">
                  <p>{set.name}</p>
                </div>
                <div className="p-2">
                  <p>{set.shortDesc}</p>
                  <Button variant="primary">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
