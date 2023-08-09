/** @format */

export function imageFormat(imgSrc: string) {
  if (imgSrc && imgSrc.includes('https://'))
    return imgSrc
  else
    return `https://ipfs.io/ipfs/${imgSrc?.substring(7).split('?')[0]}`
}
