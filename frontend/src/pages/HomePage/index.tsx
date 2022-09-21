import { useAppDispatch, useAppSelector } from 'app/hooks';
import NormalButton from 'components/atoms/buttons/NormalButton';
import { logout, selectAuth } from 'features/auth/authSlice';
import React from 'react'

const HomePage = () => {

  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div>
      <h1 className="text-white font-bold mb-5">
        Logged in as <em className="text-green-500">{authState.user?.username}</em>
      </h1>

      <NormalButton type="button" onClick={()=>handleLogout()}>
        Logout
      </NormalButton>
    </div>
  )
}

export default HomePage