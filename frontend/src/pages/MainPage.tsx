import { Outlet } from 'react-router-dom';
import { Header} from '../Components';

import { useEffect } from 'react'

import { useAuthHook } from '../hooks'

const MainPage: React.FC = () => {
  const { handleRefreshToken } = useAuthHook()

  useEffect(() => {
    handleRefreshToken()
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