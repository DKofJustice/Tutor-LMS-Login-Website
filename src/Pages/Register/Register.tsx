import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useForm, SubmitHandler  } from 'react-hook-form' 
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {

  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (errors.email && errors.email.message) {
        return toast.error(errors.email.message);
      } else if (errors.password && errors.password.message) {
        return toast.error(errors.password.message);
      } else if (errors.confirmPassword && errors.confirmPassword.message) {
        return toast.error(errors.confirmPassword.message);
      }
  
      await axios.post( import.meta.env.VITE_API +  "/register", {
        email: data.email,
        password: data.password,
      });

      toast.success('Registration successful')
      navigate('/login')
      reset();

    } catch(error) {
      console.log(error)
      toast.error('An internal error has occured: ' + error)
    }
  }

  return (
    <div className="w-full h-full py-[5rem] lg:py-[12rem]">
      <div className="w-full max-w-[40rem] bg-transparent md:bg-secondary-blue/40 mx-auto rounded-xl md:border-2 border-0 border-white/10
      py-[5rem] px-[3rem] md:px-[5rem]">
        <div className="w-full h-full text-white flex flex-col items-center gap-y-[3rem]">
          <div className='w-full flex flex-row justify-start'>
            <h2 className="text-[1.1rem] lg:text-[1.5rem] font-bold">Register</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center gap-y-[3rem]'>
          <div className="w-full flex flex-col items-start gap-y-[1rem]">
            <label htmlFor="email">Email</label>
            <input 
            {...register('email', {
              required: 'Email is required',
              validate: (value) => 
                value.match(mailformat) || 'Please enter a valid email'
            })}
            type="email" name="email" id="email" className='w-full rounded-xl 
            px-[1.5rem] py-[0.5rem] text-[1rem] lg:text-[1.2rem] text-black' />
          </div>

          <div className="w-full flex flex-col items-start gap-y-[1rem]">
            <label htmlFor="password">Password</label>
            <input 
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })}
            type="password" name="password" id="password" className='w-full rounded-xl 
            px-[1.5rem] py-[0.5rem] text-[1rem] lg:text-[1.2rem] text-black' />
          </div>

          <div className="w-full flex flex-col items-start gap-y-[1rem]">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) => value === getValues('password') || "Passwords must match",
            })}
            type="password" name="confirmPassword" id="confirmPassword" className='w-full rounded-xl 
            px-[1.5rem] py-[0.5rem] text-[1rem] lg:text-[1.2rem] text-black' />
          </div>

          <button
            disabled={isSubmitting}
            type='submit'
            className={`w-full bg-primary-red font-bold text-[1.2rem] px-[1.5rem] py-[0.5rem]
            rounded-2xl ${isSubmitting ? 'opacity-40' : 'opacity-100'}`}>Register</button>
          </form>

          <div className='w-full flex flex-row items-center'>
            <div className='w-full h-[1px] bg-white/10'></div>
            <p className='px-[3rem]'>or</p>
            <div className='w-full h-[1px] bg-white/10'></div>
          </div>

          <div className='w-full flex flex-row items-center justify-center gap-[3rem]'>
            <button className='w-full max-w-[6rem] bg-white px-[1rem] py-[0.5rem] rounded-2xl'><GoogleIcon className='text-black' /></button>
            <button className='w-full max-w-[6rem] bg-white px-[1rem] py-[0.5rem] rounded-2xl'><FacebookIcon className='text-black' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
