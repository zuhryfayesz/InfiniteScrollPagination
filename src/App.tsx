import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InfiniteScrollGrid from './components/InfiniteScrollGrid'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InfiniteScrollGrid/>
    </>
  )
}

export default App
