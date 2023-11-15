import { Outlet, Link } from 'react-router-dom'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import UserMenu from './UserMenu'
import MobileHeader from './MobileHeader'
import { useState } from 'react'

export default function Header() {

  const [profileToggle, setProfileToggle] = useState<boolean>(false);
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  return (
    <>
      <div className="w-full fixed top-0 header-bg">
        <div className="text-white hidden md:flex flex-row justify-start items-center
        x-[2rem] lg:px-[5rem] py-[1.5rem] gap-3">
          <div className='w-full max-w-[20rem] text-left'>
            <p className='w-fit font-bold cursor-pointer'><Link to='/'>Tutor LMS</Link></p>
          </div>

          <ul className="w-full max-w-[20rem] flex flex-row justify-start items-center gap-x-[3rem]">
            <li className='cursor-pointer'><Link to='/'>Tutorials</Link></li>
            <li className='cursor-pointer'>Certifications</li>
          </ul>

          <div className='relative cursor-pointer'>
            <input type="text" name="search" id="search" placeholder='Search...'
            className='rounded-3xl py-[0.5rem] px-[1.5rem] focus:outline-none border-[2px]
            border-transparent focus:border-primary-blue/80 text-black font-semibold' />
            <MagnifyingGlassIcon className='h-full w-5 text-black absolute top-0 right-4' />
          </div>

          <div className='ml-auto cursor-pointer'>
            <UserCircleIcon className='h-6 w-6 text-white' onClick={() => setProfileToggle(true)} />
          </div>
        </div>

        <UserMenu profileToggle={profileToggle} setProfileToggle={setProfileToggle} />

        <MobileHeader sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      </div>

      <Outlet />
    </>
  )
}
