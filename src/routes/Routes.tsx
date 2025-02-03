import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import MainPage from '../Pages/MainPage'
import MyPage from '../Pages/MyPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import SectionSelectPage from '../Pages/SectionSelectPage'
import BackendQuestionPage from '../Pages/BackendQuestionPage'
import FrontendQuestionPage from '../Pages/FrontendQuestionPage'
import DesignQuestionPage from '../Pages/DesignQuestionPage'
import FrontIntroPage from '../Pages/FrontIntroPage'
import BackIntroPage from '../Pages/BackIntroPage'
import DesignIntroPage from '../Pages/DesignIntroPage'
import Footer from '../components/Footer'
import ProjectIntroPage from '../Pages/ProjectIntroPage'

import './Routes.css'

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
};

const Router = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <div className = "pages-container">
      <Nav />
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/*'
          element={<MainPage />}
        />
        <Route
          path='/project-introduce'
          element={<ProjectIntroPage />}
          />
        <Route
          path='/mypage'
          element={<MyPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/signup'
          element={<SignupPage />}
        />
        <Route
          path='/SectionSelect'
          element={<SectionSelectPage />}
        />
        <Route
          path='/backend-question'
          element={<BackendQuestionPage />}
        />
        <Route
          path='/frontend-question'
          element={<FrontendQuestionPage />}
        />
        <Route
          path='/design-question'
          element={<DesignQuestionPage />}
        />
        <Route
          path='/FrontIntro'
          element={<FrontIntroPage/>}
        />
        <Route
          path='/BackIntro'
          element={<BackIntroPage/>}
        />
        <Route
          path='/DesignIntro'
          element={<DesignIntroPage/>}
        />
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default Router
