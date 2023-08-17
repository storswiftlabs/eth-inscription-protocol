import { Button, Dropdown, Input, Modal, Text, User } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useRef, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { AbbreviatedText } from '@/utils/AbbreviatedText'
import { getProfile } from '@/utils/requestApi'
import { useChatMessageReply } from '@/store/useChatMessage'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import { ItemType } from '@/utils/InterfaceType'
import { uploadFile } from '@/utils/ipfs'

export function CustomConnectButton() {
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const [visible, setVisible] = useState(false)
  const uploadFileInput = useRef<HTMLInputElement>(null)
  const setOwnerProfileF = useChatMessageReply(state => state.setOwnerProfileF) // 存储一下给公共状态
  const [ownerProfileUpload, setOwnerProfileUpload] = useState({ image: '' })
  const [ownerProfile, setOwnerProfile] = useState({
    image: '',
    text: '',
  })
  const { sendTransaction, isSuccess } = useSendMessageToChain({ type: ItemType.update_profile, image: [ownerProfileUpload.image], text: ownerProfile.text })

  useEffect(() => {
    getProfile(address!).then(e => setOwnerProfile({
      image: e.image[0],
      text: e.text,
    }))
  }, [])

  useEffect(() => {
    (async () => {
      setOwnerProfileF(ownerProfile) // 存储

      setOwnerProfileUpload({ image: `ipfs://${await uploadFile(ownerProfile.image)}` })
    })()
  }, [ownerProfile])

  const handler = () => setVisible(true)
  const closeHandler = () => {
    if (ownerProfileUpload.image.length === 0) {
      typeof window !== 'undefined' && alert('wait a minute')
    }
    else {
      setVisible(false)
      sendTransaction()
    }
  }
  return (
    <div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading'
          const connected
            = ready
            && account
            && chain
            && (!authenticationStatus
              || authenticationStatus === 'authenticated')
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button className='bg-[#0E76FD] px-4 py-2 rounded-xl font-bold' onClick={openConnectModal} type="button">
                      Login
                    </button>
                  )
                }
                if (chain.unsupported) {
                  return (
                    <button className='bg-[#e63333] px-4 py-2 rounded-xl font-bold' onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  )
                }
                return (
                  <div style={{ display: 'flex', gap: 12 }}>

                    <button className='bg-[#dfdfdf] text-black whitespace-nowrap px-3 py-2 rounded-xl font-bold' onClick={handler} type="button">
                      <input type="file" ref={uploadFileInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (!e.target)
                          return

                        const file = e.target?.files && e.target?.files[0]
                        const reader = new FileReader()
                        reader.onload = async function (e) {
                          const dataURL = reader.result as string
                          setOwnerProfile({ ...ownerProfile, image: dataURL })
                        }
                        file && reader.readAsDataURL(file)
                      }} className='w-0 h-0 none' />

                      {account.displayName}

                    </button>
                    <Modal
                      closeButton
                      blur
                      preventClose
                      aria-labelledby="modal-title"
                      open={visible}
                      onClose={() => setVisible(false)
                      }
                    >
                      <Modal.Header>
                        <Text id="modal-title" size={18}>

                          <Text b size={18}>
                            Owner Profile
                          </Text>
                        </Text>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='flex items-center flex-col justify-center'>

                          <User
                            onClick={e => uploadFileInput.current?.click()}
                            className='cursor-pointer'
                            bordered
                            src={ownerProfile.image ? ownerProfile.image : 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
                            name=""
                            size='2xl'
                            css={{ width: '150px', height: '150px' }}
                            color="primary"
                          />
                          <Input
                            clearable
                            underlined
                            labelPlaceholder=""
                            onChange={e => setOwnerProfile({ ...ownerProfile, text: e.target.value })}
                            initialValue={AbbreviatedText(account.address)}
                          />
                        </div>

                      </Modal.Body>
                      <Modal.Footer>

                        <Dropdown>
                          <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
                            {'Chain'}
                          </Dropdown.Button>
                          <Dropdown.Menu
                            aria-label="Single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                          >
                            <Dropdown.Item key="changeNetwork"> <div onClick={openChainModal}>Change Network</div></Dropdown.Item>
                            <Dropdown.Item key="disconnect"> <div onClick={() => disconnect()}>Disconnect</div></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button auto flat color="success" onPress={closeHandler}>
                          OK!
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>

    </div>
  )
}
