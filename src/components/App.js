import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "../css/App.css";

import HomePage from "../pages/HomePage";
import StandingsPage from '../pages/StandingsPage';
import RankingsPage from '../pages/RankingsPage';
import MonthMapPage from '../pages/MonthMapPage';

const App =() =>
{ 
  const [runningStats , setRunningStats] = useState([{}]);

  const [games, setGames] = useState([]);

    //game list
      useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/games/list`)
            .then(response=>response.json())
            .then(json=>{
            
                setGames(json.data)    
            })
            .catch(err=>{
                    console.log(`Error ${err}`)
            })
    }, []);

    //running stats
    useEffect(()=>{ 
      fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/games/runningStats`)
      .then(response=>response.json())
      .then(json=>{
      setRunningStats(json.data)    
      })
      .catch(err=>{
              console.log(`Error ${err}`)
          })
      }, []);

  return (
      <Router>
        <Routes>
          <Route exact path="/"element={<HomePage/>}/>
          
          <Route exact path="/rankings" element={<RankingsPage runningStats={runningStats} setRunningStats={setRunningStats}/>}/> 

          <Route exact path="/map" element={<MonthMapPage runningStats={runningStats} setRunningStats={setRunningStats} games={games} setGames={setGames}/>}/>
          
          <Route exact path="/standings"element={<StandingsPage games={games} setGames={setGames} runningStats={runningStats}/>}/>
        </Routes>
      </Router>
  )
}

export default App;
