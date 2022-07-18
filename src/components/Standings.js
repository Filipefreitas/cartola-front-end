import React from 'react'
import "../css/App.css"
import "../css/utilities.css"

import { FaCircle } from 'react-icons/fa';

const Standings = (props) => {
    return (
        <main>
            <div>
                <table id="standings" className='standings-table horizontal-center'>
                    <div>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-left-alligned">Time</th>
                                <th>P</th>
                                <th>J</th>
                                <th>V</th>
                                <th>E</th>
                                <th>D</th>
                                <th>GP</th>
                                <th>GC</th>
                                <th>SG</th>
                                <th>CS</th>
                                <th>NG</th>
                                <th>%</th>
                                <th colSpan="5" className="no-wrap">ULT. JOGOS</th>
                            </tr>
                        </thead>

                        <tbody className='standings-body'>
                            {props.stats.map((stat,index)=> { return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td id="team-name" className="text-left-alligned">{stat.team}</td>
                                                <td>{stat.points}</td>
                                                <td>{stat.played}</td>
                                                <td>{stat.won}</td>
                                                <td>{stat.drawn}</td>
                                                <td>{stat.lost}</td>
                                                <td>{stat.goalsScored}</td>
                                                <td>{stat.goalsAgainst}</td>
                                                <td>{stat.goalsDifference}</td>
                                                <td>{stat.cleanSheets}</td>
                                                <td>{stat.noGoals}</td>
                                                <td>{stat.percPoints}</td>
                                            
                                                <td>
                                                    {props.roundsStats.map((roundsStat) => {
                                                        for(let i = 4; i >= 0; i--)
                                                        {
                                                            if(stat.team === roundsStat.team)  
                                                            {
                                                                const matchKey = stat.team + "_" + parseInt(stat.played - i)
                                                                if(roundsStat.roundTeamKey === matchKey)
                                                                {
                                                                    if(roundsStat.won === 1)
                                                                    {
                                                                        return([<td className='icon-result green size-9'><FaCircle/></td>])
                                                                    }
                                                                    else if(roundsStat.drawn === 1)
                                                                    {
                                                                        return([<td className='icon-result grey size-9'><FaCircle/></td>])
                                                                    }
                                                                    else if(roundsStat.lost === 1)
                                                                    {
                                                                        return([<td className='icon-result red size-9'><FaCircle/></td>])
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    })}
                                                </td>
                                            </tr>
                            )})}
                        </tbody>
                    </div>
                </table>
            </div>
    </main>
    )
}

export default Standings