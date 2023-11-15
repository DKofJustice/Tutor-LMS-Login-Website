import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import { RootState } from '../../Context/store'
import { useDispatch } from 'react-redux';
import { clearToken } from '../../Context/authSlice'
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface MobileHeaderProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ sidebarToggle, setSidebarToggle }: MobileHeaderProps) {

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    toast.success('Logout successful')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className={`md:hidden absolute w-[80%] max-w-[40rem] 
    h-screen bg-blue-300 border-l-2 border-white/10 overflow-y-auto top-0 ${sidebarToggle ? 'right-0' : '-right-[30rem]'}`}>
        <div className='w-full flex flex-col gap-y-[1.5rem] px-[3rem] py-[2rem]'>
            <div className='flex flex-row justify-end'>
                <XMarkIcon className='w-7 h-7' onClick={() => setSidebarToggle(false)} />
            </div>

            { token && user ? (
              <ul className='flex flex-col items-start gap-y-[1.5rem] py-[3rem]'>
                <li className='mb-[2rem]'>Hello, {user}</li>
                <li><Link to='/'>Tutorials</Link></li>
                <li>Certifications</li>
                <li>My Courses</li>
                <li>Settings</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            ) : (
              <ul className='flex flex-col items-start gap-y-[1.5rem] py-[3rem]'>
                <li>Tutorials</li>
                <li>Certifications</li>
                <li onClick={handleLogin}>Login</li>
              </ul>
            )}
        </div>
    </div>
  )
}
