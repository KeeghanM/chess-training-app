import Image from 'next/image'

export default function Backdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[#393939]">
        <Image
          fill={true}
          className="object-cover object-center w-full h-full grayscale brightness-[.3] max-h-[100vh]"
          src="/images/hero.avif"
          alt="Chess board with pieces set up"
        />
      </div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
    </>
  )
}
