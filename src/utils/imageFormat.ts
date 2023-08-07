/** @format */

export const imageFormat = (imgSrc: string) => {
  if (imgSrc&&imgSrc.indexOf("https://") > -1) {
    return imgSrc;
  } else {
    console.log( `https://ipfs.io/ipfs/${imgSrc?.substring(7).split("?")[0]}`);
    
    return `https://ipfs.io/ipfs/${imgSrc?.substring(7).split("?")[0]}`;
  }
};
