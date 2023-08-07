/* eslint unicorn/prefer-node-protocol: 0 */
import process from 'process'
import { NFTStorage } from 'nft.storage'

export const nftStorageToken = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN ?? ''

export const endpoint = new URL(process.env.NEXT_PUBLIC_NFT_ENDPOINT_URL ?? '')

export const storage = new NFTStorage({ endpoint, token: nftStorageToken })

export async function uploadFile(file: any) {
  return await storage.storeBlob(new Blob([file]))
}
