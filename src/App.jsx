import React from 'react'
import WelcomePage from './component/WelcomePage'
import LoginPage from './component/LoginPage'
import RegisterPage from './component/RegisterPage'
import { Routes, Route} from 'react-router'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App(){
  return (
    <Routes>
      <Route index element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App