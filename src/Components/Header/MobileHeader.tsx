import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Sidebar from './Sidebar'

interface MobileHeaderProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileHeader({ sidebarToggle, setSidebarToggle }: MobileHeaderProps) {
  return (
    <div className="text-white flex md:hidden flex-row justify-start items-center
    px-[2rem] lg:px-[5rem] py-[1.5rem] gap-7">
        <div className='w-full max-w-[20rem] text-left'>
          <p className='w-fit font-bold cursor-pointer'>Tutor LMS</p>
        </div>

        <div className='ml-auto'>
          <MagnifyingGlassIcon className='w-5 h-5 cursor-pointer' />
        </div>

        <div onClick={() => setSidebarToggle(true)} >
            <Bars3Icon className="w-7 h-7 cursor-pointer " />
        </div>

        <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
    </div>
  )
}
