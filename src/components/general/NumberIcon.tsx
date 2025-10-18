export default function NumberIcon(props: { number: number; active: boolean }) {
  return (
    <div
      className={
        'flex h-8 w-8 items-center justify-center border-2 bg-none text-lg font-bold' +
        (props.active
          ? ' border-orange-500 text-orange-500'
          : ' border-gray-300 text-gray-300')
      }
    >
      {props.number}
    </div>
  )
}
