import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { ParticipantsList } from '../'
import { updateField } from '../../../redux/CourseDataRedux';

import { Trainees, CourseData } from '../../../types/CourseCreationTypes'
import { SignupState } from '../../../types/UserTypes'

const CourseParticipants = () => {
  const trainees = useSelector((state: {trainees: {trainees: SignupState[]}}) => state.trainees)
  //const courseData = useSelector((state: {courseData: CourseData}) => state.courseData)
  const [participants, setParticipants] = useState<SignupState[]>([])
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if(Array.isArray(courseData?.participants_display)) {
  //     console.log(courseData?.participants_display)
  //     setParticipants([...courseData.participants_display])
  //   }
  // }, [])

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    trainee: SignupState
  ) => {
    const checked = event.target.checked;

    setParticipants((prevData) => {
      if (!trainee || !trainee.email) return prevData;

      return checked
        ? [...prevData, trainee]
        : prevData.filter((val) => val.email !== trainee.email);
    });
  };

  useEffect(() => {
    dispatch(updateField({name: 'participants', value: participants}))
    console.log(participants)
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
        <div className='w-full h-full bg-white rounded-md flex flex-col'>
          <div className='w-full h-fit p-5 border-b'>
            <h1 className='font-medium'>Selected Participants</h1>
          </div>
          <div className="w-full overflow-x-auto px-2">
            <table className="w-full table-auto">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th className="text-left p-2 border-b">Name</th>
                  <th className="text-center p-2 border-b">Department</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-2">{`${item.first_name} ${item.last_name}`}</td>
                    <td className="p-2">{item.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseParticipants