import React from 'react'
import { useRoutes } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'
import routes from './routes'
import './App.scss'

export default function App() {

  const element = useRoutes(routes)

  return (
    <>
      {element}
      <Footer />
    </>
  )
}
