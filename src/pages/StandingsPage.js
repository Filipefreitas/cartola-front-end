import { React, useEffect, useState, useLocation } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Standings from '../components/Standings';

const StandingsPage = (props) => 
{  
    return (
        <div>
            <Header/>
            <main>
                <h3 className="section-title">Standings Page</h3>
                <Standings stats={props.stats} roundsStats={props.roundsStats}/>
            </main>
            <Footer/>
        </div>
    )
}

export default StandingsPage