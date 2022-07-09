import { React, useEffect, useState, useLocation } from 'react'
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import stats from "../images/icons/stats.png"
import topThree from "../images/icons/top-three.png"
import standings from "../images/icons/standings.png"

const HomePage = (props) => 
{   
    return (
        <div>
            <Header/>
            <main>
                <section className="home-page-container">
                    <div>
                        <p>
                            Bem-vindo a uma página de estatísticas do Campeonato Brasileiro Serie A. Está página foi pensada para te ajudar a escalar seu time no Cartola FC.
                        </p>
                    </div>

                    <div className="home-container grid grid-col-2-2 horizontal-center">
                        <div>
                        <Link to="/rankings"><img className="horizontal-center" src={topThree} alt=""/></Link>
                        </div>

                        <div>
                            <p className="home-content left-alligned text-left-alligned">
                                Na página de Rankings, você encontra o desempenho de cada equipe no campeonato deste ano.
                            </p>
                        </div>
                    </div>

                    <div class="home-container grid grid-col-2-3 horizontal-center">
                            <div>
                                <p className="home-content right-alligned text-right-alligned">
                                    Na página Mapa Estatístico, você encontra o calendário de jogos válidos para o cartola dentro de um mês específico, e as estatísticas de cada time considerando a configuração mandante-visitante da rodada, bem como o histórico dos últimos 5 jogos entre essas equipes na mesma configuração.
                                </p>
                            </div>

                            <div>
                                <Link to="/map"><img className="horizontal-center" src={stats} alt=""/></Link>
                            </div>
                    </div>

                    
                    <div class="home-container grid grid-col-2-2 horizontal-center">
                        <div>
                            <Link to="/standings"><img className="horizontal-center" src={standings} alt=""/></Link>
                        </div>

                        <div>
                            <p className="home-content left-alligned text-left-alligned">
                                Na página Tabela, você encontra a classificação atualizada do Campeonato Brasileiro Série A.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default HomePage