import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Cookie from "universal-cookie";

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
  ViewUserProfile,
} from "./pages/TrainingOfficer";
import {
  CourseOverview,
  CourseParticipants,
  CourseContent,
  Preview,
} from "./pages/TrainingOfficer/CourseComponent";
import { Resources } from "./pages";
import { CourseView } from "./Components";
import { ProtectedRoute } from "./pages/Auth/ProtectedRoute";

function App() {
  const cookies = new Cookie();
  const user =  cookies.get("user")
  const userRoleString = user?.user?.role || null;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Auth */}
        <Route path="/" element={<AuthPage />}>
          <Route index element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Protected Routes - Trainee */}
        <Route element={<ProtectedRoute allowedRoles={["trainee"]} userRole={userRoleString} />}>
          <Route path="/trainee" element={<MainPage />}>
            <Route path="home" element={<Home />} />
            <Route path="mycourses" element={<MyCourse />}>
              <Route path=":id" element={<CourseView />} />
              <Route path=":id/learn" element={<CourseTaking />} />
            </Route>
            <Route path="resources" element={<Resources />} />
          </Route>
        </Route>

        {/* Protected Routes - Training Officer */}
        <Route element={<ProtectedRoute allowedRoles={["training_officer"]} userRole={userRoleString} />}>
          <Route path="/trainingofficer" element={<MainPage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<CourseContainer />}>
              <Route path="course" element={<Course />} />
              <Route path="externaltraining/:id" element={<ExternalTrainingView />} />
              <Route path="courseview/:id" element={<CourseView />} />
              <Route path="courseCreation" element={<CourseCreation />}>
                <Route path="courseOverview" element={<CourseOverview />} />
                <Route path="courseParticipants" element={<CourseParticipants />} />
                <Route path="courseContent" element={<CourseContent />} />
                <Route path="preview" element={<Preview />} />
              </Route>
            </Route>
            <Route path="resources" element={<Resources />} />
            <Route path="trainee" element={<Trainee />} />
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
