import { React, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
   useLocation
} from "react-router-dom";

import "../css/App.css";

import HomePage from "../pages/HomePage";
import StandingsPage from '../pages/StandingsPage';
import RankingsPage from '../pages/RankingsPage';
import MonthMapPage from '../pages/MonthMapPage';

const App =() =>
{ 
  const [stats , setStats ] = useState([{}]);

  const [roundsStats , setRoundsStats] = useState([{}]);

  const [runningStats , setRunningStats] = useState([{}]);

  //get standings
  useEffect(()=>{ 
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/games/standings`)
    .then(response=>response.json())
    .then(json=>{
        setStats(json.data)    
    })
    .catch(err=>{
            console.log(`Error ${err}`)
        })
    }, []);

    //round stats
    useEffect(()=>{ 
      fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/games/roundStats`)
      .then(response=>response.json())
      .then(json=>{
        setRoundsStats(json.data)    
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
          
          <Route exact path="/standings"element={<StandingsPage stats={stats} setStats={setStats} roundsStats={roundsStats} setRoundsStats={setRoundsStats}/>}/>
          
          <Route exact path="/rankings" element={<RankingsPage runningStats={runningStats} setRunningStats={setRunningStats}/>}/> 

          <Route exact path="/map" element={<MonthMapPage runningStats={runningStats} setRunningStats={setRunningStats}/>}/>
        </Routes>
      </Router>
  )
}

export default App;
