import { Outlet } from 'react-router-dom';
import { Header} from '../Components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTrainingOfficerHook, useTraineeHook, useAuthHook } from '../hooks/'
import { setTrainees } from '../redux/TraineesAccountsRedux';
import { setData } from '../redux/ExternalTrainingDataRedux';
import { setCourses } from '../redux/CoursesRedux';

import { NavButton } from "../Components";

import { UserState } from '../types/UserTypes'

const MainPage: React.FC = () => {
  const user = useSelector((state: {user: UserState}) => state.user)
  const dispatch = useDispatch()
  const { handleRefreshToken } = useAuthHook()
  const { retrieveTrainees, retrieveExternalTraining, retrieveCourses } = useTrainingOfficerHook()
  const { getTraineeCourses, getTraineeExternalTraining } = useTraineeHook()

  useEffect(() => {
    const getTrainees = async() => {
      const response = await retrieveTrainees()
      dispatch(setTrainees(response))
    }

    const getExternalTrainings = async() => {
      const response = await retrieveExternalTraining()
      dispatch(setData(response))
    }

    const getCourses = async() => {
      const response = await retrieveCourses()
      dispatch(setCourses(response))
    }

    const getTraineeCourse = async() => {
      const response = await getTraineeCourses(user.user.id)
      console.log(response)
      dispatch(setCourses(response))
    }

    const getTraineeTraining = async() => {
      const response = await getTraineeExternalTraining(user.user.id)
      dispatch(setData(response))
    }

    if(user.user.role === 'training_officer') {
      getTrainees()
      getExternalTrainings()
      getCourses()
    } else if(user.user.role === 'trainee') {
      getTraineeCourse()
      getTraineeTraining()
    }
  }, [])

  const refreshToken = async() => {
     await handleRefreshToken()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 40 * 60 * 1000); 
  
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col">
      <Header/>
      <div className='w-full flex-1 overflow-hidden'>
        <Outlet/>
      </div>
      <div className='flex md:hidden w-full items-center justify-center py-5'><NavButton/></div>
    </section>
  )
}

export default MainPage