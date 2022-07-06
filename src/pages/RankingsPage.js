import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Rankings from '../components/Rankings';

const RankingsPage = (props) => 
{  
    return (
        <div>
            <Header/>
            <main>
                <h3 className="section-title">Rankings Page</h3>
                <Rankings runningStats={props.runningStats} setRunningStats={props.setRunningStats}/>
            </main>
            <Footer/>
        </div>
    )
}

export default RankingsPage