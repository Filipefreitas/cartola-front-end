import { React, useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Standings from '../components/Standings';

const StandingsPage = () => 
{  
    const [stats , setStats ] = useState([{}]);

    const [roundsStats , setRoundsStats] = useState([{}]);

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
    
    return (
        <div>
            <Header/>
            <main>
                <h3 className="section-title">TABELA</h3>
                <Standings stats={stats} roundsStats={roundsStats}/>
            </main>
            <Footer/>
        </div>
    )
}

export default StandingsPage