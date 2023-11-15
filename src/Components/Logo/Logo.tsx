import { Outlet, Link } from 'react-router-dom'

export default function Logo() {
  return (
    <>
      <div className='fixed w-full py-[2rem] px-[5rem]'>
        <div className='w-fit text-white text-sm lg:text-base mx-auto md:mx-0'><Link to='/'>Tutor LMS</Link></div>
      </div>

      <Outlet />
    </>
  )
}
