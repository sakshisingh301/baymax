import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import routes from '../routes/routes'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <RouterProvider router={routes}>
      
    </RouterProvider>
  )
}

export default App
