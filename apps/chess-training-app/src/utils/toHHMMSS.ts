export default function toHHMMSS(sec_num: number) {
  const pad = (num: number) => num.toString().padStart(2, '0')

  const hours = Math.floor(sec_num / 3600)
  const minutes = Math.floor((sec_num % 3600) / 60)
  const seconds = sec_num % 60

  return `${hours > 0 ? pad(hours) + ':' : ''}${pad(minutes)}:${pad(seconds)}` //462:02:17
}
