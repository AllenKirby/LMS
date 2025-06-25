import { Outlet } from "react-router-dom";
import { Header, NavButton } from "../Components";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useTrainingOfficerHook,
  useTraineeHook,
  useAuthHook,
  useSharedHook,
  useReviewerHook,
} from "../hooks/";
import { setTrainees } from "../redux/TraineesAccountsRedux";
import { setData } from "../redux/ExternalTrainingDataRedux";
import { setCourses } from "../redux/CoursesRedux";

import { UserState } from "../types/UserTypes";

const MainPage: React.FC = () => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  const { handleRefreshToken } = useAuthHook();
  const { retrieveTrainees, retrieveExternalTraining, retrieveCourses } =
    useTrainingOfficerHook();
  const { getTraineeCourses, getTraineeExternalTraining } = useTraineeHook();
  const { getProfilePicture } = useSharedHook();
  const { retrieveAllCourses, retrieveAllTrainings } = useReviewerHook();

  useEffect(() => {
    const getTrainees = async () => {
      const response = await retrieveTrainees();
      dispatch(setTrainees(response));
    };

    const getExternalTrainings = async () => {
      const response = await retrieveExternalTraining();
      dispatch(setData(response));
    };

    const getCourses = async () => {
      const response = await retrieveCourses();
      dispatch(setCourses(response));
    };

    const getTraineeCourse = async () => {
      const response = await getTraineeCourses(user.user.id);
      console.log(response);
      dispatch(setCourses(response));
    };

    const getTraineeTraining = async () => {
      const response = await getTraineeExternalTraining(user.user.id);
      dispatch(setData(response));
    };

    const getReviewerTrainings = async () => {
      const response = await retrieveAllTrainings();
      dispatch(setData(response));
    };

    const getReviewerCourses = async () => {
      const response = await retrieveAllCourses();
      dispatch(setCourses(response));
    };

    if (user.user.role === "training_officer") {
      getTrainees();
      getExternalTrainings();
      getCourses();
    } else if (user.user.role === "trainee") {
      getTraineeCourse();
      getTraineeTraining();
    } else if (user.user.role === "reviewer") {
      getReviewerTrainings();
      getReviewerCourses();
    }
  }, []);

  const refreshToken = useCallback(async () => {
    await handleRefreshToken();
    await getProfilePicture();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 40 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <section className="w-full h-screen flex flex-col">
      <Header />
      <div className="w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
      <div className="flex md:hidden w-full items-center justify-center py-5">
        <NavButton />
      </div>
    </section>
  );
};

export default MainPage;
