import { useState } from 'react'
import './App.css'
import MainComponent from './MainComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainComponent/>
    </>
  )
}

export default App
