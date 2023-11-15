import { useEffect, useRef, useState } from 'react'
import { Cog6ToothIcon, CheckCircleIcon, ArrowUturnDownIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface UserMenuProps {
    profileToggle: boolean;
    setProfileToggle: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function UserMenu({ profileToggle, setProfileToggle }: UserMenuProps) {

    const menuRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const [userData, setUserData] = useState({ token: '', email: '' });

    useEffect(() => {
      const storedUserString = localStorage.getItem('user')
      const userDataChanged = storedUserString ? JSON.parse(storedUserString) : null;
      setUserData(userDataChanged || { token: '', email: '' })
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setProfileToggle(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [setProfileToggle]);

    const handleLogout = () => {
      localStorage.removeItem('user');
      setUserData({ token: '', email: '' })
      toast.success('Logout successful')
    }

    const handleLogin = () => {
      navigate('/login')
    }

  return (
    <div className={`max-w-[25rem] absolute right-0 -translate-y-4 -translate-x-14 pl-8 pr-24 py-10 rounded-[20px] bg-white ${ profileToggle ? 'block' : 'hidden' }`} 
    ref={menuRef}>
        { userData.token && userData.email ? (
      <ul className='flex flex-col gap-y-6'>
          <li className='flex flex-row gap-2'>
              <CheckCircleIcon className='w-6 h-6' />
              <span>Hello, {userData.email}</span>
          </li>

          <li className='flex flex-row gap-2 cursor-pointer'>
              <Cog6ToothIcon className='w-6 h-6' />
              <span>Settings</span>
          </li>

          <li className='flex flex-row gap-2 cursor-pointer'>
              <CheckCircleIcon className='w-6 h-6' />
              <span>My Courses</span>
          </li>

          <li className='flex flex-row gap-2 cursor-pointer' onClick={handleLogout}>
              <ArrowUturnDownIcon className='w-6 h-6' />
              <span>Logout</span>
          </li>
      </ul>
        ) : (
          <ul className='flex flex-col gap-y-6'>
            <li className='flex flex-row gap-2 cursor-pointer' onClick={handleLogin}>
              <ArrowUturnDownIcon className='w-6 h-6' />
              <span>Login</span>
          </li>
          </ul>
        )}
    </div>
  )
}
