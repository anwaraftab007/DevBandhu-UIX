import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthRedirectRoute from './Auth/AuthRedirectRoute';
import AuthRedirectRoute2 from './Auth/AuthRedirectRoute2';
import { base } from './constant';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  useEffect(()=>{
    console.log("App.jsx");
    console.log(isLoggedIn);
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${base}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          },
          })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setIsLoggedIn(true);
              setIsLoading(false)
              window.localStorage.setItem('user', JSON.stringify(data.data))
              setUser(data.data);
              } else {
                setIsLoggedIn(false);
                setError(true);
                setIsLoading(false);
                }
              })
              .catch((err) => console.log(err));
              }
              
  },[])
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={
            <AuthRedirectRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Auth onClose={undefined} setIsLoggedIn={setIsLoggedIn}/></AuthRedirectRoute>
          } />
          <Route path="/dashboard" element={
             <AuthRedirectRoute2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}><Dashboard /></AuthRedirectRoute2>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;