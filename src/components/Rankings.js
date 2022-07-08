'use strict';

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
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
        {field: 'team', rowGroup: true, width: 120}
        , {field: 'round', pivot: true, pivotComparator: (valueA, valueB) => valueA - valueB}
        , {field: 'points', width: colWidth, aggFunc: 'sum'}
        , {field: 'pointsHome', width: colWidth}
        , {field: 'pointsAway', width: colWidth}
        , {field: 'won', width: colWidth}
        , {field: 'wonHome', width: colWidth}
        , {field: 'wonAway', width: colWidth}
        , {field: 'drawn', width: colWidth}
        , {field: 'drawnHome', width: colWidth}
        , {field: 'drawnAway', width: colWidth}
        , {field: 'lost', width: colWidth}
        , {field: 'lostHome', width: colWidth}
        , {field: 'lostAway', width: colWidth}
        , {field: 'goalsScored', width: colWidth}
        , {field: 'goalsScoredHome', width: colWidth}
        , {field: 'goalsScoredAway', width: colWidth}
        , {field: 'goalsAgainst', width: colWidth}
        , {field: 'goalsAgainstHome', width: colWidth}
        , {field: 'goalsAgainstAway', width: colWidth}
        , {field: 'goalsDifference', width: colWidth}
        , {field: 'goalsDifferenceHome', width: colWidth}
        , {field: 'goalsDifferenceAway', width: colWidth}
        , {field: 'cleanSheets', width: colWidth}
        , {field: 'cleanSheetsHome', width: colWidth}
        , {field: 'cleanSheetsAway', width: colWidth}
        , {field: 'noGoals', width: colWidth}
        , {field: 'noGoalsHome', width: colWidth}
        , {field: 'noGoalsAway', width: colWidth}
        , {field: 'percPoints', width: colWidth}
        , {field: 'percPointsHome', width: colWidth}
        , {field: 'percPointsAway', width: colWidth}
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
    
    //fetch data when grid is ready   
    const onGridReady = useCallback((params) => {
    fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/games/runningStats`)
        .then(response=>response.json())
        .then(json=>{
            setRowData(json.data)    
    })
    .catch(err=>{
            console.log(`Error ${err}`)
        })
    }, []);

    const gridOptions = {
        suppressAggFuncInHeader: true
        , suppressSizeToFit: true
        , pivotMode: true
        , toolPanel: 'columns'
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
