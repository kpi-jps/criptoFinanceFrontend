import { useState, useEffect } from "react";
import CriptoRegisterItem from "./CriptoRegisterItem";

const Home = (props) => {
    return (
        <ul>
            {
                props.criptoRegisters.length === 0 ? <p> Não há registros de criptoatvos</p> :
                props.criptoRegisters.map((item, index) => {
                    return <li><CriptoRegisterItem key={index} itemInfo={item}/></li>
                })
            }
        </ul>
    )
}

export default Home;