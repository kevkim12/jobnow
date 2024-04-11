import { useState } from 'react'

import Navbar from './components/layout/navbar'
import Home from './components/home'
import Jobs from './components/jobs'
import Gigs from './components/gigs'

import { createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom'


function Root() {
  return(
    <>
    <Navbar />
    <Routes>
      <Route path="/*" element={<Home/>}/>
      <Route path="/jobs/*" element={<Jobs/>}/>
      <Route path="/gigs/*" element={<Gigs/>}/>
    </Routes>
    </>
  );
}

const router = createBrowserRouter(
  [{path:"*", Component: Root},]
);

function App() {
  return (
      <RouterProvider router={router}/>
  )
}

export default App
