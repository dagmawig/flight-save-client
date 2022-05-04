import React from 'react';
import './App.css';
import Header from './components/Header'
import Home from './components/Home';
import Loading from './components/Loading';
import SavedSearchBox from './components/SavedSearch';

function App() {
  return (
    <div className="App">
      <Header/>
      <Loading/>
      <SavedSearchBox/>
      {/* <Home/> */}
    </div>
  );
}

export default App;
