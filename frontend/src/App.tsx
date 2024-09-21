import LogIn from "./components/LogIn"
import MainPage from "./components/MainPage"
import SignUp from "./components/SignUp"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
      </Routes>
    </>
  )
}

export default App
