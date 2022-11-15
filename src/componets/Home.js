import { useState } from "react";
import CriptoRegisterItem from "./CriptoRegisterItem";

const Home = (props) => {
    const [updated, setUpdated] = useState(true);
    const update = () => {
        setUpdated(false);
        setTimeout(() => {
            setUpdated(true);
        }, 1000)
    }
    return (
        <>
            <button onClick={e => update()}> Atualizar </button>
            <ul>
                {
                    updated ? 
                        props.criptoRegisters.length === 0 ? <p> Não há registros de criptoatvos</p> :
                            props.criptoRegisters.map((item, index) => {
                                return <li><CriptoRegisterItem userId={props.userId} key={index} itemInfo={item} methods={props.methods} /></li>
                            }) : <p> Atualizando registros</p> 
                }
            </ul>

        </>

    )
}

export default Home;