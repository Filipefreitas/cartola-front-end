
import { React, useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Standings from '../components/Standings';
import Games from '../components/Games';
import Pagination from '../components/Pagination';

const StandingsPage = (props) => 
{  
    const [stats , setStats ] = useState([{}]);

    const [roundsStats , setRoundsStats] = useState([{}]);
  
    const [loading, setLoading] = useState(false);
    
    const [currentPage, setCurrentPage] = useState();
  
    const [gamesPerPage] = useState(10);

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

    //identify the last played round to properly load the game list in the standings page
    useEffect(()=>{ 
        let playedRounds = [];
        for(let i = 0; i < props.runningStats.length; i++)
        {
            if(props.runningStats[i].alreadyPlayed && !playedRounds.includes(props.runningStats[i].round))
            {
                playedRounds.push(props.runningStats[i].round)
            }
        }
        const latestRound = Math.max( ...playedRounds );
        //if no rounds have been played, load the first round
        if(latestRound === undefined)
        {
            setCurrentPage(1)
        }
        //if all rounds have been played, load the last round
        else if(latestRound === 38)
        {
            setCurrentPage(38)
        }
        //if the tournament is anywhere between the first and last rounds, load the next round
        else
        {
            setCurrentPage(Math.max( ...playedRounds ) + 1);
        }
    }, []);
        
    const indexOfLastGame  = currentPage * gamesPerPage;
    const indexOfFirstGame  = indexOfLastGame - gamesPerPage;
    const currentGames = props.games.slice(indexOfFirstGame, indexOfLastGame);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Header/>
            <main>
                <div className="table-container horizontal-center grid grid-col-2-3">
                    <div calssName="horizontal-center">
                        <h3 className="section-title">TABELA</h3>
                        <Standings stats={stats} roundsStats={roundsStats}/>
                    </div>

                    <div>
                        <h3 className="section-title">JOGOS</h3>
                        
                        <Pagination
                            gamesPerPage={gamesPerPage}
                            totalGames={props.games.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                        
                        <Games games={currentGames} loading={loading} />
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default StandingsPage