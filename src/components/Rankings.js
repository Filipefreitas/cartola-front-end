import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component


import "../css/App.css"
import "../css/utilities.css"

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

const Rankings = (props) => {

    const [rowData,  setRowData] = useState([{}]);

    //running stats
    useEffect(()=>{ 
        fetch(`${process.env.REACT_APP_BACK_END_API_DOMAIN}/games/roundStats`)
        .then(response=>response.json())
        .then(json=>{
            setRowData(json.data)    
        })
        .catch(err=>{
                console.log(`Error ${err}`)
            })
        }, []);

    const gridOptions = {
        columnDefs: [
         {field: 'round', pivot: true, enablePivot: true}
         , {field: 'points', aggFunc: 'sum'}]
        
         , pivotMode: true
         , suppressAggFuncInHeader: true
    }
    
    return (
        <div className='ag-theme-alpine' style={{height: 500}}> 
            <AgGridReact
                rowData={rowData}
                columnDefs={gridOptions.columnDefs}
                gridOptions={gridOptions}
                />
        </div>
    )
}

export default Rankings