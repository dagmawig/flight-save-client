import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header'
import Home from './components/Home';
import Loading from './components/Loading';
import SavedSearchBox from './components/SavedSearch';

function App() {
  return (
    <div className="App">
      <Header/>
      <Loading/>
      {/* <SavedSearchBox/> */}
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
