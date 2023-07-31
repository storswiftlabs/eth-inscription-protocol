import { useSendTransaction, useWalletClient } from 'wagmi'
import { swift } from './InterfaceType'


const { data: walletClient } = useWalletClient()


export const cochain = (chainData:swift)=>{
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(chainData), 'utf-8').toString('hex')}` || undefined,
  })
  return sendTransaction()
}