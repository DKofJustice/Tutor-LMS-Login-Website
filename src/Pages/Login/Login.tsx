import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { EyeIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler  } from 'react-hook-form' 
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  email: string
  password: string
}

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const navigate = useNavigate();


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (errors.email && errors.email.message) {
        return toast.error(errors.email.message);
      } else if (errors.password && errors.password.message) {
        return toast.error(errors.password.message);
      }
  
      const response = await axios.post("http://localhost:8081/login", {
        email: data.email,
        password: data.password,
      });

      toast.success('Login successful')
      reset();

      const token = response.data.accessToken;
      const email = response.data.email;

      localStorage.setItem('user', JSON.stringify({token, email}));

      const storedUserString = localStorage.getItem('user')
      const userData = storedUserString ? JSON.parse(storedUserString) : null;
      console.log(userData)

      navigate('/')

    } catch(error) {
      if (
        typeof error === 'object' &&
        error &&
        'response' in error &&
        typeof error.response === 'object' &&
        error.response &&
        'data' in error.response &&
        typeof error.response.data === 'string'
      ) {
        console.log(error)
        toast.error('An internal error has occured: ' + error.response.data)
      }
    }
  }

  return (
    <div className="w-full h-full py-[5rem] lg:py-[12rem]">
      <div className="w-full max-w-[40rem] bg-transparent md:bg-secondary-blue/40 mx-auto rounded-xl md:border-2 border-0 border-white/10
      py-[5rem] px-[3rem] md:px-[5rem]">
        <div className="w-full h-full text-white flex flex-col items-center gap-y-[3rem]">
          <div className='w-full flex flex-row justify-start'>
            <h2 className="text-[1.1rem] lg:text-[1.5rem] font-bold">Login</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center gap-y-[3rem]'>
            <div className="w-full flex flex-col items-start gap-y-[1rem]">
                <label htmlFor="email">Email</label>
                <input 
                {...register('email', {
                  required: 'Email is required',
                })}
                type="email" name="email" id="email" className='w-full rounded-xl 
                px-[1.5rem] py-[0.5rem] text-[1rem] text-black' />
              </div>

              <div className="relative w-full flex flex-col items-start gap-y-[1rem]">
                <label htmlFor="password">Password</label>
                <input 
                {...register('password', {
                  required: 'Password is required',
                })}
                type="password" name="password" id="password" className='w-full rounded-xl 
                px-[1.5rem] py-[0.5rem] text-[1rem] text-black'
                />
                <EyeIcon className='text-black w-5 h-5 absolute right-5 top-[3.2rem] cursor-pointer'/>
              </div>

              <div className='w-full flex flex-row justify-start'>
                <p className='text-white/30'>Forgot Password?</p>
                <Link to='/register' className='ml-auto cursor-pointer'>Sign up</Link>
              </div>

              <button 
              disabled={isSubmitting}
              type='submit'
              className={`w-full bg-primary-red font-bold text-[1.2rem] px-[1.5rem] py-[0.5rem]
              rounded-2xl ${isSubmitting ? 'opacity-40' : 'opacity-100'}`}>Login</button>
          </form>

          <div className='w-full flex flex-row items-center'>
            <div className='w-full h-[1px] bg-white/10'></div>
            <p className='px-[3rem]'>or</p>
            <div className='w-full h-[1px] bg-white/10'></div>
          </div>

          <div className='w-full flex flex-row items-center justify-center gap-[3rem]'>
            <button className='cursor-default w-full max-w-[6rem] bg-white opacity-30 px-[1rem] py-[0.5rem] rounded-2xl'><GoogleIcon className='text-black' /></button>
            <button className='cursor-default w-full max-w-[6rem] bg-white opacity-30 px-[1rem] py-[0.5rem] rounded-2xl'><FacebookIcon className='text-black' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
