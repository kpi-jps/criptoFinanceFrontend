import { useState, useEffect } from "react";
import { fetchData } from '../utils/utils'

const AddCriptoRegisterForm = (props) => {
    const userId = props.userId;
    const [found, setFound] = useState(false);
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState(0);
    
    const cancel = () => {
        setFound(false);
        setTicker('');
        setQuantity(0);
    }

    const findTicker = (event) => {
        event.preventDefault();
        if(ticker === '') {
            alert('Ticker vazio!');
            return;
        }
        fetchData(`/crypto/search/${ticker}`, 'GET', {}).then(
            response => {
                if(response.data.status.error_code !== undefined && response.data.status.error_code === 404) {
                    alert('Ticker não encontrado!');
                    return;
                }
                setFound(true);
                setTicker(response.data.data.symbol.toLowerCase());
    
            }
        );
    }

    const save = (event) => {
        event.preventDefault();
        if(quantity === 0) {
            alert('Quantidade igual a zero!');
            return;
        }
        if(isNaN(Number(quantity))) {
            alert('Quantidade precisa ser um número!');
        }
        fetchData(`/crypto/create`, 'POST', {ticker: ticker, quantity: quantity, userId: userId}).then(
            response => {
                if (response.error) {
                    props.methods.errorLayout()
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
                
                alert ('Cripto adicionado com sucesso!')
                
            }
        );
    }

    return (
        !found ? <div>
            <form onSubmit={e => findTicker(e)}>
                <label>
                    Buscar ticker
                    <input type="type" name="ticker" value={ticker} onChange={e => setTicker(e.target.value.toLowerCase())} />
                </label>
                <input type="submit" value="Buscar" />
            </form>
        </div> : 
        <div>
            <form>
                <div>Ticker: {ticker} </div>
                <label>
                    Quantidade:
                    <input type="text" name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
                </label>
                <button onClick={e => cancel()}>Cancelar</button>
                <input type="submit" value="Salvar" />
            </form>
        </div>
    )
}

export default AddCriptoRegisterForm;