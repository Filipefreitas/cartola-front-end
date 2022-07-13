'use strict';

import React, { useState, useRef, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import "../css/App.css"
import "../css/utilities.css"

const Rankings = (props) => {
    
    const gridRef = useRef();
    
    const [rowData,  setRowData] = useState([{}]);
    
    const rowHeight = 28;

    const colWidth = 70;

    const [columnDefs, setColumnDefs] = useState([
        {field: 'team', headerName: "Time", rowGroup: true, width: 120}
        , {field: 'round', headerName: "Rodada", pivot: true, pivotComparator: (valueA, valueB) => valueA - valueB}
        , {field: 'points', headerName: "Pontos", width: colWidth, aggFunc: 'sum'}
        , {field: 'pointsHome', headerName: "Pontos - mandante", width: colWidth}
        , {field: 'pointsAway', headerName: "Pontos - visitante", width: colWidth}
        , {field: 'won', headerName: "Vitórias", width: colWidth}
        , {field: 'wonHome', headerName: "Vitórias - mandante", width: colWidth}
        , {field: 'wonAway', headerName: "Pontos - visitante", width: colWidth}
        , {field: 'drawn', headerName: "Empates", width: colWidth}
        , {field: 'drawnHome', headerName: "Empates - mandante", width: colWidth}
        , {field: 'drawnAway', headerName: "Empates - visitante", width: colWidth}
        , {field: 'lost', headerName: "Derrotas", width: colWidth}
        , {field: 'lostHome', headerName: "Derrotas - mandante", width: colWidth}
        , {field: 'lostAway', headerName: "Derrotas - visitante", width: colWidth}
        , {field: 'goalsScored', headerName: "Gols marcados", width: colWidth}
        , {field: 'goalsScoredHome', headerName: "Gols marcados - mandante",width: colWidth}
        , {field: 'goalsScoredAway', headerName: "Gols marcados - visitante", width: colWidth}
        , {field: 'goalsAgainst', headerName: "Gols sofridos", width: colWidth}
        , {field: 'goalsAgainstHome', headerName: "Gols sofridos - mandante",  width: colWidth}
        , {field: 'goalsAgainstAway', headerName: "Gols sofridos - visitante", width: colWidth}
        , {field: 'goalsDifference', headerName: "Saldo gols", width: colWidth}
        , {field: 'goalsDifferenceHome', headerName: "Saldo gols - mandante",  width: colWidth}
        , {field: 'goalsDifferenceAway', headerName: "Saldo gols - visitante",  width: colWidth}
        , {field: 'cleanSheets', headerName: "Não sofreu gols", width: colWidth}
        , {field: 'cleanSheetsHome', headerName: "Não sofreu gols - mandante", width: colWidth}
        , {field: 'cleanSheetsAway', headerName: "Não sofreu gols - visitante", width: colWidth}
        , {field: 'noGoals', headerName: "Não marcou  gols", width: colWidth}
        , {field: 'noGoalsHome', headerName: "Não marcou gols - mandante", width: colWidth}
        , {field: 'noGoalsAway', headerName: "Não marcou gols - visitante", width: colWidth}
        , {field: 'percPoints', headerName: "Aproveitamento", width: colWidth, pivot: false, defaultAggFunc: 'last'}
        , {field: 'percPointsHome', headerName: "Aproveitamento - mandante", width: colWidth, pivot: false, defaultAggFunc: 'last'}
        , {field: 'percPointsAway', headerName: "Aproveitamento - visitante", width: colWidth , pivot: false, defaultAggFunc: 'last'}
    ]);

    const defaultColDef = useMemo(() => {
        return {
          resizable: true
          , suppressSizeToFit: true
          , sortable: true
          , enableValue: true
          , enableRowGroup: true
          , enablePivot: true
          , enableColResize: true
          , suppressCount: true
        };
      }, []);

    const autoGroupColumnDef = {
    headerValueGetter: params => `${params.colDef.headerName}`
    , cellRendererParams: {
        suppressCount: true
      }
    };
    
    //filtering games that have already been played from running stats
    const onGridReady = useCallback(() => {
        setRowData(props.runningStats.filter((item) => {
            return item.alreadyPlayed === true;
        }))
    })

    const gridOptions = {
        suppressAggFuncInHeader: true
        , pivotMode: true
        , sideBar: 'columns'
    }
    
    return (
        <div className="ag-theme-alpine" style={{height: 675, width: 1600}}>   
           <AgGridReact
                ref={gridRef}
                rowData={rowData}
                rowHeight={rowHeight}
                columnDefs={columnDefs}
                autoGroupColumnDef={autoGroupColumnDef}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
               >
           </AgGridReact>
       </div>
    )
}

render(<Rankings></Rankings>, document.querySelector('#root'));

export default Rankings
