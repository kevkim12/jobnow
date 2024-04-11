import { useState } from 'react'

import Navbar from './components/layout/navbar'
import Home from './components/home'
import Gigs from './components/gigs'
import Login from './components/login'
import Signup from './components/signup'

import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'


function Root() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/gigs/*" element={<Gigs />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/*" element={<Signup />} />
      </Routes>
    </>
  );
}

const router = createBrowserRouter(
  [{ path: "*", Component: Root },]
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
