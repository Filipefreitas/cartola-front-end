import React from 'react';

const Games = ({ games, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
      <div className='game-container'>
        {games.map(game => (
          <div className="game-item">
              <div className='game-date'>{(new Date(game.gameDate)).toLocaleDateString('br-PT', { weekday: 'long', month: '2-digit', day: '2-digit', year: '2-digit' })}</div>
                <div className='grid grid-col-3'> 
                <div className='right-alligned vertical-center'>
                  <span>{game.homeTeam}</span>
                </div>            
                
                <div className='socre-box'>
                  <span className='score'>{game.homeScore}</span>
                  <span>x</span>
                  <span className='score'>{game.awayScore}</span>
                </div>            

                <div className='left-alligned vertical-center'>
                  <span>{game.awayTeam}</span>
                </div>      
            </div>      
          </div>            
        ))}
      </div>
  );
};

export default Games;