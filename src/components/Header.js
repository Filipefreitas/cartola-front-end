import React from 'react'
import {Link} from "react-router-dom";
import {TbLetterF} from 'react-icons/tb'

import "../css/App.css"
import "../css/utilities.css"

const Header = () => {
  return (
    <header className="container top-nav-container logo grid grid-col-3 horizontal-center font-white">
      <div className="vertical-center">
          <Link className="logo pointer" to="/"><TbLetterF/></Link>
      </div>

      <div>
        <div className="vertical-center">
            <Link to="/rankings" className="top-nav-item no-decoration font-white">Rankings</Link>
            <Link to="/map" className="top-nav-item no-decoration font-white">Mapa estatístico</Link>
            <Link to="/standings" className="top-nav-item no-decoration font-white">Tabela</Link>
        </div>
      </div>

      <div>
      </div>
    
</header>
  )
}

export default Header