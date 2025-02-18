import axios from "axios";
import store, { RootState } from "../redux/store";
import { UserState } from "../redux/UserRedux";
import { jwtDecode } from 'jwt-decode' 
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/UserRedux'

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const dispatch = useDispatch()
  const state: RootState = store.getState(); 
  const user = state.user as UserState | null;

  const accessTOKEN = user?.access_token
  let expirationTime = 0

  if(accessTOKEN) {
    const decoded: {exp: number} = jwtDecode(accessTOKEN);
    expirationTime = decoded.exp * 1000;
  } else {
    console.error("No access token found");
  }

  if(Date.now() >= expirationTime){
    try{
      const response = await axios.post(`${import.meta.env.VITE_URL}/refresh/`, {}, {
        withCredentials: true
      })
      //does it need to clear the user on redux before inserting new user data?
      dispatch(setUser(response.data))

    }catch(err){
      console.log(err)
    }
  }

  if (user?.access_token) {
    config.headers["Authorization"] = `Bearer ${user.access_token}`;
  }
  if (user?.csrf_token) {
    config.headers["X-CSRFToken"] = user.csrf_token;
  }

  return config;
});

export default api;
