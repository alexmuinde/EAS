import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Profile from './pages/Profile'
import TruckMovementDocument from './pages/TruckMovementDocument'
import WeighbridgeReceipt from './pages/WeighbridgeReceipt'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
        <Route path="/truckMovementDocument/:id?" element={<TruckMovementDocument />} />
        <Route path="/weighbridgeReceipt/:id?" element={<WeighbridgeReceipt />} />
      </Route>
      
    </Routes>
    
  </BrowserRouter>
}
