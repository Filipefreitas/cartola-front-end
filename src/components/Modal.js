import React from "react";

import "../css/App.css"
import "../css/utilities.css"
import "../css/modal.css"

const Modal = (props) => {
  return (
    <div className={props.modalOn ? "visible modal-container" : "hide"} role="dialog">
        <h4 className="">Desempenho do {props.selectedTeam} como {props.teamConfig}</h4>
        <button type="button" class="close-modal btn-close" data-dismiss="modal" aria-hidden="true" onClick={() => props.setModalOn(false)}>×</button> 
        <table className="modal-table">
          <div>     
            <thead className="orange-headers">
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

          <tbody>
            {props.modalItems.map((modalItem,_id)=> { 
              if(props.teamConfig === "mandante")
              {
                return (
                  <tr key={_id}>
                    <td>{(new Date(modalItem.gameDate)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</td>
                    <td>{modalItem.tournmentRound}</td>
                    <td>{modalItem.homeTeam}</td>
                    <td  className={modalItem.homeScore > modalItem.awayScore ? "background-green" : 
                                    modalItem.homeScore < modalItem.awayScore ? "background-red" : "background-grey"}>{modalItem.homeScore}</td>
                    <td>x</td>
                    <td>{modalItem.awayScore}</td>
                    <td>{modalItem.awayTeam}</td>
                  </tr>
                )}
                
                else
                {
                  return (
                    <tr key={_id}>
                      <td>{(new Date(modalItem.gameDate)).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</td>
                      <td>{modalItem.tournmentRound}</td>
                      <td>{modalItem.homeTeam}</td>
                      <td>{modalItem.homeScore}</td>
                      <td>x</td>
                      <td  className={modalItem.awayScore > modalItem.homeScore ? "background-green" : 
                                      modalItem.awayScore < modalItem.homeScore ? "background-red" : "background-grey"}>{modalItem.awayScore}</td>
                      <td>{modalItem.awayTeam}</td>
                    </tr>
                  )}
                }
            )}          
          </tbody>
        </div>
      </table>
    </div>
)};

export default Modal
