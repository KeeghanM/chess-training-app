import NumberIcon from '@components/general/NumberIcon'

export default function Steps(props: { currentStep: string }) {
  const { currentStep } = props

  return (
    <div className="mx-auto my-4 w-max ">
      <div className="mx-auto flex items-center gap-4">
        <div className="flex flex-col items-center gap-1 md:flex-row">
          <NumberIcon number={1} active={currentStep == 'name'} />
          <p className="text-sm">Name & Details</p>
        </div>
        <div className="flex flex-col items-center  gap-1 md:flex-row">
          <NumberIcon number={2} active={currentStep == 'import'} />
          <p className="text-sm">Import PGN</p>
        </div>
        <div className="flex flex-col items-center  gap-1 md:flex-row">
          <NumberIcon number={3} active={currentStep == 'group'} />
          <p className="text-sm">Select Grouping</p>
        </div>
      </div>
    </div>
  )
}
