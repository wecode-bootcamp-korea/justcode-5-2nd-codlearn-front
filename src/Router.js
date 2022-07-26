import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderTop from './components/Header/HeaderTop';
import HeaderBottom from './components/Header/HeaderBottom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import Carts from './pages/Carts/Carts';
import Detail from './pages/Detail/Detail';
import SignUp from './pages/SignUp/SignUp';
import Hello from './pages/Hello/Hello';
import KakaoLogin from './components/Login/KakaoLogin';
import DashBoard from './pages/DashBoard/DashBoard';
import Likes from './pages/Likes/Likes';
import MyCourses from './pages/MyCourses/MyCourses';
import ScrollTop from './components/ScrollTop/ScrollTop';

function Router() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <BrowserRouter>
      <ScrollTop />
      <HeaderTop />
      <HeaderBottom />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/courses" element={<Courses />}>
          <Route path=":cat1" element={<Courses />}>
            <Route path=":cat2" element={<Courses />} />
          </Route>
        </Route>
        <Route path="/course/:id" element={<Detail />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/my_courses" element={<MyCourses />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
