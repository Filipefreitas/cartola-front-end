
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
    
    const [currentPage, setCurrentPage] = useState(17);
  
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