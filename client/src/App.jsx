import './App.css'
import HomePage from './pages/HomePage.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/routes/PrivateRoute.jsx'
import PublicRoutes from './components/routes/PublicRoutes.jsx'

function App() {

  return (
    <>
      {/* {" "} */}
      <ToastContainer />
      <Routes>
        <Route path='/' element={
          <PublicRoutes>
            <HomePage />
          </PublicRoutes>
        } />
        <Route path='/login' element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        } />
        <Route path='/register' element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        } />
        <Route path='/dashboard'
          element={
            // made dashboard a protected route
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
