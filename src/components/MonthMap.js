import { React, useEffect, useState} from 'react'
import "../components/MonthMapCard.js"
import MonthMapCard from '../components/MonthMapCard.js'
import "../css/App.css"
import "../css/utilities.css"


const MonthMap = (props) => {
    
    return (    
        <main>    
            <label>selecione o mês: </label>
            <select
                onChange={(event)=>{    
                    props.findMonthValue(event.target.value)
                }}>
                
                {props.dropdownOptions.map((option)=> { return (   
                                    <option key={option.value}
                                        >
                                        {option.label}
                                    </option>
                )})}
            </select>
            
            <MonthMapCard filteredRounds={props.filteredRounds} runningStats={props.runningStats} histGames={props.histGames}/>

        </main>
    )
}

export default MonthMap