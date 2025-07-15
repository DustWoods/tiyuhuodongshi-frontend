import React from 'react'
import WelcomePage from './component/WelcomePage'
import { Routes, Route} from 'react-router'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App(){
  return (
    <Routes>
      <Route index element={<WelcomePage />} />
    </Routes>
  )
}

export default App