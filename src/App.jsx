import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const name = "User Name"

  return (
    <>
    <h1>Welcome to Backyard, {name}!</h1>
    </>
  )
}

export default App
