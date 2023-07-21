interface ContentData {
  type: string
}
export function ChatContent({ type }: ContentData) {
  return (
        <div className='w-full'>
            {type}
        </div>
  )
}
