export function AbbreviatedText(text: string) {
  return text.length > 10 ? `${text.slice(0, 5)}...${text.slice(-5)}` : text
}

/**
* 将数字格式化为易读的字符串，例如将10^6转换为M，将10^3转换为K等
* @param num - 需要格式化的数字
* @returns 格式化后的易读字符串
*/
export function formatNumber(num: number): number | string {
  if (num >= 1000000) { // 如果数字大于等于1,000,000，则除以1,000,000并保留两位小数，并在末尾添加"M"
    return `${(num / 1000000).toFixed(2)} M`
  }
  else if (num >= 1000) { // 如果数字大于等于1,000但小于1,000,000，则除以1,000并保留两位小数，并在末尾添加"K"
    return `${(num / 1000).toFixed(2)} K`
  }
  else { // 如果数字小于1,000，则返回原始数字的字符串形式
    return num
  }
}
