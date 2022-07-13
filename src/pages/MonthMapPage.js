import { React, useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import MonthMap from '../components/MonthMap';

const MonthMapPage = (props) => 
{   
    const dropdownOptions = [
        { 
            value: 4
            , label: "Abril"
        }, 
        { 
            value: 5
            , label: "Maio"
        }, 
        { 
            value: 6
            , label: "Junho"
        }, 
        { 
            value: 7
            , label: "Julho"
        }, 
        { 
            value: 8
            , label: "Agosto"
        }, 
        { 
            value: 9
            , label: "Setembro"
        }, 
        { 
            value: 10
            , label: "Outubro"
        }, 
        { 
            value: 11
            , label: "Novembro"
        }, 
    ]
    
    const [month, setMonth] = useState(dropdownOptions[0].value);
    
    const [rounds , setRounds] = useState([{}]);
    
    const [filteredRounds , setFilteredRounds] = useState([{}]);

    const [percDiffs , setPercDiffs] = useState([{}]);
    
    const [histGames , setHistGames] = useState([{}]);

    //reset state of game list, then filter them according to the selected month
    useEffect(()=>{ 
        setRounds(props.games)
        setFilteredRounds(props.games.filter(rounds => rounds.cartolaMonth === month))
    })

    const findMonthValue = (input) => {
        let index = dropdownOptions.filter(option => { 
            return option.label === input
        })
        setMonth(index[0].value);
        filterRounds(index[0].value);
    };

    const filterRounds = (month)=>{
        let newRounds = [{}];
    
        newRounds = rounds.filter((round)=>{
            return round.cartolaMonth === month;
        })
        setFilteredRounds(newRounds);
    };

    //fetch percentual difference points earned between home team and away team
    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/games/percDiff`)
        .then(response=>response.json())
        .then(json=>{
            setPercDiffs(json.data)    
        })
        .catch(err=>{
                console.log(`Error ${err}`)
            })
        }, []);

    //fetch past games
    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/histgames/matches`)
        .then(response=>response.json())
        .then(json=>{
            setHistGames(json.data)    
        })
        .catch(err=>{
                console.log(`Error ${err}`)
            })
        }, []);

    return (
        <div>
            <Header/>
            <main>
                <h3 className="section-title">MAPA JOGOS MÊS</h3>
                <MonthMap rounds={rounds} setRounds={setRounds} 
                            filteredRounds={filteredRounds} setFilteredRounds={setFilteredRounds} 
                            month={month} setMonth={setMonth} 
                            dropdownOptions={dropdownOptions} 
                            findMonthValue={findMonthValue}
                            runningStats={props.runningStats} setRunningStats={props.setRunningStats}
                            histGames={histGames} setHistGames={setHistGames}
                            percDiffs={percDiffs} setPercDiffs={setPercDiffs}
                            />
            </main>
            <Footer/>
        </div>
    )
}

export default MonthMapPage