export function getTimeDifference(dateTimeStamp: string): string | undefined {
  // 时间字符串转时间戳
  const dateTime = `${dateTimeStamp.split(' ')[0]} ${dateTimeStamp.split(' ')[1]}`

  const timestamp = new Date(dateTime).getTime()
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const halfamonth = day * 15
  const month = day * 30
  const year = day * 365
  const now = new Date().getTime()

  const diffValue = now - timestamp
  let result
  if (diffValue < 0)
    return

  const yearC = diffValue / year as any
  const monthC = diffValue / month as any
  const weekC = diffValue / (7 * day) as any
  const dayC = diffValue / day as any
  const hourC = diffValue / hour as any
  const minC = diffValue / minute as any
  if (yearC >= 1)
    result = `${Number.parseInt(yearC)} year ago`
  else if (monthC >= 1)
    result = `${Number.parseInt(monthC)} month ago`
  else if (weekC >= 1)
    result = `${Number.parseInt(weekC)} week ago`
  else if (dayC >= 1)
    result = `${Number.parseInt(dayC)} day ago`
  else if (hourC >= 1)
    result = `${Number.parseInt(hourC)} hour ago`
  else if (minC >= 1)
    result = `${Number.parseInt(minC)} minute ago`
  else
    result = 'just now'

  return result
}
