import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { NotFoundPage, MainPage } from './pages';
import { Home, MyCourse, Resources } from './pages/Learner';
import { SignupPage, LoginPage, AuthPage } from "./pages/Auth"; 

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                // Auth
                <Route path="/" element={<AuthPage/>}>
                    <Route index element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>

                // Learner
                <Route path="/learner" element={<MainPage />}>
                    <Route path="home" element={<Home />} />
                    <Route path="mycourses" element={<MyCourse />} />
                    <Route path="resources" element={<Resources />} />
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