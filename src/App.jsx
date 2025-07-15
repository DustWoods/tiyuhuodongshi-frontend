import React from 'react'
import WelcomePage from './component/WelcomePage'
import { Routes, Route} from 'react-router'

function App(){
  return (
    <Routes>
      <Route index element={<WelcomePage />} />
    </Routes>
  )
}

export default App