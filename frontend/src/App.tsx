import { getAuthenticatedUser, loginUser } from "api/auth";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { login, selectAuth, updateUser } from "features/auth/authSlice";
import { useEffect } from "react";
import {
  BrowserRouter, Route,
  Routes
} from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  const checkLogin = async () => {
    try {
      const res = await getAuthenticatedUser();
      if (res.status === 200) {
        dispatch(login({ user: res.data }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkLogin();

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!authState.authenticated) {
      if (window.location.pathname !== "/login"){
        window.location.pathname = "/login";
      }
    }
  }, [authState])


  return (
    <main className="flex items-center justify-center h-screen px-4 py-3 bg-slate-900 min">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
