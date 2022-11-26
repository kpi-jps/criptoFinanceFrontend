import { useState, useEffect } from "react";
import { fetchData } from '../utils/utils'
import '../css/CriptoRegisterItem.css'
const CriptoRegisterItem = (props) => {
    const userId = props.userId;
    const id = props.itemInfo.id;
    const quantity = props.itemInfo.quantity;
    const ticker = props.itemInfo.ticker;
    const [update, setUpdate] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [values, setValues] = useState({ btcValue: 0, usdValue: 0 })

    const del = (id) => {
        const confirmDel = window.confirm(`Tem certeza que deseja deletar o registro de id: ${id}`);
        if (confirmDel) {
            fetchData(`/crypto/delete`, 'DELETE', {id: id, userId: userId}).then(
                response => {
                    if (response.error) {
                        props.methods.errorLayout();
                        return;
                    }
                    if (response.status === 500) {
                        alert(response.data.msg);
                        return;
                    }
                    if (response.status === 401) {
                        alert(response.data.msg);
                        return
                    }
                    alert('Registro deletado com sucesso!');
                    props.methods.updateCriptoRegisterList();
                    setUpdate(false);
                });
        };
    }

    const edit = (event) => {
        event.preventDefault();
        fetchData(`/crypto/update`, 'PUT', {id: id, userId: userId, quantity: newQuantity}).then(
            response => {
                if (response.error) {
                    props.methods.errorLayout();
                    return;
                }
                if (response.status === 500) {
                    alert(response.data.msg);
                    return;
                }
                if (response.status === 401) {
                    alert(response.data.msg);
                    window.location.reload();
                    return
                }
                props.methods.updateCriptoRegisterList();
                setUpdate(false);
            });
    }

    const getValues = () => {
        fetchData(`/crypto/search/${ticker.toLowerCase()}`, 'GET', {}).then(
            response => {
                setValues({
                    btcValue: response.data.data.market_data.price_btc === null ? 0 : response.data.data.market_data.price_btc,
                    usdValue: response.data.data.market_data.price_usd === null ? 0 : response.data.data.market_data.price_usd
                });

                console.log(response)
            }
        );
    }

    useEffect(() => {
        getValues();
    }, []);

    return (
        <>
            <p>
                <b>ID:</b> {id} <b>Ticker:</b> {ticker.toUpperCase()} - 
                <b> Quantidade:</b> {quantity}  - 
                <b> Valor (USD) = </b> {(values.usdValue * quantity).toFixed(2)}
            </p>
            <ul className="item-ctrls">
                <li className="link" onClick={e => del(id)}>Deletar</li> 
                <li className="link" onClick={e => setUpdate(!update)}>Editar</li>
            </ul>
            {update &&
                <form onSubmit={e => edit(e)}>
                    <label>
                        Nova quantidade :
                        <input type="text" value={newQuantity} onChange={e => setNewQuantity(e.target.value)} />
                    </label>

                    <input type="submit" value="Salvar" />
                </form>
            }
        </>
    )
}

export default CriptoRegisterItem;