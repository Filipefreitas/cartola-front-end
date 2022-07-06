import { React, useEffect, useState, useLocation } from 'react'

import "../css/App.css"
import "../css/utilities.css"

const MonthMapCard = (props) => {

    return (
        <main>
            <div className='month-map grid grid-col-4'>
                <table id="round-map" className='month-map-tables'>
                    <div>
                        <h3 className="text-left-alligned">Dados rodada</h3>
                        <thead>
                            <tr>
                                <th className>Data</th>
                                <th>Rodada</th>
                                <th>Mandante</th>
                                <th colspan="3">Placar</th>
                                <th>Visitante</th>
                            </tr>
                        </thead>

                        <tbody className='month-map-box'>
                            {props.filteredRounds.map((filteredRound,roundTeamKey)=> { return (
                                <tr key={roundTeamKey}>
                                        <td>{(new Date(filteredRound.gameDate)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</td>
                                        <td>{filteredRound.tournmentRound}</td>
                                        <td>{filteredRound.homeTeam}</td>
                                        <td>{filteredRound.homeScore}</td>
                                        <td>x</td>
                                        <td>{filteredRound.awayScore}</td>
                                        <td>{filteredRound.awayTeam}</td>
                                    </tr>
                                )})}
                        </tbody>
                    </div>
                </table>
                
                <table id="home-stats" className='month-map-tables'>
                    <div>
                        <h3 className="text-left-alligned">Dados mandante</h3>
                        <thead>
                            <tr>
                                <th>%</th>
                                <th>P</th>
                                <th>J</th>
                                <th>V</th>
                                <th>E</th>
                                <th>D</th>
                                <th>GP</th>
                                <th>GC</th>
                                <th>SG</th>
                                <th>CS</th>
                                <th>NGS</th>
                            </tr>
                        </thead>

                        <tbody className='month-map-box'>
                            {props.filteredRounds.map((filteredRound, roundTeamKey) => { return (
                                <tr key={roundTeamKey}>
                                    {props.runningStats.map((runningStat) => {
                                        if(filteredRound.homeTeam === runningStat.team && filteredRound.tournmentRound === runningStat.round)  
                                            return (
                                                [
                                                    <td key={1}>{runningStat.percPointsHome}</td>
                                                    , <td key={2}>{runningStat.pointsHome}</td>
                                                    , <td key={3}>{runningStat.playedHome}</td>
                                                    , <td key={4}>{runningStat.wonHome}</td>
                                                    , <td key={5}>{runningStat.drawnHome}</td>
                                                    , <td key={6}>{runningStat.lostHome}</td>
                                                    , <td key={7}>{runningStat.goalsScoredHome}</td>
                                                    , <td key={8}>{runningStat.goalsAgainstHome}</td>
                                                    , <td key={9}>{runningStat.goalsDifferenceHome}</td>
                                                    , <td key={10}>{runningStat.cleanSheetsHome}</td>
                                                    , <td key={11}>{runningStat.noGoalsHome}</td>
                                            ]
                                            );
                                        })}
                                </tr>
                                );
                            })}
                        </tbody>
                    </div>
                </table>

                <table id="away-stats" className='month-map-tables'>
                    <div>
                    <h3 className="text-left-alligned">Dados visitante</h3>
                        <thead>
                            <tr>
                                <th>%</th>
                                <th>P</th>
                                <th>J</th>
                                <th>V</th>
                                <th>E</th>
                                <th>D</th>
                                <th>GP</th>
                                <th>GC</th>
                                <th>SG</th>
                                <th>CS</th>
                                <th>NGS</th>
                            </tr>
                        </thead>

                        <tbody className='month-map-box'>
                            {props.filteredRounds.map((filteredRound, roundTeamKey) => { return (
                                <tr key={roundTeamKey}>
                                    {props.runningStats.map((runningStat, roundTeamKey) => {
                                        if(filteredRound.awayTeam === runningStat.team && filteredRound.tournmentRound === runningStat.round)  
                                            return (
                                                [
                                                    <td key={1}>{runningStat.percPointsAway}</td>
                                                    , <td key={2}>{runningStat.pointsAway}</td>
                                                    , <td key={3}>{runningStat.playedAway}</td>
                                                    , <td key={4}>{runningStat.wonAway}</td>
                                                    , <td key={5}>{runningStat.drawnAway}</td>
                                                    , <td key={6}>{runningStat.lostAway}</td>
                                                    , <td key={7}>{runningStat.goalsScoredAway}</td>
                                                    , <td key={8}>{runningStat.goalsAgainstAway}</td>
                                                    , <td key={9}>{runningStat.goalsDifferenceAway}</td>
                                                    , <td key={10}>{runningStat.cleanSheetsAway}</td>
                                                    , <td key={11}>{runningStat.noGoalsAway}</td>
                                              ]
                                            );
                                        })}
                                </tr>
                                );
                            })}
                        </tbody>
                    </div>
                </table>  
                
                <table id="hist-games" className='month-map-tables'>
                    <div>
                    <h3 className="text-left-alligned">Últimos 5 confrontos</h3>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th colspan="3">Placar</th>
                                <th>Data</th>
                                <th colspan="3">Placar</th>
                                <th>Data</th>
                                <th colspan="3">Placar</th>
                                <th>Data</th>
                                <th colspan="3">Placar</th>
                                <th>Data</th>
                                <th colspan="3">Placar</th>
                            </tr>
                        </thead>

                        <tbody className='month-map-box'>
                                {props.filteredRounds.map((filteredRound) => { 
                                    if(filteredRound.isFisrtHistGame === "S")
                                    {
                                        return (<tr><td>-</td></tr>);
                                    }
                                    
                                    return(
                                        <tr>
                                        {props.histGames.map((histGame) => {
                                            if(filteredRound.homeTeam === histGame.homeTeam && filteredRound.awayTeam === histGame.awayTeam && histGame.countMatches <= 4)  
                                            {
                                                return (
                                                    [
                                                <td>{(new Date(histGame.gameDate)).toLocaleDateString('br-PT', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                                                , <td key={2}>{histGame.homeScore}</td>
                                                , <td key={3}>-</td>
                                                , <td key={4}>{histGame.awayScore}</td>
                                            ]);    
                                        }
                                    })}
                                    </tr>
                                    )
                                })}
                        </tbody>
                    </div>
                </table>  
            </div>
        </main>
    )
}

export default MonthMapCard

