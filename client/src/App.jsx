import { useState } from 'react'

import Navbar from './components/layout/navbar'
import Home from './components/home'
import Gigs from './components/gigs'
import JobList from './components/JobList'
import Login from './components/login'
import Signup from './components/signup'
import Footer from './components/layout/footer'

import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

function Root() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/gigs/*" element={<Gigs />} />
        <Route path="/jobs/*" element={<JobList/>} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/*" element={<Signup />} />
      </Routes>
      <Footer />
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
