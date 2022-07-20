import { React } from 'react'
import MonthMapTables from '../components/MonthMapTables.js'
import "../css/App.css"
import "../css/utilities.css"


const MonthMap = (props) => {
    
    return (    
        <main>    
            <div className="drop-down-container text-left-alligned">
                <label>Selecione o mês: </label>
                <select className="drop-down"
                    onChange={(event)=>{    
                        props.findMonthValue(event.target.value)
                    }}>
                    
                    {props.dropdownOptions.map((option)=> { return (   
                                        <option key={option.value}>
                                            {option.label}
                                        </option>
                    )})}
                </select>
            </div>
            
            <div>
                <MonthMapTables 
                    games={props.games}
                    rounds={props.rounds} 
                    filteredRounds={props.filteredRounds} 
                    runningStats={props.runningStats} 
                    histGames={props.histGames} 
                    percDiffs={props.percDiffs}
                />
            </div>

        </main>
    )
}

export default MonthMap