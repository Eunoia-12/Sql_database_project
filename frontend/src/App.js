import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AdminPage from './pages/AdminPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import UpdatePage from './pages/UpdatePage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/update/:userId" element={<UpdatePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
    </Router>
  );
}

export default App;