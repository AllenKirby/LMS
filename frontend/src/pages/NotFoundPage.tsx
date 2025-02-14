import Error404Img from '../assets/404.svg';

const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
            <img 
                src={Error404Img} 
                alt="404 Error" 
                className="w-[640px] h-[380px] mx-auto"
            />
            <div className='border-b-2 border-b-gray-200 w-[calc(100%+120px)] mx-[-60px]'></div>
            <h2 className="text-6xl text-[rgb(63,128,109)] font-extrabold pb-3 pt-8">We're Sorry...</h2>
            <p className="text-gray-400 text-xl">Sorry, we couldn't find the page you are looking for. It might </p>
            <p className="text-gray-400 text-xl">have been removed, deleted, or never existed.</p>
        </div>
    </div>
  );
}

export default NotFoundPage;
