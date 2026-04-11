import { useState } from "react"
import Navbar from "./components/navbar/Navbar"
import Topbar from "./components/topbar/Topbar"
import './App.css'
import Calculator from "./apps/calculator/Calculator"
import NotesApp from "./apps/notes/NotesApp"

const App = () => {

  const [currentApp, setCurrentApp] = useState<'notes' | 'calculator'>('notes')

  const appComponents = {
    notes: <NotesApp />,
    calculator: <Calculator />
  }

  return (
    <div className="small-app">
      <Topbar currentApp={currentApp} />

      <div className="flex flex-row w-screen h-[84dvh] justify-center items-center overflow-scroll">
        {appComponents[currentApp]}
      </div>

      <Navbar setCurrentApp={setCurrentApp} currentApp={currentApp} />

    </div>
  )
}

export default App