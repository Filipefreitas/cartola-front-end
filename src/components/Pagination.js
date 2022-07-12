import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const Pagination = ({ currentPage, gamesPerPage, totalGames, paginate }) => 
{
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) 
  {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className='pagination-container'>
        <ul className='pagination'>
            <div className='page-item vertical-center'>
              <span className='vertical-center'>
                <a onClick={() => currentPage === 1 ? null : paginate(currentPage - 1)}>
                  <IoIosArrowBack className = {currentPage === 1 ? "arrows vertical-center grey" : "arrows vertical-center darkgray"}/>
                </a>
              </span>

              <span className="round-tilte vertical-center">{currentPage} ª RODADA</span>
              
              <span className='vertical-center'>
                <a onClick={() => currentPage === pageNumbers.length ? null : paginate(currentPage + 1)}>
                  <IoIosArrowForward className = { currentPage === pageNumbers.length ? "arrows vertical-center grey" : "arrows vertical-center darkgray"}/>
                </a>
              </span>
            </div>
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;