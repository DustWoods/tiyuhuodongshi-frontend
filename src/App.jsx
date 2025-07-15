import React from 'react'
import WelcomePage from './component/WelcomePage'
import LoginPage from './component/LoginPage'
import { Routes, Route} from 'react-router'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App(){
  return (
    <Routes>
      <Route index element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App