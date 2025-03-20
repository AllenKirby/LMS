import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { ParticipantsList } from '../'
import { updateField } from '../../../redux/CourseDataRedux';

import { Trainees, CourseData } from '../../../types/CourseCreationTypes'

const CourseParticipants = () => {
  const trainees = useSelector((state: {trainees: {trainees: Trainees[]}}) => state.trainees)
  const courseData = useSelector((state: {courseData: CourseData}) => state.courseData)
  const [participants, setParticipants] = useState<string[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if(Array.isArray(courseData?.participants_display)) {
      const emails = courseData.participants_display.map(email => email.email)
      console.log(emails)
      setParticipants([...emails])
    }
  }, [])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueArray  = event.target.value;
    const checked  = event.target.checked;

    if(Array.isArray(valueArray)) {
      setParticipants([...valueArray])
    } else {
      setParticipants((prevData) => 
        checked ? [...prevData, valueArray] : prevData.filter((val) => val !== valueArray)
      );
    }
  };

  useEffect(() => {
    dispatch(updateField({name: 'participants', value: participants}))
    console.log(courseData)
  }, [participants])

  return (
    <section className="w-full h-full flex flex-row p-8">
      <div className='w-2/3 h-full px-7'>
        <ParticipantsList  
          trainees={trainees} 
          handleCheckBox={handleCheckboxChange}
          participants={participants}/>
      </div>
      <div className='w-1/3 h-full'>
        <div className='w-full h-full bg-white rounded-md'>
          <div className='w-full h-fit p-5 border-b'>
            <h1 className='font-medium'>Selected Participants</h1>
          </div>
          <div className='w-full h-full p-2'>
            {participants.map((item, index) => (
              <div key={index} className='w-full'>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseParticipants