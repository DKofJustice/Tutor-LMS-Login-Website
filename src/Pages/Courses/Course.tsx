import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

type Props = {
  keyProp: number,
  title: string,
  description: string
}

export default function Course({ keyProp, title, description }: Props) {
  return (
    <div key={keyProp} className="w-full max-w-[23rem] bg-secondary-blue/40 hover:bg-[#6180C9]/40
    border-2 border-white/10 text-white rounded-[25px] transition-all duration-200">
      <div className="flex flex-col justify-center gap-y-[2rem] lg:gap-y-[4rem] px-[4rem] py-[4rem] pb-[4rem]">
        <div>
          <h2 className="text-[1.1rem] lg:text-[1.5rem] text-left lg:text-center font-bold uppercase">{title}</h2>
        </div>

        <div className='text-left pr-[1rem] text-white/60 text-sm leading-7'>
          <p>{description}</p>
        </div>

        <button className='w-fit flex flex-row items-center gap-x-[1rem]'>
          <span className='text-[1.1rem] lg:text-[1.3rem] font-bold'>Start Course</span>
          <ChevronDoubleRightIcon className='w-7 h-7' />
        </button>
      </div>
    </div>
  )
}
