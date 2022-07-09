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
          
          <Route exact path="/standings"element={<StandingsPage/>}/>
          
          <Route exact path="/rankings" element={<RankingsPage runningStats={runningStats} setRunningStats={setRunningStats}/>}/> 

          <Route exact path="/map" element={<MonthMapPage runningStats={runningStats} setRunningStats={setRunningStats}/>}/>
        </Routes>
      </Router>
  )
}

export default App;
