import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { NotFoundPage, MainPage } from './pages';
import { Home, MyCourse, ResourcesTrainee } from './pages/Learner';
import { SignupPage, LoginPage, AuthPage } from "./pages/Auth"; 
import { Dashboard, Courses, Trainee, Resources } from './pages/TrainingOfficer'

function App() {
    // const { handleRefreshToken } = useAuthHook()

    // useEffect(() => {
    //     handleRefreshToken()
    // }, [])

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                // Auth
                <Route path="/" element={<AuthPage/>}>
                    <Route index element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>

                // Learner
                <Route path="/trainee" element={<MainPage />}>
                    <Route path="home" element={<Home />} />
                    <Route path="mycourses" element={<MyCourse />} />
                    <Route path="resources" element={<ResourcesTrainee />} />
                </Route>
                <Route path="/trainingofficer" element={<MainPage />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="trainee" element={<Trainee />} />
                </Route>

                // Error
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        )
    );

    return (
      <div className="font-grotesk text-f-dark">
          <RouterProvider router={router} />
      </div>
    );
}

export default App;