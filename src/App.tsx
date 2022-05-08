import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header'
import Home from './components/Home';
import Loading from './components/Loading';
import SavedSearchBox from './components/SavedSearch';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const homePage = (
    <>
      <Header />
      <Loading />
      <Home />
      <Footer />
    </>
  )
  const savedSearch = <>
    <Header />
    <Loading />
    <SavedSearchBox />
    <Footer />
  </>
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path='/home' element={homePage} />
          <Route path='/saved' element={savedSearch} />
          <Route path="/" element={homePage} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
