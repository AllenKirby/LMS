import { Outlet } from 'react-router-dom';
import { Header} from '../Components';

const MainPage: React.FC = () => {
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