import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { UserState } from '../types/UserTypes'

export const handleAuthNavigation = (role: string, navigate: ReturnType<typeof useNavigate>) => {
  switch(role) {
    case 'trainee':
      navigate('/trainee/home', { replace: true });
      break;
    case 'training_officer':
      navigate('/trainingofficer/dashboard', { replace: true });
      break;
    default:
      navigate('/', { replace: true });
  }
};

export const getAuthCookie = () => {
  const cookies = new Cookies();
  return cookies.get('user');
};

export const setAuthCookie = (userData: UserState) => {
  const cookies = new Cookies();
  cookies.set("user", userData, {
    path: "/",
    secure: true,
    maxAge: 24 * 60 * 60
  });
};

export const removeAuthCookie = () => {
  const cookies = new Cookies();
  cookies.remove("user", { path: "/" });
};