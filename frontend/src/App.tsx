import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//import Cookie from "universal-cookie";

import { NotFoundPage, MainPage } from "./pages";
import { Home, Calendar, MyCourse, CourseTaking } from "./pages/Learner";
import { SignupPage, LoginPage, AuthPage } from "./pages/Auth";
import {
  Dashboard,
  CourseCreation,
  Trainee,
  Course,
  ExternalTrainingView,
  CourseContainer,
  ViewUserProfile,
} from "./pages/TrainingOfficer";
import {
  CourseOverview,
  CourseParticipants,
  CourseContent,
  Preview,
  SurveyForm,
} from "./pages/TrainingOfficer/CourseComponent";
import { Resources } from "./pages";
import { CourseView } from "./Components";
import { ProtectedRoute } from "./pages/Auth/ProtectedRoute";
import { CoursesTrainingContainer, Reviewer, ViewParticipants } from "./pages/Reviewer";

function App() {
  //const cookies = new Cookie();
  //const user = cookies.get("user");
  //const userRoleString = user?.user?.role || null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Auth */}
        <Route path="/" element={<AuthPage />}>
          <Route index element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Protected Routes - Trainee */}
        <Route element={<ProtectedRoute allowedRoles={["trainee"]} />}>
          <Route path="/trainee" element={<MainPage />}>
            <Route path="home" element={<Home />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="mycourses" element={<MyCourse />}>
              <Route path=":id" element={<CourseView />} />
              <Route path=":id/learn" element={<CourseTaking />} />
            </Route>
            <Route path="user-profile" element={<ViewUserProfile />} />
            <Route path="resources" element={<Resources />} />
          </Route>
        </Route>

        {/* Protected Routes - Training Officer */}
        <Route element={<ProtectedRoute allowedRoles={["training_officer"]} />}>
          <Route path="/trainingofficer" element={<MainPage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<CourseContainer />}>
              <Route path="course" element={<Course />} />
              <Route
                path="externaltraining/:id"
                element={<ExternalTrainingView />}
              />
              <Route path="courseview/:id" element={<CourseView />}/>
              <Route path="viewresponses/:id" element={<SurveyForm />}/>
              <Route path="courseCreation" element={<CourseCreation />}>
                <Route path="courseOverview" element={<CourseOverview />} />
                <Route
                  path="courseParticipants"
                  element={<CourseParticipants />}
                />
                <Route path="courseContent" element={<CourseContent />} />
                <Route path="preview" element={<Preview />} />
              </Route>
            </Route>
            <Route path="resources" element={<Resources />} />
            <Route path="trainee" element={<Trainee />} />
            <Route path="user-profile" element={<ViewUserProfile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["reviewer"]}/>}>
          <Route path="/reviewer" element={<MainPage />}>
            <Route path="program" element={<CoursesTrainingContainer/>}>
              <Route path="data" element={<Reviewer />}/>
              <Route path="course/:data" element={<ViewParticipants />} />
              <Route path="training/:data" element={<ViewParticipants />} />
            </Route>
            <Route path="user-profile" element={<ViewUserProfile />} />
          </Route>
        </Route>

        {/* Shared (optional access control) */}
        <Route path="user-profile/:id" element={<ViewUserProfile />} />

        {/* Error */}
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
