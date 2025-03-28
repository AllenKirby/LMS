import { useState } from 'react';
//import { useSelector } from 'react-redux';

import { IoIosArrowDown, IoIosArrowForward  } from "react-icons/io";

import { MenuDataState, CourseContentState, ModuleState } from '../types/CourseCreationTypes'
//import { UserState } from '../types/UserTypes'

type CourseContentOverviewState = {
    courseContent: MenuDataState[] | CourseContentState[];
    modules?: ModuleState[];
    page: string;
}


const CourseContentOverview: React.FC<CourseContentOverviewState> = (props) => {
    const {courseContent, modules = [], page} = props

    const[sectionTabCollapse, setSectionTabCollapse] = useState<boolean>(false);
    const[moduleTabCollapse, setModuleTabCollapse] = useState<boolean>(false);
    
    //const user = useSelector((state: {user: UserState}) => state.user)

  return (
    <>
        {courseContent && courseContent.map((item, index) => (
            <section key={index} className="flex flex-col w-full h-fit rounded-md border">
                <header className={`flex flex-row justify-between items-center p-5 ${sectionTabCollapse && "border-b"}`}>
                <article className='flex items-center gap-1'>
                    <div className='h-8 w-8 rounded-full border bg-red-50'></div>
                    <p className='font-medium'>{item.title}</p>
                </article>
                <button className='h-6 w-6 rounded-md flex items-center justify-center text-f-light bg-c-green-50'
                        onClick={() => setSectionTabCollapse(!sectionTabCollapse)}>
                    <IoIosArrowDown size={16} className={sectionTabCollapse ? "rotate-180" : "rotate-0"}/>
                </button>
                </header>
                <div className={`w-full flex flex-col transition-all duration-300 ease-in-out
                    ${sectionTabCollapse ? "h-fit opacity-100 py-3" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    {page === 'preview' &&
                        modules.filter(module => module.menuID === item.id).map((moduleItem, index) => (
                            <section key={index} className='px-6'>
                                <header className='flex gap-2 items-center'>
                                <button className='h-5 w-5 rounded-full border flex items-center justify-center'
                                        onClick={() => setModuleTabCollapse(!moduleTabCollapse)}>
                                    <IoIosArrowForward size={12} className={moduleTabCollapse ? "rotate-90" : "rotate-0"}/>
                                </button>
                                <p>{moduleItem.title}</p>
                                </header>
                                <div className={`flex flex-col gap-1 transition-all duration-300 ease-in-out
                                    ${moduleTabCollapse ? "h-fit opacity-100 px-1 py-3" : "max-h-0 opacity-0 overflow-hidden"}`}>
                                {moduleItem.content.map((contentItem, index) => (
                                    <article key={index} className='flex items-center gap-2'>
                                    <div className='w-4 h-4 rounded-full border bg-red-700'></div>
                                    <p className='w-1/5 text-p-sm text-c-grey-50 truncate'>{contentItem.type === 'separator'? contentItem.title : contentItem.type === 'uploadedFile' ? contentItem.fileName : contentItem.question}</p>
                                    </article>
                                ))}
                                </div>
                            </section>
                        ))}
                        { page === 'viewcourse' &&
                            (item as CourseContentState).modules.map((moduleItem, index) => (
                                <section key={index} className='px-6'>
                                    <header className='flex gap-2 items-center'>
                                    <p>{moduleItem.title}</p>
                                    </header>
                                </section>
                            ))
                        }
                </div>
            </section>
        ))      
        }
    </>
  )
}

export default CourseContentOverview