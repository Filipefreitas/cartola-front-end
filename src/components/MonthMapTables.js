import { React, useState } from 'react'
import Modal from '../components/Modal.js'

import "../css/App.css"
import "../css/utilities.css"

const MonthMapTables = (props) => {

    const [modalOn, setModalOn] = useState(false);

    const [modalItems, setModalItems] = useState([{}]);

    const [teamConfig, setTeamConfig] = useState();

    const [selectedTeam, setSelectedTeam] = useState();

    let gameRounds = [];
    
    //function used to identify first game of a new round to add borders to the table
    const newTournmentRound = (filteredRound, tableType) => {
        let tableRoundKey = tableType + "_" + filteredRound.tournmentRound
        let isNewRound = false;
        
        if(gameRounds.indexOf(tableRoundKey) === -1)
        {
            gameRounds.push(tableRoundKey)
            isNewRound = true;
        } 

        return isNewRound;
    }

    const printHeaders = (tableType) => {
        if(tableType === "table-rounds")
        {
            return (    
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Rodada</th>
                        <th>Mandante</th>
                        <th colSpan="3">Placar</th>
                        <th>Visitante</th>
                    </tr>
                </thead>
        )}

        else if(tableType === "table-home" || tableType === "table-away")
        {
            return (   
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
        )}

        else if(tableType === "table-perc-diff")
        {
            return (   
                <thead>
                    <tr>
                        <th>% Diff</th>
                    </tr>
                </thead>
        )}

        else if(tableType === "table-last-games")
        {
            return (
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Placar</th>
                        <th>Data</th>
                        <th>Placar</th>
                        <th>Data</th>
                        <th>Placar</th>
                        <th>Data</th>
                        <th>Placar</th>
                        <th>Data</th>
                        <th>Placar</th>
                    </tr>
                </thead>
        )}
    }

    const printBody = (filteredRound, tableType) => {
        if(tableType === "table-rounds")
        {
            return(
                <tbody className='month-map-box'>
                    <tr>
                        <td>{(new Date(filteredRound.gameDate)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</td>
                        <td>{filteredRound.tournmentRound}</td>
                        <td className="pointer"
                            onClick={() => { modalDefinitions(filteredRound.homeTeam, "homeModal") } }>
                            {filteredRound.homeTeam}
                        </td>
                        <td>{filteredRound.homeScore}</td>
                        <td>x</td>
                        <td>{filteredRound.awayScore}</td>
                        <td className="pointer"
                            onClick={() => { modalDefinitions(filteredRound.awayTeam, "awayModal") } }>
                            {filteredRound.awayTeam}
                        </td>
                    </tr>
                </tbody>
            )}

        else if(tableType === "table-home")
        {
            return (   
                <tbody className='month-map-box'>
                <tr>
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
            </tbody>
        )}

        else if(tableType === "table-away")
        {
            return (   
                <tbody className='month-map-box'>
                <tr>
                    {props.runningStats.map((runningStat) => {
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
            </tbody>
        )}

        else if(tableType === "table-perc-diff")
        {
            return (   
                <tbody className='perc-diff-box'>
                <tr>
                    {props.percDiffs.map((percDiff) => {
                        if(filteredRound.homeTeam === percDiff.homeTeam && filteredRound.awayTeam === percDiff.awayTeam && filteredRound.tournmentRound === percDiff.tournmentRound)   
                        return (
                            [
                                <td key={1}>{percDiff.percDiff}</td>
                            ]
                            );
                        })}
                </tr>
            </tbody>
        )}

        else if(tableType === "table-last-games")
        {
            return (
                <tbody className='month-map-box'>
                    <tr>
                        {props.histGames.map((histGame) => {
                            if(filteredRound.homeTeam === histGame.homeTeam && filteredRound.awayTeam === histGame.awayTeam && histGame.countMatches <= 4)  
                            {
                                return (
                                    [
                                        <td>{(new Date(histGame.gameDate)).toLocaleDateString('br-PT', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                                        , <td key={2} className={histGame.gameWinner === "home"? "background-green" :
                                                                histGame.gameWinner === "away"? "background-red" : "background-grey"}>{histGame.gameResult}</td>
                                    ]);    
                                }
                            })}
                    </tr>
                </tbody>
        )}
    }

    const modalDefinitions = (team, config) => {
                
        let modalGames = [];

        if(config === "homeModal")
        {
            setTeamConfig("mandante");

            {props.games.map((game,_id)=> { 
                if(game.homeTeam === team && game.homeScore !== undefined)
                {
                    const modalGame = {
                        tournmentRound: game.tournmentRound
                        , gameDate: game.gameDate
                        , homeTeam: game.homeTeam
                        , homeScore: game.homeScore
                        , awayTeam: game.awayTeam
                        , awayScore: game.awayScore
                    }
                    modalGames.push(modalGame);
                }})
            }
        }
        else
        {
            setTeamConfig("visitante");

            {props.games.map((game,_id)=> { 
                if(game.awayTeam === team && game.awayScore !== undefined)
                {
                    const modalGame = {
                        tournmentRound: game.tournmentRound
                        , gameDate: game.gameDate
                        , homeTeam: game.homeTeam
                        , homeScore: game.homeScore
                        , awayTeam: game.awayTeam
                        , awayScore: game.awayScore
                    }
                    modalGames.push(modalGame);
                }})
            }
        }

        setSelectedTeam(team);
        setModalItems(modalGames);
        setModalOn(!modalOn);
    }

    const printTable = (newRound, headers, tableBody, isFirstGame) => {
        if(newRound){
            if(isFirstGame === "S")
            {
                return (<tr><td>-</td></tr>);
            }

            return (
                <>{headers}
                {tableBody}</>
            )}
        else {
            if(isFirstGame === "S")
            {
                return (<tr><td>-</td></tr>);
            }
            
            return (<>{tableBody}</>)}
    }

    return (
        <main>
            <Modal modalOn={modalOn} setModalOn={setModalOn} modalItems={modalItems} teamConfig={teamConfig} selectedTeam={selectedTeam}/>
            
            <div className='month-map grid grid-col-5'>
                <table id="round-map" className='month-map-tables'>
                    <div>
                        <h4 className="text-left-alligned table-title">Dados rodada</h4>

                        {props.filteredRounds.map((filteredRound)=> {                                     
                            const newRound = newTournmentRound(filteredRound, "table-rounds")
                            const headers = printHeaders("table-rounds")
                            const tableBody = printBody(filteredRound, "table-rounds")
                            return printTable(newRound, headers, tableBody)
                        })}
                    </div>
                </table>
                
                <table id="home-stats" className='month-map-tables'>
                    <div>
                        <h4 className="text-left-alligned table-title">Dados mandante</h4>

                        {props.filteredRounds.map((filteredRound) => { 
                            const newRound = newTournmentRound(filteredRound, "table-home")
                            const headers = printHeaders("table-home")
                            const tableBody = printBody(filteredRound, "table-home")
                            return printTable(newRound, headers, tableBody)
                        })}
                    </div>
                </table>

                <table id="away-stats" className='month-map-tables'>
                    <div>
                        <h4 className="text-left-alligned table-title">Dados visitante</h4>

                        {props.filteredRounds.map((filteredRound) => { 
                            const newRound = newTournmentRound(filteredRound, "table-away")
                            const headers =  printHeaders("table-away");
                            const tableBody = printBody(filteredRound, "table-away")
                            return printTable(newRound, headers, tableBody)
                        })}
                    </div>
                </table>  
                
                <table id="perc-diff" className='month-map-tables'>
                    <div>
                        <h4 className="text-left-alligned table-title">Aprov</h4>

                        {props.filteredRounds.map((filteredRound) => { 
                            const newRound = newTournmentRound(filteredRound, "table-perc-diff")
                            const headers = printHeaders("table-perc-diff");
                            const tableBody = printBody(filteredRound, "table-perc-diff")
                            return printTable(newRound, headers, tableBody)
                        })}
                    </div>
                </table>  

                <table id="hist-games" className='month-map-tables'>
                    <div>
                        <h4 className="text-left-alligned table-title">Últimos 5 confrontos série A</h4>
                            {props.filteredRounds.map((filteredRound) => { 
                                const newRound = newTournmentRound(filteredRound, "table-last-games")
                                const headers = printHeaders("table-last-games")
                                const tableBody = printBody(filteredRound, "table-last-games")
                                const isFirstGame = filteredRound.isFisrtHistGame
                                return printTable(newRound, headers, tableBody, isFirstGame)
                            })}
                    </div>
                </table>  
            </div>
        </main>
    )
}

export default MonthMapTables