import { Button, Image, Input, Loading } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import { useProfile } from '@/store/useProfile'
import { AbbreviatedText } from '@/utils/AbbreviatedText'
import { getProfile } from '@/utils/api'
import { uploadFile } from '@/utils/ipfs'

export function RegisterProfile() {
  const { isConnected, address } = useAccount()
  const [profile, setProfile] = useState({ type: 'create-profile', image: '', text: '' })
  const [profileUpload, setProfileUpload] = useState({ image: [''], text: '' })
  const [isLoading, setIsLoading] = useState(false)
  const setProfileStore = useProfile(s => s.setProfile)
  const profileStore = useProfile(s => s.profile)
  const fileRef = useRef<HTMLInputElement>()
  const isOk = useRef(false)
  const { data, isLoading: sendStatusLoading, isSuccess, sendTransaction } = useSendMessageToChain(profileUpload)
  const sendProfile = async () => {
    setProfileUpload({ ...profile, image: [`ipfs://${await uploadFile(profile.image)}`] })
    isOk.current = true
  }

  useEffect(() => {
    if (isOk.current) {
      sendTransaction()
      setIsLoading(true)
    }
  }, [profileUpload])
  useEffect(() => {
    if (!sendStatusLoading)
      setIsLoading(false)
  }, [sendStatusLoading])

  useEffect(() => {
    if (!data)
      return
    const timer = setInterval(() => {
      getProfile(address!).then(e => setProfileStore(e))
      if (profileStore.text !== '') {
        clearInterval(timer)
        setIsLoading(false)
      }
    }, 2000)
    return () => clearInterval(timer)
  }, [data])
  return isConnected && <>
        {isLoading
          ? <Loading />
          : <>

            <h1 className="font-bold text-3xl m-8">Register</h1>
            <input type="file" ref={fileRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target?.files && e.target?.files[0]
              file && setProfile({ ...profile, image: file })
            }} className='w-0 h-0 none' />
            <div className="border  rounded-xl">

                <Image
                    onClick={() => fileRef.current?.click()}
                    className="rounded-xl cursor-pointer"
                    width={100}
                    alt="NextUI hero Image"
                    src={profile.image ? URL.createObjectURL(profile.image) : '/image.svg'}
                />
            </div>
            <br />
            <Input type="name" label="Name" placeholder={address && AbbreviatedText(address)} onChange={e => setProfile({ ...profile, text: e.currentTarget.value })} />
            <br />
            <Button onClick={sendProfile}>Register</Button>
        </>}

    </>
}
