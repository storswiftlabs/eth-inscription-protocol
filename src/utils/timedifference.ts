export function getTimeDifference(timestamp: string): string {
  const currentTime = new Date()
  const targetTime = new Date(timestamp)

  const differenceInMilliseconds = currentTime.getTime() - targetTime.getTime()

  // 计算分钟差值
  const minutes = Math.floor(differenceInMilliseconds / (1000 * 60))
  if (minutes < 60)
    return `${minutes} minutes ago`

  // 计算小时差值
  const hours = Math.floor(minutes / 60)
  if (hours < 24)
    return `${hours} hours ago`

  // 计算天数差值
  const days = Math.floor(hours / 24)

  if (days > 30) {
    const formattedDate = targetTime.toISOString().slice(0, 19).replace('T', ' ')
    return formattedDate
  }
  else {
    return `${days} days ago`
  }
}
