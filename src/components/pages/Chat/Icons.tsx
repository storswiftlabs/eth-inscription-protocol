import type { FillColor } from '@/type/Chat'

export function SendIcon({ fill }: { fill: FillColor }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.1378 10.5689L9.60498 7.30246C8.40816 6.70405 7 7.57434 7 8.91243V15.0875C7 16.4256 8.40816 17.2959 9.60498 16.6975L16.1378 13.4311C17.3171 12.8414 17.3171 11.1585 16.1378 10.5689Z" fill={fill} />
  </svg>
}

export function SpeechIcon({ fill }: { fill: FillColor }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="8" height="13" rx="4" fill={fill} />
    <path d="M5 11C5 12.8565 5.7375 14.637 7.05025 15.9497C8.36301 17.2625 10.1435 18 12 18C13.8565 18 15.637 17.2625 16.9497 15.9497C18.2625 14.637 19 12.8565 19 11" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 21V19" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export function CloudIcon({ fill }: { fill: FillColor }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 19.9909C9 19.9856 8.99549 19.9814 8.9902 19.9818C8.82838 19.9939 8.66491 20 8.5 20C4.91015 20 2 17.0899 2 13.5C2 9.91015 4.91015 7 8.5 7C11.1608 7 13.4482 8.59879 14.4539 10.8881C14.7306 11.518 15.312 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20H9.00911C9.00408 20 9 19.9959 9 19.9909Z" fill={fill} />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4606 11.7249C20.9474 11.1415 22 9.69369 22 8C22 5.79086 20.2091 4 18 4C15.8913 4 14.1638 5.63165 14.011 7.70128C14.776 8.42868 15.3971 9.30566 15.8272 10.2848C15.8695 10.381 15.9279 10.4467 15.9721 10.4798C15.989 10.4924 15.9999 10.4979 16.0054 10.5C17.3146 10.5013 18.5168 10.96 19.4606 11.7249ZM16.0094 10.5012C16.0094 10.5013 16.0085 10.5011 16.0066 10.5005C16.0084 10.5007 16.0094 10.5011 16.0094 10.5012Z" fill={fill} />
  </svg>
}
export function EmojiIcon({ fill, onClick }: { fill: FillColor; onClick: () => void }) {
  return <svg className='cursor-pointer' onClick={onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    <path d="M7.88124 15.7559C8.37391 16.1826 9.02309 16.4909 9.72265 16.6928C10.4301 16.897 11.2142 17 12 17C12.7858 17 13.5699 16.897 14.2774 16.6928C14.9769 16.4909 15.6261 16.1826 16.1188 15.7559" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="10" r="1.25" fill={fill} stroke="white" strokeWidth="0.5" strokeLinecap="round" />
    <circle cx="15" cy="10" r="1.25" fill={fill} stroke="white" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
}
export function PictureIcon({ fill, onClick }: { fill: FillColor; onClick: () => void }) {
  return <svg onClick={onClick} className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 3.17163C2 4.3432 2 6.22882 2 10.0001V14.0001C2 17.7713 2 19.6569 3.17157 20.8285C4.34315 22.0001 6.22876 22.0001 10 22.0001H14C17.7712 22.0001 19.6569 22.0001 20.8284 20.8285C22 19.6569 22 17.7713 22 14.0001V14.0001V10.0001C22 7.16071 22 5.39023 21.5 4.18862V17.0001C20.5396 17.0001 19.6185 16.6185 18.9393 15.9394L18.1877 15.1877C17.4664 14.4664 17.1057 14.1058 16.6968 13.9538C16.2473 13.7867 15.7527 13.7867 15.3032 13.9538C14.8943 14.1058 14.5336 14.4664 13.8123 15.1877L13.6992 15.3009C13.1138 15.8862 12.8212 16.1789 12.5102 16.2335C12.2685 16.2759 12.0197 16.228 11.811 16.0988C11.5425 15.9327 11.3795 15.5522 11.0534 14.7913L11 14.6667C10.2504 12.9176 9.87554 12.043 9.22167 11.7152C8.89249 11.5502 8.52413 11.4792 8.1572 11.5102C7.42836 11.5717 6.75554 12.2445 5.40989 13.5902L3.5 15.5001V2.88745C3.3844 2.97355 3.27519 3.06801 3.17157 3.17163Z" fill={fill} />
    <path d="M3 10C3 8.08611 3.00212 6.75129 3.13753 5.74416C3.26907 4.76579 3.50966 4.2477 3.87868 3.87868C4.2477 3.50966 4.76579 3.26907 5.74416 3.13753C6.75129 3.00212 8.08611 3 10 3H14C15.9139 3 17.2487 3.00212 18.2558 3.13753C19.2342 3.26907 19.7523 3.50966 20.1213 3.87868C20.4903 4.2477 20.7309 4.76579 20.8625 5.74416C20.9979 6.75129 21 8.08611 21 10V14C21 15.9139 20.9979 17.2487 20.8625 18.2558C20.7309 19.2342 20.4903 19.7523 20.1213 20.1213C19.7523 20.4903 19.2342 20.7309 18.2558 20.8625C17.2487 20.9979 15.9139 21 14 21H10C8.08611 21 6.75129 20.9979 5.74416 20.8625C4.76579 20.7309 4.2477 20.4903 3.87868 20.1213C3.50966 19.7523 3.26907 19.2342 3.13753 18.2558C3.00212 17.2487 3 15.9139 3 14V10Z" stroke={fill} strokeWidth="2" />
    <circle cx="15" cy="9" r="2" fill={fill} />
  </svg>
}
export function LockIcon({ fill }: { fill: FillColor }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87868 7.87868C3 8.75736 3 10.1716 3 13V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V13C21 10.1716 21 8.75736 20.1213 7.87868C19.2426 7 17.8284 7 15 7H9C6.17157 7 4.75736 7 3.87868 7.87868ZM12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15ZM15 14C15 15.3062 14.1652 16.4175 13 16.8293V19H11V16.8293C9.83481 16.4175 9 15.3062 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14Z" fill={fill} />
    <path d="M16.5 7.99981V7.99981C16.8043 6.17359 16.0108 4.33842 14.4717 3.30935L14.0979 3.05946C12.0734 1.70579 9.3937 1.87263 7.55269 3.46699L6.66992 4.23149" stroke={fill} strokeWidth="2" strokeLinecap="round" />
  </svg>
}
export function AtIcon({ fill, onClick }: { fill: FillColor; onClick: () => void }) {
  return <svg onClick={onClick} className="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3159" width="22" height="22">
    <path fill={fill} d="M628.571429 442.857143q0-61.714286-30.571429-96.571429T513.714286 311.428571q-36 0-70.857143 17.428572T380 377.142857t-45.428571 78.285714T317.142857 558.285714q0 64 30.571429 98.857143t86 34.857143q54.857143 0 100.571428-38t70-94.857143T628.571429 442.857143z m322.285714 69.142857q0 63.428571-21.142857 112.571429t-56.285715 77.142857-75.142857 42.571428-82.857143 15.714286q-3.428571 0-8.857142 0.285714t-9.428572 0.285715q-54.285714 0-81.142857-30.285715-16-18.857143-18.857143-47.428571-29.714286 37.714286-75.142857 62.857143T422.857143 770.857143q-92 0-142.571429-54.571429T229.714286 562.285714q0-89.714286 37.714285-165.714285t102.285715-120.285715T510.285714 232q49.714286 0 88.571429 20.285714t60.571428 56.857143l1.142858-10.857143 6.285714-32q0.571429-3.428571 3.142857-6.857143t5.428571-3.428571h67.428572q2.857143 0 7.428571 6.285714 2.857143 2.857143 1.714286 9.142857l-68.571429 350.857143q-2.857143 13.714286-2.857142 27.428572 0 22.285714 7.142857 29.714285t25.428571 7.428572q16-0.571429 32.571429-3.142857t41.714285-13.714286 44-28.571429 32.571429-51.142857 13.714286-78.285714q0-166.857143-99.428572-266.285714T512 146.285714q-74.285714 0-142 29.142857t-116.571429 78-78 116.571429T146.285714 512t29.142857 142 78 116.571429 116.571429 78 142 29.142857q130.285714 0 231.428571-82.285715 6.285714-5.142857 13.714286-4.571428t12 6.857143l23.428572 28q4.571429 6.857143 4 13.714285-1.142857 7.428571-6.857143 12.571429-58.285714 47.428571-130 73.142857T512 950.857143q-89.142857 0-170.285714-34.857143t-140-93.714286-93.714286-140-34.857143-170.285714 34.857143-170.285714 93.714286-140 140-93.714286 170.285714-34.857143q196.571429 0 317.714286 121.142857t121.142857 317.714286z" p-id="3160"></path>
  </svg>
}
export function GroupIcon({ fill }: { fill: FillColor }) {
  return <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3145" width="20" height="20">
    <path fill={fill} d="M514.822492 384.987872m-195.880926 0a34.7 34.7 0 1 0 391.761852 0 34.7 34.7 0 1 0-391.761852 0Z" p-id="3146"></path>
    <path fill={fill} d="M217.331863 189.106946m-125.883131 0a22.3 22.3 0 1 0 251.766262 0 22.3 22.3 0 1 0-251.766262 0Z" p-id="3147"></path>
    <path fill={fill} d="M23.144432 522.725469c0 0-7.338479-228.057332 67.739802-201.52591 0 0 37.821389 24.273429 79.029768 33.869901 0 0 46.853363 11.289967 107.254686-5.644983 0 0 0 97.658214 33.869901 152.414553l0 11.289967c0 0-46.853363 0-124.189636 58.14333C186.848953 571.272326 57.014333 593.85226 23.144432 522.725469z" p-id="3148"></path>
    <path fill={fill} d="M798.76516 63.223815c69.433297 0 125.883131 56.449835 125.883131 125.883131S868.762955 315.554576 798.76516 315.554576c-69.433297 0-125.883131-56.449835-125.883131-125.883131S729.331863 63.223815 798.76516 63.223815z" p-id="3149"></path>
    <path fill={fill} d="M998.597574 518.77398c0 0 3.951488-228.057332-71.69129-199.832415 0 0-35.563396 24.273429-79.029768 33.869901 0 0-46.853363 11.289967-107.254686-3.951488 0 0 1.693495 97.658214-29.918412 154.672547l0 11.289967c0 0 46.853363 0 124.189636 56.449835C836.586549 571.272326 968.679162 590.46527 998.597574 518.77398z" p-id="3150"></path>
    <path fill={fill} d="M550.385888 805.53914c0-104.432194 84.674752-189.106946 189.106946-189.106946 36.127894 0 69.997795 10.16097 98.787211 27.660419-49.675854-111.206174-152.414553-97.658214-152.414553-97.658214-43.466373 35.563396-95.964719 62.094818-154.108049 67.739802-3.951488 0-5.644983 0-9.596472 0-45.159868 1.693495-88.62624-12.983462-105.561191-20.886439-35.563396-11.289967-63.788313-29.918412-82.981257-49.111356-1.693495 0-1.693495-1.693495-1.693495-1.693495-162.011025 11.289967-165.962514 231.444322-165.962514 231.444322l0 80.723264c0 0 0 0 0 1.693495s0 1.693495 0 3.951488l0 5.644983c0 52.498346 41.208379 95.964719 94.271224 95.964719l43.466373 0c3.951488 0 5.644983 0 5.644983 0l12.983462 0L382.729879 961.905182l251.766262 0C584.255788 929.164278 550.385888 871.585447 550.385888 805.53914z" p-id="3151"></path>
    <path fill={fill} d="M864.811466 822.47409c0 1.693495-1.128997 2.822492-2.822492 2.822492L764.330761 825.296582l0 97.658214c0 1.693495-1.128997 2.822492-2.822492 2.822492l-43.466373 0c-1.693495 0-2.822492-1.128997-2.822492-2.822492L715.219405 825.296582 617.561191 825.296582c-1.693495 0-2.822492-1.128997-2.822492-2.822492l0-43.466373c0-1.693495 1.128997-2.822492 2.822492-2.822492L715.219405 776.185226 715.219405 678.527012c0-1.693495 1.128997-2.822492 2.822492-2.822492l43.466373 0c1.693495 0 2.822492 1.128997 2.822492 2.822492l0 97.658214L861.988975 776.185226c1.693495 0 2.822492 1.128997 2.822492 2.822492L864.811466 822.47409z" p-id="3152"></path>
  </svg>
}
export function ReplyIcon({ fill }: { fill: FillColor }) {
  return <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2269" width="40" height="40">
    <path fill={fill} d="M937.664 896C884.928 746.944 743.104 640 576 640v128a64.106667 64.106667 0 0 1-33.792 56.448 63.872 63.872 0 0 1-65.664-3.2l-384-256a64 64 0 0 1-0.064-106.496l384-256A64.021333 64.021333 0 0 1 576 256v128c212.032 0 384 171.968 384 384 0 44.928-8.128 87.936-22.336 128z" p-id="2270"></path>
  </svg>
}
