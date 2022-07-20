import React from "react";

import "../css/App.css"
import "../css/utilities.css"
import "../css/modal.css"

const Modal = (props) => {
  return (
    <div className={props.modalOn ? "visible modal-container" : "hide"} role="dialog">
        <button type="button" class="close-modal btn-close" data-dismiss="modal" aria-hidden="true" onClick={() => props.setModalOn(false)}>×</button> 
        <table>
          <div class="modal-table">     
            <thead>
                <tr>
                  <th>Data</th>
                  <th>Rodada</th>
                  <th>Mandante</th>
                  <th>Placar</th>
                  <th>x</th>
                  <th>Placar</th>
                  <th>Visitante</th>
                </tr>
            </thead>

          <tbody className='month-map-box'>
            {props.modalItems.map((modalItem,_id)=> { 
                  return (
                      <tr key={_id}>
                        <td>{(new Date(modalItem.gameDate)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</td>
                        <td>{modalItem.tournmentRound}</td>
                        <td>{modalItem.homeTeam}</td>
                        <td>{modalItem.homeScore}</td>
                        <td>x</td>
                        <td>{modalItem.awayScore}</td>
                        <td>{modalItem.awayTeam}</td>
                      </tr>
              )})}          
          </tbody>
        </div>
      </table>
    </div>
)};

export default Modal
