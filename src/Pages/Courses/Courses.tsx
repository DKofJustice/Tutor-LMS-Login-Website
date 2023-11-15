import { courses } from '../../data/courses'
import Course from './Course'

export default function Courses() {

  return (
    <div className='flex flex-row justify-center'>
      <ul className='w-full max-w-[90rem] py-[15rem] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      justify-items-center gap-[1rem] px-[2rem]'>
        { courses.map(course => {
          return <Course keyProp={course.id} title={course.title} description={course.description}  />
        }) }
      </ul>
    </div>
  )
}
