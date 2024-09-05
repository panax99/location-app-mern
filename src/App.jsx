import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Account from './pages/Account'
import Bien from './pages/Bien'
import Home from './pages/Home'
import Locataire from './pages/Locataire'
import Register from './pages/Register'
import Signin from './pages/Signin'
import Test from './pages/Test'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/compte' exact element={<Account/>}/>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/locataires' element={<Locataire/>}/>
          <Route path='/biens' element={<Bien/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
