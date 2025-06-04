import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './templates/SignUp/SignUp'
import SignIn from './templates/SignIn/SignIn'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/cookiesHelper'
import { AuthService } from './services/auth.service'
import { login, logout } from './store/user/userSlice'
import { Header } from './templates/Header'
import Main from './templates/main/main'
import CoursePage from './templates/CoursePage/CoursePage'

function App() {
  const dispath = useAppDispatch();
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if(token){
        const data = await AuthService.getMe();
        console.log(data);
        if(data) {
          dispath(login(data))
        } else {
          dispath(logout());
        }
      }
    } catch (error){
      console.log(error);
      
    }
  }
  const navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'О нас', href: '/about' },
    { label: 'Услуги', href: '/services' },
    { label: 'Контакты', href: '/contact' },
  ];

  useEffect(() =>  {
    checkAuth()
  }, [])
  return (
    <Router>
      <Header links={navLinks}/>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/course/getCourse/:id" element={<CoursePage />} />
        <Route path='/user/signUp' element={<SignUp />}/>
        <Route path='/user/signIn' element={<SignIn />}/>
      </Routes>
    </Router>
  )
}

export default App
