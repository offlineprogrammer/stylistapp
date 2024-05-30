import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

     <div className="app-container">
      <div className="search-container">
        <input type="text" className="wide-input" placeholder="Enter your prompt" />
        <button className="search-button">Generate</button>
      </div>
    </div>

  )
}

export default App
