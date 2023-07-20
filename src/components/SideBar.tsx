import Image from 'next/image'
import Link from 'next/link'

export function SideBar() {
  return (
    <div className="flex flex-col w-44 h-screen px-4 py-8 border-r border-gray-200 bg-black justify-start items-center">
      <Image src="/logo.png" width={50} height={50} alt="Logo" />
      <Link href="/chat"><Image className='m-8' src="/chat.svg" width={30} height={30} alt="Logo" /></Link>
      <Link href="/moment"><Image src="/moment.svg" width={30} height={30} alt="Logo" /></Link>
      <div className="flex flex-col items-center mt-6 -mx-2 text-red">123</div>
    </div>
  )
}
