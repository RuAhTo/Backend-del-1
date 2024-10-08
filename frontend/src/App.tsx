import React, {ReactNode} from "react"
import LogIn from "./pages/LogIn"
import MainPage from "./pages/MainPage"
import SignUp from "./pages/Signup"
import {Routes, Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthProvider'; // Importera AuthProvider
import Registered from "./pages/Registered"

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />; // Om inte inloggad, omdirigera till login
    }

    return children; // Visa barnkomponenter om inloggad
};


function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><MainPage/></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/registered" element={<Registered/>}/>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
