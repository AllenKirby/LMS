import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { NotFoundPage, MainPage } from "./pages";
import { Home, MyCourse, CourseTaking } from "./pages/Learner";
import { SignupPage, LoginPage, AuthPage } from "./pages/Auth";
import {
  Dashboard,
  CourseCreation,
  Trainee,
  Course,
  ExternalTrainingView,
  CourseContainer,
} from "./pages/TrainingOfficer";
import {
  CourseOverview,
  CourseParticipants,
  CourseContent,
  Preview,
} from "./pages/TrainingOfficer/CourseComponent";
import { Resources } from './pages';
import { CourseView } from "./Components";
// import { useSelector } from "react-redux";
// import { UserState } from './types/UserTypes'

function App() {
  //const user = useSelector((state: {user: UserState}) => state.user)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        // Auth
        <Route path="/" element={<AuthPage />}>
          <Route index element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        // Learner
        <Route path="/trainee" element={<MainPage />}>
          <Route path="home" element={<Home />} />
          <Route path="mycourses" element={<MyCourse />}>
            <Route path=":id" element={<CourseView />}/>
            <Route path=":id/learn" element={<CourseTaking/>}/>
          </Route>
          <Route path="resources" element={<Resources />} />
        </Route>
        
        // Training Officer
        <Route path="/trainingofficer" element={<MainPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CourseContainer />}>
            <Route path="course" element={<Course />} />
            <Route path="externaltraining/:id" element={<ExternalTrainingView />}/>
            <Route path="courseview/:id" element={<CourseView />} />
            <Route path="courseCreation" element={<CourseCreation />}>
              <Route path="courseOverview" element={<CourseOverview />} />
              <Route path="courseParticipants"element={<CourseParticipants />}/>
              <Route path="courseContent" element={<CourseContent />} />
              <Route path="preview" element={<Preview />} />
            </Route>
          </Route>
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
