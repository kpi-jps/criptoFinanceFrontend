import { useState, useEffect } from "react";
import { fetchData } from '../utils/utils'
const CriptoRegisterItem = (props) => {
    const [update, setUpdate] = useState(false);
    const [newQuantity, setNewQuantity] = useState(props.itemInfo.quantity);
    const del = (id) => {
        const confirmDel = window.confirm(`Tem certeza que deseja deletar o registro de id: ${id}`);
        if(confirmDel) alert('deletado');
    }

    const edit = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <p>
                id: {props.itemInfo.id} Ticker: {props.itemInfo.ticker.toUpperCase()} - Quantidade: {props.itemInfo.quantity} - 
                Valor (BTC) = {props.itemInfo.btcValue} - Valor (USD) = {props.itemInfo.usdValue}</p>
            <p><button onClick={e => del(props.itemInfo.id)}>Deletar</button> <button onClick={e => setUpdate(!update)}>Editar</button></p>
            {update && 
                <form onSubmit={e => edit(e)}>
                    <label>
                        Nova quantidade : 
                        <input type="text" value={newQuantity} onChange={e => setNewQuantity(e.target.value)}/>
                    </label>
                    
                    <input type="submit" value="Salvar" />
                </form>
            }
        </>
    )
}

export default CriptoRegisterItem;