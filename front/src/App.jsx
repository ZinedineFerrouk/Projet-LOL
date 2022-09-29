import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Player from './pages/player/Player';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/player/:summonerName' element={ <Player /> } />
    </Routes>
  )
}

export default App;
