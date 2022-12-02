import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Home from "./pages/home/Home";
import MatchTimeline from "./pages/map/MatchTimeline";
import NotFound from "./pages/not-found/NotFound";
import Player from "./pages/player/Player";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const location = useLocation();
  const client = new QueryClient();

  return (
    <div className="app">
      <QueryClientProvider client={client}>
        {location.pathname !== "/" && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match-timeline/:match_id" element={<MatchTimeline />} />
          <Route path="/joueur/:summonerName" element={<Player />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
