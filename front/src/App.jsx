import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import MatchTimeline from './pages/map/MatchTimeline';
import NotFound from './pages/not-found/NotFound';
import Player from './pages/player/Player';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/match-timeline/:match_id' element={ <MatchTimeline /> } />
      <Route path='/player/:summonerName' element={ <Player /> } />
      <Route path='*' element={ <NotFound /> } />
    </Routes>
  )
}

export default App;
