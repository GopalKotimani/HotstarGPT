import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Body = () => {
  const dispath = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body;