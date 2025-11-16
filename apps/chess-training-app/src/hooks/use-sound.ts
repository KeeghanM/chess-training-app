import useSound from 'use-sound'

export function useSounds() {
  const [correctSound] = useSound('/sfx/correct.mp3')
  const [incorrectSound] = useSound('/sfx/incorrect.mp3')

  return { correctSound, incorrectSound }
}
