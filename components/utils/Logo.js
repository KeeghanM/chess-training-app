import Image from "next/image"
import { useRouter } from "next/router"

export default function Logo(props) {
  const router = useRouter()
  return (
    <Image
      src="/chesstrainingapplogo.png"
      alt="ChessTraining.app Logo"
      width="90"
      height="90"
      priority
    />
  )
}
