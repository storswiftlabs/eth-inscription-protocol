import type { ChatContentMessageType } from '@/type/Chat'

export function ChatContentMessage({ data }: ChatContentMessageType) {
  return <div className={`min-h-[100px] w-full flex ${data % 2 === 1 ? 'justify-start' : 'justify-end'}`} >
        <div className={`flex m-4  ${data % 2 === 1 ? '' : 'flex-row-reverse'}`}>
            <div className="relative w-10 m-2  h-10 rounded-xl bg-neutral-200 dark:bg-neutral-500" />
            <div className={`flex flex-col ${data % 2 === 1 ? '' : 'items-end'}`}>
                Nick
                <div className='max-w-[800px] rounded-xl p-2 bg-neutral-200 dark:bg-neutral-700 text-sm'>
                    NextUI needs to be wrapped in a provider to work properly. You need to set up the NextUIProvider at the root of your application.

                    Go to pages/_app.js or pages/_app.tsx (create it if it doesn't exist) and add the following code:</div>
            </div>
        </div>

    </div >
}
