import { React, useEffect, useState, useLocation } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = (props) => 
{   
    return (
        <div>
            <Header/>
            <main>
                <section>
                    <h3 className="section-title">Home Page</h3>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default HomePage