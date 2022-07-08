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
        {
            field: 'team'
            , rowGroup: true
            , width: 80
        }
        , {
            field: 'round'
            , enablePivot: true
            , pivot: true
            , pivotComparator: (valueA, valueB) => valueA - valueB
            , width: colWidth
        }
        , {
            field: 'points'
            , aggFunc: 'sum'
            , width: colWidth
        }
    ]);

    const defaultColDef = useMemo(() => {
        return {
          resizable: true
          , suppressSizeToFit: true
          , sortable: true
        };
      }, []);
    
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
    }
    
    return (
        <div className="ag-theme-alpine" style={{height: 675, width: 1800}}>
           <AgGridReact
                ref={gridRef}
                rowData={rowData}
                rowHeight={rowHeight}
                columnDefs={columnDefs}
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
