import { useState } from "react"
import "./App.css"

function App() {
  const [counter, setCounter] = useState(0)
  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">{counter}</h1>
      <button
        data-test="increment-button"
        onClick={() => {
          setCounter((prevCounter) => prevCounter + 1)
        }}
      >
        Increment
      </button>
    </div>
  )
}

export default App
