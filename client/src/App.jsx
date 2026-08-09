import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import TruckMovementDocument from './pages/TruckMovementDocument'
import Header from './components/Header'

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/truckMovementDocument" element={<TruckMovementDocument />} />
    </Routes>
    
  </BrowserRouter>
}
