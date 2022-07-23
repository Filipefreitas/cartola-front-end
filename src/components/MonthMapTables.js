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
    const setBorders = (filteredRound, tableType) => {
        let tableRoundKey = tableType + "_" + filteredRound.tournmentRound
        let isNewRound = "not-new";
        
        if(gameRounds.indexOf(tableRoundKey) === -1)
        {
            gameRounds.push(tableRoundKey)
            isNewRound = "new-round";
        } 

        return isNewRound;
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


    return (
        <main>
            <Modal modalOn={modalOn} setModalOn={setModalOn} modalItems={modalItems} teamConfig={teamConfig} selectedTeam={selectedTeam}/>
            
            <div className='month-map grid grid-col-5'>
                <table id="round-map" className='month-map-tables'>
                    <div>
                        <h4 className="text-left-alligned table-title">Dados rodada</h4>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Rodada</th>
                                <th>Mandante</th>
                                <th colSpan="3">Placar</th>
                                <th>Visitante</th>
                            </tr>
                        </thead>

                        <tbody className='month-map-box'>
                            {props.filteredRounds.map((filteredRound,index)=> {                                     
                                const newRound = setBorders(filteredRound, "table-rounds")
                                                                    
                            return (
                                <tr key={index}>
                                        <td className={newRound}>{(new Date(filteredRound.gameDate)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</td>
                                        <td className={newRound}>{filteredRound.tournmentRound}</td>
                                        <td className={`pointer ${newRound}`}
                                            onClick={() => {modalDefinitions(filteredRound.homeTeam, "homeModal")}}>
                                                {filteredRound.homeTeam}
                                        </td>
                                        <td className={newRound}>{filteredRound.homeScore}</td>
                                        <td className={newRound}>x</td>
                                        <td className={newRound}>{filteredRound.awayScore}</td>
                                        <td className={`pointer ${newRound}`}
                                            onClick={() => {modalDefinitions(filteredRound.awayTeam, "awayModal")}}>
                                                {filteredRound.awayTeam}
                                        </td>
                                    </tr>
                                )})}
                        </tbody>
                    </div>
                </table>
                
                <table id="home-stats" className='month-map-tables'>
                    <div>
                        <h4 className="text-left-alligned table-title">Dados mandante</h4>
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
                            {props.filteredRounds.map((filteredRound, roundTeamKey) => { 
                                const newRound = setBorders(filteredRound, "table-home")
                                
                                return (
                                <tr key={roundTeamKey}>
                                    {props.runningStats.map((runningStat) => {
                                        if(filteredRound.homeTeam === runningStat.team && filteredRound.tournmentRound === runningStat.round)
                                            return (
                                                [
                                                    <td key={1} className={newRound}>{runningStat.percPointsHome}</td>
                                                    , <td key={2} className={newRound}>{runningStat.pointsHome}</td>
                                                    , <td key={3} className={newRound}>{runningStat.playedHome}</td>
                                                    , <td key={4} className={newRound}>{runningStat.wonHome}</td>
                                                    , <td key={5} className={newRound}>{runningStat.drawnHome}</td>
                                                    , <td key={6} className={newRound}>{runningStat.lostHome}</td>
                                                    , <td key={7} className={newRound}>{runningStat.goalsScoredHome}</td>
                                                    , <td key={8} className={newRound}>{runningStat.goalsAgainstHome}</td>
                                                    , <td key={9} className={newRound}>{runningStat.goalsDifferenceHome}</td>
                                                    , <td key={10} className={newRound}>{runningStat.cleanSheetsHome}</td>
                                                    , <td key={11} className={newRound}>{runningStat.noGoalsHome}</td>
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
                    <h4 className="text-left-alligned table-title">Dados visitante</h4>
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
                            {props.filteredRounds.map((filteredRound, roundTeamKey) => { 
                                const newRound = setBorders(filteredRound, "table-away")

                                return (
                                <tr key={roundTeamKey}>
                                    {props.runningStats.map((runningStat) => {
                                        if(filteredRound.awayTeam === runningStat.team && filteredRound.tournmentRound === runningStat.round)  
                                            return (
                                                [
                                                    <td key={1} className={newRound}>{runningStat.percPointsAway}</td>
                                                    , <td key={2} className={newRound}>{runningStat.pointsAway}</td>
                                                    , <td key={3} className={newRound}>{runningStat.playedAway}</td>
                                                    , <td key={4} className={newRound}>{runningStat.wonAway}</td>
                                                    , <td key={5} className={newRound}>{runningStat.drawnAway}</td>
                                                    , <td key={6} className={newRound}>{runningStat.lostAway}</td>
                                                    , <td key={7} className={newRound}>{runningStat.goalsScoredAway}</td>
                                                    , <td key={8} className={newRound}>{runningStat.goalsAgainstAway}</td>
                                                    , <td key={9} className={newRound}>{runningStat.goalsDifferenceAway}</td>
                                                    , <td key={10} className={newRound}>{runningStat.cleanSheetsAway}</td>
                                                    , <td key={11} className={newRound}>{runningStat.noGoalsAway}</td>
                                              ]
                                            );
                                        })}
                                </tr>
                                );
                            })}
                        </tbody>
                    </div>
                </table>  
                
                <table id="perc-diff" className='month-map-tables'>
                    <div>
                    <h4 className="text-left-alligned table-title">Aprov</h4>
                        <thead>
                            <tr>
                                <th>% Diff</th>
                            </tr>
                        </thead>

                        <tbody className='perc-diff-box'>
                            {props.filteredRounds.map((filteredRound, roundTeamKey) => { 
                                const newRound = setBorders(filteredRound, "table-perc-diff")

                                return (
                                <tr key={roundTeamKey}>
                                    {props.percDiffs.map((percDiff) => {
                                        if(filteredRound.homeTeam === percDiff.homeTeam && filteredRound.awayTeam === percDiff.awayTeam && filteredRound.tournmentRound === percDiff.tournmentRound)   
                                            return (
                                            [
                                                <td key={1} className={newRound}>{percDiff.percDiff}</td>
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
                    <h4 className="text-left-alligned table-title">Últimos 5 confrontos série A</h4>
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

                        <tbody className='month-map-box'>
                                {props.filteredRounds.map((filteredRound) => { 
                                    const newRound = setBorders(filteredRound, "table-last-games")

                                    if(filteredRound.isFisrtHistGame === "S")
                                    {
                                        return (<tr><td className={newRound}>-</td></tr>);
                                    }
                                    
                                    return(
                                        <tr>
                                        {props.histGames.map((histGame) => {
                                            if(filteredRound.homeTeam === histGame.homeTeam && filteredRound.awayTeam === histGame.awayTeam && histGame.countMatches <= 4)  
                                            {
                                                return (
                                                [
                                                    <td className={newRound}>{(new Date(histGame.gameDate)).toLocaleDateString('br-PT', { month: '2-digit', day: '2-digit', year: '2-digit' })}</td>
                                                    , <td key={2} className={histGame.gameWinner === "home"? `background-green ${newRound}` :
                                                                            histGame.gameWinner === "away"? `background-red ${newRound}` : `background-grey ${newRound}`}>{histGame.gameResult}</td>
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

export default MonthMapTables