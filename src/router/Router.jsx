import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import SearchResultList from '../pages/SearchResultList'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Booked from '../pages/Booked'
import MyAccount from '../Dashboard/UserAccount/MyAccount'
import Bookings from '../Dashboard/AdminPanel/Bookings'
import AdminTours from '../Dashboard/AdminPanel/AdminTours'
import CreateTours from '../Dashboard/AdminPanel/CreateTours'
import UpdateTours from '../Dashboard/AdminPanel/UpdateTour'
import Forgetpass from '../pages/Forgetpass'
import Resetpass from '../pages/Resetpass'
import Confirm from '../pages/Confirm'
import Emailsend from '../pages/Emailsend'
import Addblog from '../pages/Addblog'
import Blog from '../pages/Blog'
import Fullblog from '../pages/Fullblog'
import Allblogs from '../pages/Allblogs'
import UpdateBlog from '../pages/UpdateBlog'
import Aboutus from '../pages/Aboutus'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/all-booking' element={<Bookings />} />
        <Route path='/all-tours' element={<AdminTours />} />
        <Route path='/update-tour/:id' element={<UpdateTours />} />
        <Route path='/update-blog/:id' element={<UpdateBlog />} />
        <Route path='/create' element={<CreateTours />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resetpass' element={<Forgetpass />} />
        <Route path='/resetpass/:id/:token' element={<Resetpass/>} />
        <Route path='/verify/:tokenlink' element={<Confirm />} />
        <Route path='/email-send' element={<Emailsend/>} />
        <Route path='/blogs' element={<Blog/>} />
        <Route path='/addblog' element={<Addblog />} />
        <Route path='/fullblog/:id' element={<Fullblog />} />
        <Route path='/allblogs' element={<Allblogs />} />
        <Route path='/register' element={<Register />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/booked' element={<Booked />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tours/search' element={<SearchResultList />} />
    </Routes>
  )
}

export default Router
