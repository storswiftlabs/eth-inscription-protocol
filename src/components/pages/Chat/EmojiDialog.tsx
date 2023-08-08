import { Dialog, Transition } from '@headlessui/react'
import { Input } from '@nextui-org/react'
import type { CSSProperties } from 'react'
import { Fragment, useState } from 'react'

interface Props {
  isOpen: boolean
  type?: string
  dialogCss?: CSSProperties
  closeModal: () => void
  selectedOK: (x: string) => void
}
export function EmojiDialog({ isOpen, closeModal, selectedOK, dialogCss, type }: Props) {
  const [selected, setSelected] = useState('')
  const [selectedGroupMember, setSelectedGroupMember] = useState(['buenos-aires', 'sydney'])

  const render = () => {
    switch (type) {
      case 'addGroup':
        return <> < Dialog.Title
                    as="h2"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Add Group
                </Dialog.Title >
                    <br />
                    <Input onChange={e => setSelected(e.target.value)}></Input>
                </>
      case 'at':
        return <> < Dialog.Title
                    as="h2"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    @member
                </Dialog.Title >
                    <br />
                    @&nbsp;<Input onChange={e => setSelected(e.target.value)}></Input>
                </>
      case 'emoji':
        return <> < Dialog.Title
                    as="h2"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Add Reaction
                </Dialog.Title >
                    <div className="mt-2">
                        <div className="grid overflow-y-scroll h-[300px] grid-cols-12  scrollbar-hide text-2xl  scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                            {'😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 🥵 🥶 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 👩‍👧‍👦 👩‍👦‍👦 👩‍👧‍👧 👨‍👦 👨‍👧 👨‍👧‍👦 👨‍👦‍👦 👨‍👧‍👧 🤲 👐 🙌 👏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚 🖐 🖖 👋 🤙 💪 🦵 🦶 🖕 ✍️ 🤲🏻 👐🏻 🙌🏻 👏🏻 🙏🏻 👍🏻 👎🏻 👊🏻 ✊🏻 🤛🏻 🤜🏻 🤞🏻 ✌🏻 🤟🏻 🤘🏻 👌🏻 👈🏻 👉🏻 👆🏻 👇🏻 ☝🏻 ✋🏻 🤚🏻 🖐🏻 🖖🏻 👋🏻 🤙🏻 💪🏻 🖕🏻 ✍🏻 🤳🏻 💅🏻 👂🏻 🤲🏼 👐🏼 🙌🏼 👏🏼 🙏🏼 👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼 🤜🏼 🤞🏼 ✌🏼 🤟🏼 🤘🏼 👌🏼 👈🏼 👉🏼 👆🏼 👇🏼 ☝🏼 ✋🏼 🤚🏼 🖐🏼 🖖🏼 👋🏼 🤙🏼 💪🏼 🖕🏼 ✍🏼 🤳🏼'.split(' ').map(t => <span onClick={() => setSelected(t)} className={`cursor-pointer flex justify-center rounded-md hover:bg-slate-200 ${selected === t ? 'bg-slate-200' : ''}`} > {t}</span>)}
                        </div>
                    </div>
                </>
    }
  }
  return <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal} style={{ ...dialogCss }}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            {render()}

                            <div className="mt-4 flex flex-row-reverse">

                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={() => selectedOK(selected)}
                                >
                                    OK!
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex mx-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition >
}
