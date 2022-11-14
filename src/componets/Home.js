import { useState, useEffect } from "react";

const Home = (props) => {
    return (
        <div>
            {
                props.criptoRegisters.length === 0 ? <p> Não há registros de criptoatvos</p> :
                props.criptoRegisters.map((item, index) => {
                    return <p key={index}>{item.id}</p>
                })}
        </div>
    )
}

export default Home;