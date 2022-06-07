import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header'
import Home from './components/Home';
import Loading from './components/Loading';
import SavedSearchBox from './components/SavedSearch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Reset from './components/Reset';

function App() {
  const homePage = localStorage.getItem("flightSave_userID") ?
    (<>
      <Header />
      <Loading />
      <Home />
      <Footer />
    </>) : (
      <>
        <Loading />
        <Login />
      </>
    )

  const signUp = localStorage.getItem("flightSave_userID") ? (
    <>
      <Header />
      <Loading />
      <Home />
      <Footer />
    </>
  ) : (
    <>
      <Loading />
      <SignUp />
    </>
  )
  const savedSearch =localStorage.getItem("flightSave_userID") ? (<>
    <Header />
    <Loading />
    <SavedSearchBox />
    <Footer />
  </>) : (
    <>
    <Loading />
    <Login />
  </>
  );

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path='/home' element={homePage} />
          <Route path='/saved' element={savedSearch} />
          <Route path='/signup' element={signUp} />
          <Route path='/reset' element={<Reset />} />
          <Route path="/" element={homePage} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
