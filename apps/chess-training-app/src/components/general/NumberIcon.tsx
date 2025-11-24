export default function NumberIcon({
  number,
  active,
}: {
  number: number
  active: boolean
}) {
  return (
    <div
      className={
        'flex h-8 w-8 items-center justify-center border-2 bg-none text-lg font-bold' +
        (active
          ? ' border-orange-500 text-orange-500'
          : ' border-gray-300 text-gray-300')
      }
    >
      {number}
    </div>
  )
}
