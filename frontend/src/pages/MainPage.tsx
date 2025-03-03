import { Outlet } from 'react-router-dom';
import { Header} from '../Components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTrainingOfficerHook } from '../hooks/'
import { setTrainees } from '../redux/TraineesAccountsRedux';

interface User {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  sex: string;
  birth_date: string;
  contact: string;
  address: string;
}

interface UserState {
  message: string;
  user: User;
  access_token?: string;
  csrf_token?: string;
  expiration: Date;
}

const MainPage: React.FC = () => {
  const user = useSelector((state: {user: UserState}) => state.user)
  const dispatch = useDispatch()
  const { retrieveTrainees } = useTrainingOfficerHook()

  useEffect(() => {
    const getTrainees = async() => {
      const response = await retrieveTrainees()
      dispatch(setTrainees(response))
    }

    if(user.user.role === 'training_officer') {
      getTrainees()
    }
  }, [])

  return (
    <section className="w-full h-screen flex flex-col">
      <Header/>
      <div className='w-full flex-1 overflow-hidden'>
        <Outlet/>
      </div>
    </section>
  )
}

export default MainPage