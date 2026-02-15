import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CustomersPage from './pages/CustomersPage'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import TestPage from './pages/TestPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/customers" element={
        <ProtectedRoute>
          <CustomersPage />
        </ProtectedRoute>
      } />
      <Route path="/test" element={
        <ProtectedRoute>
          <TestPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App