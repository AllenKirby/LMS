import { Outlet } from "react-router-dom"

const AuthPage = () => {
  return (
    <section className="w-full h-screen flex flex-row">
        <figure className='w-3/5 h-full bg-green-950 p-5'>
            <section className="w-full h-auto flex gap-2">
                <div className='w-16 h-16 bg-white rounded-full'>

                </div>
                <div className='flex items-center justify-start'>
                    <div className='text-white'>
                        <h1 className='text-2xl'>Learning Management System</h1>
                        <h4 className='text-xs'>National Irrigation Administration Region - 4A</h4>
                    </div>
                </div>
            </section>
        </figure>
        <div className='w-2/5 h-full flex flex-col items-center justify-center'>
            <div className="w-full flex-1 overflow-y-auto flex items-center justify-center">
                <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default AuthPage